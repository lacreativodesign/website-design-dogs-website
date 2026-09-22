const localHosts = new Set(["localhost", "127.0.0.1", "::1", "0.0.0.0"]);

export function normalizeWebsiteInput(value: string | undefined | null) {
  const raw = (value || "").trim();
  if (!raw) return undefined;

  const hasExplicitScheme = /^[a-z][a-z0-9+.-]*:/i.test(raw);
  const hasWebScheme = /^https?:\/\//i.test(raw);
  if (hasExplicitScheme && !hasWebScheme) return undefined;

  const candidate = hasWebScheme ? raw : `https://${raw}`;

  try {
    const url = new URL(candidate);
    const hostname = url.hostname.toLowerCase();

    if (!["http:", "https:"].includes(url.protocol)) return undefined;
    if (!hostname || localHosts.has(hostname)) return undefined;
    if (!hostname.includes(".") && !hostname.includes(":")) return undefined;

    return url.toString();
  } catch {
    return undefined;
  }
}

export function isValidWebsiteInput(value: string | undefined | null) {
  const raw = (value || "").trim();
  return !raw || Boolean(normalizeWebsiteInput(raw));
}
