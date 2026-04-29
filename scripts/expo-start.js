/**
 * Dev server options from expo-dev-host.json (project root):
 *   host: "tunnel" | "lan" | "localhost"
 *     - lan: phone and PC on the same Wi‑Fi/LAN (any network — home, office, café). No ngrok.
 *     - tunnel: different networks or guest Wi‑Fi that blocks device-to-device (uses ngrok).
 *     - localhost: emulator/simulator on this machine only.
 *   packagerHostname: optional manual IPv4. Leave empty to auto-pick the PC’s LAN address on each `npm start`.
 *
 * LAN IP resolution (highest wins): REACT_NATIVE_PACKAGER_HOSTNAME, EXPO_PACKAGER_IP, packagerHostname,
 * then automatic detection from this machine’s network interfaces (skips typical VPN/VM adapters).
 *
 * If Expo Go still cannot connect on the same Wi‑Fi: Windows Firewall may block port 8081, or the venue may use
 * “client isolation” (phones cannot talk to laptops) — use tunnel or USB in that case.
 */
const { spawn } = require('child_process');
const fs = require('fs');
const os = require('os');
const path = require('path');

/** Best-effort IPv4 for the active LAN/Wi‑Fi (changes when you join another network). */
function guessLanIPv4() {
  const nets = os.networkInterfaces();
  if (!nets) return '';

  const skipAdapter = (name) =>
    /loopback|vmware|virtualbox|vbox|hyper-v|vethernet|vEthernet|wsl|docker|tailscale|zerotier|nordlynx|tun|tap|ppp|vpn|bluetooth|isatap|pseudo|npcap|hamachi|zeroconf/i.test(
      name,
    );

  const candidates = [];
  for (const name of Object.keys(nets)) {
    if (skipAdapter(name)) continue;
    for (const net of nets[name]) {
      const v4 = net.family === 'IPv4' || net.family === 4;
      if (!v4 || net.internal) continue;
      const addr = net.address;
      if (!addr) continue;
      // Prefer real DHCP addresses; 169.254.x.x is APIPA (no DHCP) — use only if nothing else
      if (addr.startsWith('169.254.')) continue;
      candidates.push({ name, address: addr });
    }
  }

  if (candidates.length === 0) {
    for (const name of Object.keys(nets)) {
      if (skipAdapter(name)) continue;
      for (const net of nets[name]) {
        const v4 = net.family === 'IPv4' || net.family === 4;
        if (!v4 || net.internal) continue;
        const addr = net.address;
        if (addr) candidates.push({ name, address: addr });
      }
    }
  }

  if (candidates.length === 0) return '';

  const preferWireless = (c) => /wi-?fi|wlan|wireless|802\.11/i.test(c.name);
  const w = candidates.find(preferWireless);
  if (w) return w.address;

  const preferEth = (c) => /ethernet|eth\b|en\d|gigabit|lan\b/i.test(c.name);
  const e = candidates.find(preferEth);
  if (e) return e.address;

  return candidates[0].address;
}

const root = path.join(__dirname, '..');
const configPath = path.join(root, 'expo-dev-host.json');

let packagerHostname = '';
let hostMode = 'tunnel';

try {
  const raw = fs.readFileSync(configPath, 'utf8');
  const config = JSON.parse(raw);
  if (typeof config.packagerHostname === 'string') {
    packagerHostname = config.packagerHostname.trim();
  }
  if (typeof config.host === 'string') {
    const h = config.host.trim().toLowerCase();
    if (h === 'tunnel' || h === 'lan' || h === 'localhost') hostMode = h;
  }
} catch {
  // Missing or invalid file
}

function userSpecifiedHost(argv) {
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--tunnel' || a === '--lan' || a === '--localhost') return true;
    if (a === '-m' || a === '--host') return true;
  }
  return false;
}

function prependHostFlags(argv) {
  if (userSpecifiedHost(argv)) return argv;
  if (hostMode === 'tunnel') return ['--tunnel', ...argv];
  if (hostMode === 'lan') return ['--lan', ...argv];
  if (hostMode === 'localhost') return ['--localhost', ...argv];
  return argv;
}

const userArgs = process.argv.slice(2);
const startArgs = prependHostFlags(userArgs);

function resolveExpoCliEntry() {
  // Prefer Node-resolved entry (handles Expo internal path changes).
  try {
    // Older expo versions: expo/bin/cli
    return require.resolve('expo/bin/cli');
  } catch {
    // ignore
  }
  try {
    // Common newer expo versions: expo/bin/cli.js
    return require.resolve('expo/bin/cli.js');
  } catch {
    // ignore
  }

  // Fallback to historical relative path.
  const legacy = path.join(root, 'node_modules', 'expo', 'bin', 'cli');
  return legacy;
}

const env = { ...process.env };
if (hostMode === 'lan') {
  const fromEnv =
    (typeof process.env.REACT_NATIVE_PACKAGER_HOSTNAME === 'string' &&
      process.env.REACT_NATIVE_PACKAGER_HOSTNAME.trim()) ||
    (typeof process.env.EXPO_PACKAGER_IP === 'string' && process.env.EXPO_PACKAGER_IP.trim()) ||
    '';
  const fromFile = packagerHostname;
  const auto = guessLanIPv4();
  const hostname = fromEnv || fromFile || auto;
  if (hostname) {
    env.REACT_NATIVE_PACKAGER_HOSTNAME = hostname;
    if (!fromEnv && !fromFile && auto) {
      console.log(`[expo-start] LAN mode: using detected IP ${auto} (set EXPO_PACKAGER_IP or packagerHostname if wrong)`);
    }
  } else if (!fromEnv && !fromFile) {
    console.warn(
      '[expo-start] LAN mode: could not detect an IPv4 address. Set packagerHostname in expo-dev-host.json or EXPO_PACKAGER_IP.',
    );
  }
}

const expoCli = resolveExpoCliEntry();
const forwardArgs = [expoCli, 'start', ...startArgs];

const child = spawn(process.execPath, forwardArgs, {
  cwd: root,
  env,
  stdio: 'inherit',
});

child.on('exit', (code, signal) => {
  if (signal) process.exit(1);
  process.exit(code ?? 0);
});
