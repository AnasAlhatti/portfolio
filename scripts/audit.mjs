import { launch } from 'chrome-launcher';
import lighthouse from 'lighthouse';
import { chromium } from 'playwright';
import { mkdir, writeFile } from 'node:fs/promises';

const url = process.env.PORTFOLIO_URL || 'http://localhost:4173/portfolio/';
const chrome = await launch({ chromeFlags: ['--headless', '--disable-gpu'] });
const results = [];
await mkdir('artifacts', { recursive: true });
try {
  for (const language of ['en', 'tr']) {
    const browser = await chromium.connectOverCDP(`http://127.0.0.1:${chrome.port}`);
    const page = await browser.contexts()[0].newPage();
    await page.goto(url);
    await page.evaluate((locale) => localStorage.setItem('portfolio-language', locale), language);
    await page.close();
    await browser.close();
    const { lhr, report } = await lighthouse(url, { port: chrome.port, output: ['html', 'json'], onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'], disableStorageReset: true });
    await writeFile(`artifacts/lighthouse-${language}.html`, report[0]);
    await writeFile(`artifacts/lighthouse-${language}.json`, report[1]);
    const scores = Object.fromEntries(Object.entries(lhr.categories).map(([key, value]) => [key, Math.round(value.score * 100)]));
    const failed = Object.values(lhr.audits).filter((audit) => audit.score !== null && audit.score < 1 && audit.details).map(({ id, title, score, displayValue }) => ({ id, title, score, displayValue }));
    results.push({ language, scores, lcp: lhr.audits['largest-contentful-paint'].displayValue, cls: lhr.audits['cumulative-layout-shift'].displayValue, failed });
  }
} finally { await chrome.kill(); }
await writeFile('artifacts/lighthouse-results.json', JSON.stringify(results, null, 2));
console.log(JSON.stringify(results, null, 2));
if (results.some(({ scores }) => scores.performance < 90 || scores.accessibility < 95)) process.exitCode = 1;
