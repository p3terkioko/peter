import fs from 'fs';

const env = fs.readFileSync('.env', 'utf-8');
const id = env.match(/SPOTIFY_CLIENT_ID=(.*)/)?.[1]?.trim();
const secret = env.match(/SPOTIFY_CLIENT_SECRET=(.*)/)?.[1]?.trim();
let code = env.match(/SPOTIFY_REFRESH_TOKEN=(.*)/)?.[1]?.trim();

// Strip any accidental "code=" formatting the user might have pasted
if (code.startsWith("code=")) {
  code = code.replace("code=", "");
}

// The user specified this is the callback URL they used to generate the code
const REDIRECT_URI = 'https://peter-seven.vercel.app/';

const basic = Buffer.from(id + ':' + secret).toString('base64');
console.log("Attempting to exchange the temporary text inside .env for a real permanent Refresh Token...");

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
  envContent = envContent.replace(/SPOTIFY_REFRESH_TOKEN=(.*)/g, `SPOTIFY_REFRESH_TOKEN=${data.refresh_token}`);
  fs.writeFileSync('.env', envContent);
  console.log("\n[SUCCESS] Successfully exchanged user's code for a Premium Refresh Token and securely saved it to .env!");
  console.log("The integration is now fully authenticated and ready.");
} else {
  console.log("\n[ERROR] EXCHANGE FAILED! Spotify refused the code. Reason:");
  console.log(data);
}
