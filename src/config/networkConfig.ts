/**
 * AGRICARE — central backend URL configuration (Expo Go + Metro).
 *
 * Metro / Expo Go (QR code) is separate: use `npm start` + tunnel or LAN in
 * `expo-dev-host.json` / `scripts/expo-start.js`. This file is only for HTTP
 * calls from the app to your PC (or tunneled) API during development.
 */

/** ─── Change this when your PC’s LAN IP changes (`ipconfig` on Windows). ─── */
export const PC_LAN_IP = '192.168.1.1';

/** Port your API server listens on (Express, FastAPI, etc.). */
export const API_PORT = 8787;

/**
 * `lan` — phone reaches PC at http://PC_LAN_IP:API_PORT (same Wi‑Fi, no isolation).
 * `tunnel` — phone uses TUNNEL_BASE_URL (e.g. ngrok) when LAN cannot reach the PC.
 */
export type NetworkMode = 'lan' | 'tunnel';

/** Flip this when you switch between home Wi‑Fi (LAN) and campus / isolated networks. */
export const NETWORK_MODE: NetworkMode = 'lan';

/**
 * When NETWORK_MODE is `tunnel`, set your public backend base URL (no trailing slash).
 * Example: https://abc123.ngrok-free.app
 * Ignored when NETWORK_MODE is `lan`.
 */
export const TUNNEL_BASE_URL = '';

function trimSlash(s: string): string {
  return s.replace(/\/+$/, '');
}

function resolveBaseUrl(): string {
  if (NETWORK_MODE === 'tunnel') {
    const base = trimSlash(TUNNEL_BASE_URL);
    if (!base) {
      console.warn(
        '[networkConfig] NETWORK_MODE is "tunnel" but TUNNEL_BASE_URL is empty. Set TUNNEL_BASE_URL to your tunneled API URL.',
      );
    }
    return base;
  }
  return `http://${PC_LAN_IP}:${API_PORT}`;
}

const _base = resolveBaseUrl();

/** Root URL for your backend (scheme + host [+ port for LAN]). */
export const API_BASE_URL = _base;

/** Example REST paths — adjust to match your server. */
export const SYNC_ENDPOINT = `${_base}/api/sync`;
export const DIAGNOSIS_ENDPOINT = `${_base}/api/diagnosis`;

export type ConnectionCheckResult =
  | { ok: true; status?: number }
  | { ok: false; error: string };

/**
 * Quick reachability check to your PC / tunneled API.
 * Uses GET `{API_BASE_URL}{path}` — point `path` at a real lightweight route on your server.
 */
export async function checkPcConnection(options?: {
  /** Request timeout in ms (default 8000). */
  timeoutMs?: number;
  /** Path appended to API_BASE_URL (default `/health`). */
  path?: string;
}): Promise<ConnectionCheckResult> {
  if (!trimSlash(API_BASE_URL)) {
    return { ok: false, error: 'API_BASE_URL is empty — set PC_LAN_IP + API_PORT (LAN) or TUNNEL_BASE_URL (tunnel).' };
  }
  const timeoutMs = options?.timeoutMs ?? 8000;
  const path = options?.path ?? '/health';
  const url = `${trimSlash(API_BASE_URL)}${path.startsWith('/') ? path : `/${path}`}`;

  const controller = typeof AbortController !== 'undefined' ? new AbortController() : null;
  const timer =
    controller &&
    setTimeout(() => {
      controller.abort();
    }, timeoutMs);

  try {
    const res = await fetch(url, {
      method: 'GET',
      headers: { Accept: 'application/json' },
      signal: controller?.signal,
    });
    if (timer) clearTimeout(timer);
    if (res.ok) {
      return { ok: true, status: res.status };
    }
    return { ok: false, error: `HTTP ${res.status}` };
  } catch (e) {
    if (timer) clearTimeout(timer);
    const message = e instanceof Error ? e.message : String(e);
    return { ok: false, error: message };
  }
}
