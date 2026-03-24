import fs from 'fs';

const env = fs.readFileSync('.env', 'utf-8');
const id = env.match(/SPOTIFY_CLIENT_ID=(.*)/)?.[1]?.trim();
const secret = env.match(/SPOTIFY_CLIENT_SECRET=(.*)/)?.[1]?.trim();
const refresh = env.match(/SPOTIFY_REFRESH_TOKEN=(.*)/)?.[1]?.trim();

const basic = Buffer.from(id + ':' + secret).toString('base64');
console.log("Checking token with basic auth...");

const res = await fetch('https://accounts.spotify.com/api/token', {
  method: 'POST',
  headers: {
    Authorization: 'Basic ' + basic,
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  body: new URLSearchParams({
    grant_type: 'refresh_token',
    refresh_token: refresh
  })
});
const text = await res.text();

if (!res.ok) {
  console.log("Token API Failed:", res.status, text);
  process.exit(1);
}

const json = JSON.parse(text);
const access = json.access_token;
console.log("Successfully got access token.");

const res2 = await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
  headers: { Authorization: 'Bearer ' + access }
});

console.log("Player Response Status:", res2.status);
if (res2.status === 200) {
  const t2 = await res2.text();
  console.log("Player returned:", t2.substring(0, 200) + "...");
} else if (res2.status === 204) {
  console.log("Player Response Status: 204 No Content (Spotify sees you as not playing anything on this specific scope)");
} else {
  const t2 = await res2.text();
  console.log("Player error:", t2);
}
