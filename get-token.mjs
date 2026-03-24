import http from 'http';
import fs from 'fs';

const env = fs.readFileSync('.env', 'utf-8');
const id = env.match(/SPOTIFY_CLIENT_ID=(.*)/)?.[1]?.trim();
const secret = env.match(/SPOTIFY_CLIENT_SECRET=(.*)/)?.[1]?.trim();

const REDIRECT_URI = 'http://localhost:8888/callback';
const SCOPE = 'user-read-currently-playing';

const basic = Buffer.from(id + ':' + secret).toString('base64');

const server = http.createServer(async (req, res) => {
  if (req.url.startsWith('/callback')) {
    const url = new URL(req.url, 'http://localhost:8888');
    const code = url.searchParams.get('code');
    
    if (code) {
      console.log("\n[X] Received Authorization Code from Spotify! Requesting permanent Refresh Token...");
      
      const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
          'Authorization': 'Basic ' + basic,
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
          grant_type: 'authorization_code',
          code: code,
          redirect_uri: REDIRECT_URI
        })
      });
      
      const data = await response.json();
      
      if (data.refresh_token) {
        let envContent = fs.readFileSync('.env', 'utf-8');
        envContent = envContent.replace(/SPOTIFY_REFRESH_TOKEN=(.*)/g, `SPOTIFY_REFRESH_TOKEN=${data.refresh_token}`);
        fs.writeFileSync('.env', envContent);
        
        res.end("SUCCESS! The Spotify API has granted your machine permission. Your new refresh token is perfectly synced to your .env file! You can safely close this browser window and restart your Next.js terminal!");
        
        console.log("\n[SUCCESS] The .env file has been flawlessly injected with your new Spotify Refresh Token!");
        console.log("You can now safely press Ctrl+C to exit this script, then type 'npm run dev' to see it live!");
        process.exit(0);
      } else {
        res.end("Authentication crashed. Check your terminal: " + JSON.stringify(data));
        console.log("\n[ERROR] Failed to get robust token. Reason:", data);
        process.exit(1);
      }
    }
  }
});

server.listen(8888, () => {
  const loginUrl = `https://accounts.spotify.com/authorize?client_id=${id}&response_type=code&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&scope=${encodeURIComponent(SCOPE)}`;
  
  console.log('\n--- SPOTIFY OAUTH AUTOMATION ---');
  console.log('1. Go to your Spotify Developer Dashboard (developer.spotify.com)');
  console.log('2. Click on your App and go to "Settings"');
  console.log('3. Under "Redirect URIs", carefully paste this exact URL: ' + REDIRECT_URI);
  console.log('4. Click Save on the dashboard.\n');
  console.log('5. Once saved, hold Ctrl and Click the super-link below to securely authorize your machine:');
  console.log('--> ' + loginUrl);
  console.log('--------------------------------\n');
  console.log('Waiting for you to click authorize...');
});
