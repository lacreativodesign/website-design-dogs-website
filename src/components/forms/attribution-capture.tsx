"use client";

import { useEffect } from "react";
import { getAttribution } from "./attribution";

export function AttributionCapture() {
  useEffect(() => {
    getAttribution();
  }, []);

  return null;
}
