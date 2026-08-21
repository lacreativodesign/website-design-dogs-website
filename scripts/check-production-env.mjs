#!/usr/bin/env node

const production = process.argv.includes("--production");
const rows = [];
const env = process.env;

const add = (level, message) => rows.push({ level, message });
const enabled = (value, fallback = false) =>
  value === undefined ? fallback : value === "true";
const mask = (value) =>
  value ? `${String(value).slice(0, 3)}…configured` : "not configured";
const csv = (value) =>
  (value || "")
    .split(",")
    .map((item) => item.trim().toLowerCase())
    .filter(Boolean);

function url(
  name,
  { https = false, required = false, noLocal = false, noPreview = false } = {},
) {
  const value = env[name];
  if (!value) {
    add(required ? "BLOCKER" : "WARNING", `${name} not configured`);
    return null;
  }

  try {
    const parsed = new URL(value);
    if (https && parsed.protocol !== "https:") {
      add("BLOCKER", `${name} must be HTTPS`);
    }
    if (noLocal && /localhost|127\.0\.0\.1/.test(parsed.hostname)) {
      add("BLOCKER", `${name} cannot be localhost for production`);
    }
    if (noPreview && /vercel\.app$/.test(parsed.hostname)) {
      add(
        "BLOCKER",
        `${name} cannot be a Vercel preview hostname for production`,
      );
    }
    add("PASS", `${name} valid URL`);
    return parsed;
  } catch {
    add("BLOCKER", `${name} invalid URL`);
    return null;
  }
}

const site = url("NEXT_PUBLIC_SITE_URL", {
  required: production,
  https: production,
  noLocal: production,
  noPreview: production,
});
const leadSubmissionEnabled = enabled(env.LEAD_SUBMISSION_ENABLED);
const distributedRateLimitRequired = enabled(
  env.LEAD_DISTRIBUTED_RATE_LIMIT_REQUIRED,
  true,
);
const turnstileRequired = enabled(env.TURNSTILE_REQUIRED, true);

if (leadSubmissionEnabled) {
  if (env.BIZOSTO_API_URL) {
    url("BIZOSTO_API_URL", { https: true, required: true });
  } else {
    add("PASS", "BIZOSTO_API_URL using the production ingest endpoint");
  }

  for (const key of ["BIZOSTO_INGEST_KEY"]) {
    add(env[key] ? "PASS" : "BLOCKER", `${key} ${env[key] ? "configured" : "missing"}`);
  }

  const allowedOrigins = csv(env.LEAD_ALLOWED_ORIGINS);
  if (site && !allowedOrigins.includes(site.origin.toLowerCase())) {
    add(
      "BLOCKER",
      "LEAD_ALLOWED_ORIGINS must include the production origin",
    );
  }

  for (const key of [
    "LEAD_REQUEST_TIMEOUT_MS",
    "LEAD_RATE_LIMIT_WINDOW_MS",
    "LEAD_RATE_LIMIT_MAX",
  ]) {
    add(
      env[key] && Number(env[key]) > 0 ? "PASS" : "WARNING",
      `${key} ${env[key] ? "valid" : "using default or missing"}`,
    );
  }

  if (
    distributedRateLimitRequired &&
    !env.LEAD_DISTRIBUTED_RATE_LIMIT_ID
  ) {
    add("BLOCKER", "LEAD_DISTRIBUTED_RATE_LIMIT_ID missing");
  } else if (env.LEAD_DISTRIBUTED_RATE_LIMIT_ID) {
    add("PASS", "Vercel Firewall rate-limit ID configured");
  } else {
    add("WARNING", "Distributed rate limiting is not required");
  }
} else {
  add(
    production ? "BLOCKER" : "WARNING",
    "LEAD_SUBMISSION_ENABLED is not true",
  );
}

if (turnstileRequired) {
  const missingTurnstileLevel =
    production || leadSubmissionEnabled ? "BLOCKER" : "WARNING";
  add(
    env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ? "PASS" : missingTurnstileLevel,
    `Turnstile public key ${
      env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ? "configured" : "missing"
    }`,
  );
  add(
    env.TURNSTILE_SECRET_KEY ? "PASS" : missingTurnstileLevel,
    `Turnstile secret ${env.TURNSTILE_SECRET_KEY ? "configured" : "missing"}`,
  );

  const hostnames = csv(env.TURNSTILE_ALLOWED_HOSTNAMES);
  if (!hostnames.length) {
    add(missingTurnstileLevel, "TURNSTILE_ALLOWED_HOSTNAMES missing");
  } else if (site && !hostnames.includes(site.hostname.toLowerCase())) {
    add(
      missingTurnstileLevel,
      "TURNSTILE_ALLOWED_HOSTNAMES must include the production hostname",
    );
  } else {
    add("PASS", "Turnstile hostname allowlist configured");
  }
} else {
  add(
    production ? "BLOCKER" : "WARNING",
    "TURNSTILE_REQUIRED is false",
  );
}

if (env.NEXT_PUBLIC_ENABLE_GTM === "true") {
  if (/^GTM-[A-Z0-9]{6,}$/.test(env.NEXT_PUBLIC_GTM_ID || "")) {
    add("PASS", `GTM ID ${mask(env.NEXT_PUBLIC_GTM_ID)}`);
  } else {
    add("BLOCKER", "Valid GTM ID missing");
  }

  if (env.NEXT_PUBLIC_CONSENT_BANNER_ENABLED === "false") {
    add("BLOCKER", "GTM requires the consent banner");
  }
} else if (production) {
  add("BLOCKER", "NEXT_PUBLIC_ENABLE_GTM is not true");
} else {
  add("WARNING", "Google Tag Manager is not enabled");
}

if (env.META_CAPI_ENABLED === "true") {
  if (/^\d{5,30}$/.test(env.META_DATASET_ID || "")) {
    add("PASS", "Meta dataset ID configured");
  } else {
    add("BLOCKER", "Valid META_DATASET_ID missing");
  }

  if ((env.META_CAPI_ACCESS_TOKEN || "").length >= 20) {
    add("PASS", "Meta CAPI access token configured");
  } else {
    add("BLOCKER", "META_CAPI_ACCESS_TOKEN missing");
  }

  if (/^v\d{1,2}\.\d{1,2}$/.test(env.META_GRAPH_API_VERSION || "")) {
    add("PASS", "Meta Graph API version configured");
  } else {
    add("BLOCKER", "Valid META_GRAPH_API_VERSION missing");
  }

  if (env.NEXT_PUBLIC_ENABLE_GTM !== "true") {
    add(
      "BLOCKER",
      "Meta CAPI deduplication requires the consent-controlled GTM browser event",
    );
  }
  if (env.NEXT_PUBLIC_CONSENT_BANNER_ENABLED === "false") {
    add("BLOCKER", "Meta CAPI requires the consent banner");
  }
  if (production && env.META_CAPI_TEST_EVENT_CODE) {
    add(
      "BLOCKER",
      "Remove META_CAPI_TEST_EVENT_CODE after Meta Test Events verification",
    );
  }
} else {
  add("WARNING", "Meta CAPI is not enabled");
}

for (const key of [
  "NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION",
  "NEXT_PUBLIC_BING_SITE_VERIFICATION",
  "NEXT_PUBLIC_META_DOMAIN_VERIFICATION",
]) {
  add(
    env[key] ? "PASS" : "WARNING",
    `${key} ${env[key] ? "configured" : "not configured"}`,
  );
}

if (env.ALLOW_PREVIEW_LEAD_SUBMISSION === "true") {
  add(
    "WARNING",
    "ALLOW_PREVIEW_LEAD_SUBMISSION is true; keep false unless intentionally testing preview leads",
  );
}

for (const row of rows) {
  console.log(`${row.level}: ${row.message}`);
}

process.exit(rows.some((row) => row.level === "BLOCKER") ? 1 : 0);
