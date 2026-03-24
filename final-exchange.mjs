import fs from 'fs';

const env = fs.readFileSync('.env', 'utf-8');
const id = env.match(/SPOTIFY_CLIENT_ID=(.*)/)?.[1]?.trim();
const secret = env.match(/SPOTIFY_CLIENT_SECRET=(.*)/)?.[1]?.trim();

const REDIRECT_URI = 'https://peter-seven.vercel.app/';
const code = "AQCK4fXUcp89Sne_GMhM9ygP7-FKokLXZORAOcb_pjkubLX9BDeNoxgoyr3qmWXOAoyqMxAgVCCfnPP2YJf32wPirvxwl1SB5zoxY_Lx2VU7nZzmAewm_JiSSYn-YJImdihIpD_ajgiwWWSRbwMXjmdLjzC7xo0tlObKO3MoG6146oCquNIrNhRJRxayfzCeZhwJRQyvy6RfNMpixgC6eA";

const basic = Buffer.from(id + ':' + secret).toString('base64');
console.log("Exchanging user's manual auth code...");

const res = await fetch('https://accounts.spotify.com/api/token', {
  method: 'POST',
  headers: {
    Authorization: 'Basic ' + basic,
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  body: new URLSearchParams({
    grant_type: 'authorization_code',
    code: code,
    redirect_uri: REDIRECT_URI
  })
});

const data = await res.json();

if (data.refresh_token) {
  let envContent = fs.readFileSync('.env', 'utf-8');
  if (envContent.includes('SPOTIFY_REFRESH_TOKEN=')) {
    envContent = envContent.replace(/SPOTIFY_REFRESH_TOKEN=.*/g, `SPOTIFY_REFRESH_TOKEN=${data.refresh_token}`);
  } else {
    envContent += `\nSPOTIFY_REFRESH_TOKEN=${data.refresh_token}\n`;
  }
  fs.writeFileSync('.env', envContent);
  console.log("SUCCESS! Securely exchanged code for a permanent Refresh Token and saved it to .env!");
} else {
  console.log("EXCHANGE FAILED! Spotify returned:", data);
  process.exit(1);
}
