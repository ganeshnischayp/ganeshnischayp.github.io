/**
 * Invitation URL codec with 2-character checksum verification
 * Format: 1 + checksum(2) + base64url(json)
 */

export interface InvitePayload {
  v: number;
  n?: string; // Invitee full name
  r?: number; // Relationship: 0 (default), 1 (elder), 2 (family), 3 (friend)
  l?: "kn" | "te" | "en"; // Language
  cel?: number; // 1 = show 8:00 PM Celebration (Music & Dancing)
  rsvp?: number; // 1 = show RSVP button and modal
  as?: number; // 1 = auto scroll
  bw?: number; // 1 = show Best Wishes
  gf?: number; // 1 = groom first (Nischay & Yashaswini) vs bride first
  tr?: number; // 1 = auto tour
  m?: string; // Custom note / message
  h?: string; // Honorific suffix
}

export type RelationType = "elder" | "family" | "friend" | "";

export const REL_TO_NUM: Record<RelationType, number> = {
  "": 0,
  elder: 1,
  family: 2,
  friend: 3,
};

export const NUM_TO_REL: Record<number, RelationType> = {
  0: "",
  1: "elder",
  2: "family",
  3: "friend",
};

export const KANNADA_NAMES = "ನಿಶ್ಚಯ್ & ಯಶಸ್ವಿನಿ";
export const KANNADA_NAMES_BRIDE_FIRST = "ಯಶಸ್ವಿನಿ & ನಿಶ್ಚಯ್";
export const KANNADA_WELCOME = "ಹೃತ್ಪೂರ್ವಕ ಸ್ವಾಗತ";

// Retain alias references for backward-compatibility if imported
export const TELUGU_NAMES = KANNADA_NAMES;
export const TELUGU_NAMES_GROOM_FIRST = KANNADA_NAMES;
export const TELUGU_WELCOME = KANNADA_WELCOME;

/** Checksum hash generator used in the official app */
export function calculateChecksum(str: string): string {
  let t = 33052;
  for (let r = 0; r < str.length; r++) {
    t ^= str.charCodeAt(r);
    t = (257 * t) & 65535;
  }
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_";
  return alphabet[(t >> 6) & 63] + alphabet[63 & t];
}

/** Encode invite payload into URL token `1${checksum}${b64}` */
export function encodeInvite(params: {
  name?: string;
  rel?: RelationType;
  lang?: "en" | "kn" | "te";
  showCelebration?: boolean;
  showRsvp?: boolean;
  autoScroll?: boolean;
  blessing?: boolean;
  groomFirst?: boolean;
  autoTour?: boolean;
  note?: string;
  honorific?: string;
}): string {
  const payload: InvitePayload = { v: 1 };
  if (params.name && params.name.trim()) {
    payload.n = params.name.trim().slice(0, 60);
  }
  if (params.rel && REL_TO_NUM[params.rel]) {
    payload.r = REL_TO_NUM[params.rel];
  }
  if (params.lang === "kn" || params.lang === "te") {
    payload.l = "kn";
  }
  if (params.showCelebration) payload.cel = 1;
  if (params.showRsvp) payload.rsvp = 1;
  if (params.autoScroll) payload.as = 1;
  if (params.blessing) payload.bw = 1;
  if (params.groomFirst) payload.gf = 1;
  if (params.autoTour) payload.tr = 1;
  if (params.note && params.note.trim()) {
    payload.m = params.note.trim().slice(0, 140);
  }
  if (params.honorific && params.honorific.trim()) {
    payload.h = params.honorific.trim().slice(0, 16);
  }

  const jsonStr = JSON.stringify(payload);
  const bytes = new TextEncoder().encode(jsonStr);
  let binary = "";
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  const b64 = btoa(binary)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");

  const checksum = calculateChecksum(b64);
  return `1${checksum}${b64}`;
}

/** Decode URL token `d` into InvitePayload */
export function decodeInvite(token: string): InvitePayload {
  const fallback: InvitePayload = { v: 1 };
  if (!token || token.length < 3 || token.length > 2000) return fallback;

  try {
    if (token[0] !== "1") return fallback;
    const checksum = token.slice(1, 3);
    const body = token.slice(3);
    if (calculateChecksum(body) !== checksum) {
      console.warn("Invite token checksum mismatch");
      return fallback;
    }

    const b64 = body.replace(/-/g, "+").replace(/_/g, "/");
    const binary = atob(b64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    const raw = JSON.parse(new TextDecoder().decode(bytes)) ?? {};

    const result: InvitePayload = { v: 1 };
    if (typeof raw.n === "string") result.n = raw.n.slice(0, 60);
    const rel = Number(raw.r);
    if (rel >= 1 && rel <= 3) result.r = rel;
    if (raw.l === "kn" || raw.l === "te") result.l = "kn";
    if (raw.cel === 1) result.cel = 1;
    if (raw.rsvp === 1) result.rsvp = 1;
    if (raw.as === 1) result.as = 1;
    if (raw.bw === 1) result.bw = 1;
    if (raw.gf === 1) result.gf = 1;
    if (raw.tr === 1) result.tr = 1;
    if (typeof raw.m === "string") result.m = raw.m.slice(0, 140);
    if (typeof raw.h === "string") result.h = raw.h.slice(0, 16);

    return result;
  } catch (err) {
    console.error("Failed to decode invite token:", err);
    return fallback;
  }
}

/** Encode name to URL-safe base64 format */
export function encodeBase64Name(name: string): string {
  if (!name || typeof name !== "string") return "";
  const bytes = new TextEncoder().encode(name.trim());
  let binary = "";
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

/** Decode base64 / base64url string to UTF-8 text */
export function decodeBase64String(raw: string): string | null {
  if (!raw || typeof raw !== "string") return null;
  const trimmed = raw.trim();
  if (!trimmed) return null;

  // Restore standard base64 characters and padding
  let b64 = trimmed.replace(/-/g, "+").replace(/_/g, "/");
  while (b64.length % 4 !== 0) {
    b64 += "=";
  }

  if (!/^[A-Za-z0-9+/=]+$/.test(b64)) {
    return null;
  }

  try {
    const binary = atob(b64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    const decoded = new TextDecoder("utf-8").decode(bytes).trim();

    // If decoded happens to be JSON e.g. {"name": "Ramesh"}
    if (decoded.startsWith("{") && decoded.endsWith("}")) {
      try {
        const parsed = JSON.parse(decoded);
        const nameVal = parsed.n || parsed.name || parsed.invitee || parsed.guest;
        if (typeof nameVal === "string" && nameVal.trim()) {
          return nameVal.trim();
        }
      } catch {
        // ignore
      }
    }

    if (decoded && decoded.length <= 80 && !/[\x00-\x08\x0E-\x1F]/.test(decoded)) {
      return decoded;
    }
  } catch {
    // Decoding failed
  }
  return null;
}

/**
 * Read and decode invitee name from the URL path parameter (encoded in base64 format).
 * E.g. /UmFtZXNo -> "Ramesh", /invite/UmFtZXNo -> "Ramesh"
 */
export function getInviteeNameFromUrl(): string | null {
  if (typeof window === "undefined") return null;

  // 1. Check path parameter
  try {
    const pathname = window.location.pathname || "";
    const cleanPath = pathname.split("?")[0].split("#")[0];
    const segments = cleanPath.split("/").filter(Boolean);

    if (segments.length > 0) {
      for (let i = segments.length - 1; i >= 0; i--) {
        const seg = decodeURIComponent(segments[i]);
        if (
          !seg ||
          seg.includes(".") ||
          ["invitation", "invite", "wedding", "card", "app", "home"].includes(seg.toLowerCase())
        ) {
          continue;
        }

        const decoded = decodeBase64String(seg);
        if (decoded) {
          return decoded;
        }

        // If it's already a readable name in path param
        if (/^[\p{L}\p{N}\s.,&'()-]{2,60}$/u.test(seg)) {
          return seg.trim();
        }
      }
    }
  } catch (err) {
    console.warn("Could not parse path param:", err);
  }

  // 2. Check query params fallback (?name=..., ?to=..., ?guest=...)
  try {
    const sp = new URLSearchParams(window.location.search);
    const queryCandidate =
      sp.get("name") || sp.get("to") || sp.get("guest") || sp.get("invitee") || sp.get("n");

    if (queryCandidate) {
      const decoded = decodeBase64String(queryCandidate);
      if (decoded) return decoded;
      if (/^[\p{L}\p{N}\s.,&'()-]{2,60}$/u.test(queryCandidate)) {
        return queryCandidate.trim();
      }
    }
  } catch {
    // ignore
  }

  return null;
}
