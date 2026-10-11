// Renders /cv from the production build to public/Peter_Kioko_CV.pdf.
// Run with `npm run cv:pdf`, which builds first. Fails if the PDF is not
// exactly 2 A4 pages or if the page text contains an em or en dash.
import { spawn } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { chromium } from "playwright";

const PORT = process.env.CV_PORT ?? "4317";
const BASE_URL = `http://localhost:${PORT}`;
const OUT = "public/Peter_Kioko_CV.pdf";
const EXPECTED_PAGES = 2;
const DASHES = /[\u2013\u2014]|\s--\s/;

if (!existsSync(".next/BUILD_ID")) {
  console.error("No production build found. Run `npm run build` first, or use `npm run cv:pdf`.");
  process.exit(1);
}

const server = spawn(process.execPath, ["node_modules/next/dist/bin/next", "start", "-p", PORT], {
  stdio: ["ignore", "ignore", "inherit"],
});

async function waitForServer(url, timeoutMs = 30000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      const res = await fetch(url);
      if (res.ok) return;
    } catch {
      // Server not listening yet.
    }
    await new Promise((r) => setTimeout(r, 300));
  }
  throw new Error(`Server did not respond at ${url} within ${timeoutMs / 1000}s`);
}

// Chromium writes one uncompressed "/Type /Page" dictionary per page.
function countPages(file) {
  const raw = readFileSync(file, "latin1");
  return (raw.match(/\/Type\s*\/Page(?![a-zA-Z])/g) ?? []).length;
}

let failed = false;
let browser;
try {
  await waitForServer(`${BASE_URL}/cv`);
  browser = await chromium.launch();
  const page = await browser.newPage();
  // Keep PDF runs out of the site's analytics.
  await page.route("**/cloud.umami.is/**", (route) => route.abort());
  await page.emulateMedia({ media: "print", reducedMotion: "reduce" });
  await page.goto(`${BASE_URL}/cv`, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);

  const text = await page.evaluate(() => document.body.innerText);
  const dash = text.match(DASHES);
  if (dash) {
    console.error(`Dash check failed: found "${dash[0]}" near "${text.slice(Math.max(0, dash.index - 40), dash.index + 40)}"`);
    failed = true;
  }

  await page.pdf({ path: OUT, format: "A4", printBackground: true, preferCSSPageSize: true });
  const pages = countPages(OUT);
  console.log(`Wrote ${OUT}: ${pages} page(s).`);
  if (pages !== EXPECTED_PAGES) {
    console.error(`Expected ${EXPECTED_PAGES} pages. Tighten src/app/cv/print.css or trim src/data/cv.ts.`);
    failed = true;
  }
  if (!dash) console.log("Dash check passed: no em or en dashes.");
} catch (err) {
  console.error(err);
  failed = true;
} finally {
  await browser?.close();
  server.kill();
}

process.exit(failed ? 1 : 0);
