import { chromium } from 'playwright';
import { mkdir, writeFile } from 'node:fs/promises';
import assert from 'node:assert/strict';
import { translations } from '../src/content/translations.js';

const base = process.env.PORTFOLIO_URL || 'http://localhost:4173/portfolio/';
const browser = await chromium.launch({ channel: process.env.BROWSER_CHANNEL || 'chrome', headless: true });
const results = [];
// Pointer clicks avoid Chrome's scrollIntoViewIfNeeded moving a sticky header.
async function clickVisible(page, locator) {
  const box = await locator.boundingBox();
  assert.ok(box && box.y >= 0 && box.y + box.height <= page.viewportSize().height, 'Control is visible');
  await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2);
}
await mkdir('artifacts', { recursive: true });
try {
  for (const width of [360, 768, 1440]) {
    for (const language of ['en', 'tr']) {
      const page = await browser.newPage({ viewport: { width, height: 1000 }, reducedMotion: 'reduce' });
      const errors = [];
      page.on('pageerror', (error) => errors.push(error.message));
      page.on('response', (response) => { if (response.status() >= 400) errors.push(`${response.status()} ${response.url()}`); });
      await page.goto(base, { waitUntil: 'networkidle' });
      if (language === 'tr') await page.getByRole('button', { name: 'TR — Türkçeye geç' }).click();
      await page.locator('h1').waitFor();
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
      if (overflow) errors.push('Horizontal overflow');
      const documentLanguage = await page.locator('html').getAttribute('lang');
      if (documentLanguage !== language) errors.push(`Incorrect language ${documentLanguage}`);
      assert.equal(await page.title(), translations[language].meta.title);
      const anchors = await page.locator('a[href^="#"]').evaluateAll((links) => links.every((link) => document.getElementById(link.hash.slice(1))));
      assert.ok(anchors, 'Every section link resolves');
      const cv = page.getByRole('link', { name: translations[language].hero.cv }).first();
      const cvResponse = await page.request.get(new URL(await cv.getAttribute('href'), base).href);
      assert.ok(cvResponse.ok() && cvResponse.headers()['content-type'].includes('pdf'), 'English CV is served as a PDF');
      for (const image of await page.locator('img').all()) {
        if (await image.evaluate((element) => element.closest('[aria-hidden="true"]'))) continue;
        await image.scrollIntoViewIfNeeded();
        await image.evaluate((element) => element.decode());
      }
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.screenshot({ path: `artifacts/portfolio-${language}-${width}.png`, fullPage: true });
      await page.getByRole('button', { name: /^View screenshot:|^Ekran görüntüsünü aç:/ }).first().click();
      const dialog = page.getByRole('dialog');
      await dialog.waitFor();
      await dialog.getByRole('button', { name: translations[language].ui.next }).click();
      const opposite = language === 'en' ? 'tr' : 'en';
      await dialog.getByRole('button', { name: opposite === 'tr' ? 'TR — Türkçeye geç' : 'EN — Switch to English' }).click();
      assert.equal(await dialog.getAttribute('aria-label'), translations[opposite].projects.matte.captions[1]);
      await page.keyboard.press('Tab');
      assert.ok(await page.evaluate(() => document.querySelector('dialog').contains(document.activeElement)), 'Dialog retains keyboard focus');
      await page.keyboard.press('Escape');
      if (await dialog.count()) errors.push('Escape did not close gallery');
      await page.getByRole('button', { name: language === 'tr' ? 'TR — Türkçeye geç' : 'EN — Switch to English' }).click();
      const study = page.getByRole('button', { name: translations[language].ui.caseStudy }).first();
      await study.click();
      const beforeScroll = await page.evaluate(() => window.scrollY);
      await clickVisible(page, page.getByRole('button', { name: opposite === 'tr' ? 'TR — Türkçeye geç' : 'EN — Switch to English' }));
      assert.equal(await page.getByRole('button', { name: translations[opposite].ui.closeCaseStudy }).first().getAttribute('aria-expanded'), 'true');
      assert.equal(await page.evaluate(() => window.scrollY), beforeScroll, 'Language change preserves scroll position');
      await page.reload({ waitUntil: 'networkidle' });
      assert.equal(await page.locator('html').getAttribute('lang'), opposite, 'Language preference survives reload');
      if (width === 360) {
        await page.getByRole('button', { name: translations[opposite].nav.openMenu }).click();
        await page.getByRole('navigation', { name: translations[opposite].nav.mainNavigation }).getByRole('link', { name: /Contact|İletişim/ }).click();
        assert.equal(await page.getByRole('button', { name: translations[opposite].nav.openMenu }).getAttribute('aria-expanded'), 'false');
        await page.getByRole('button', { name: translations[opposite].nav.openMenu }).click();
        await page.setViewportSize({ width: 1440, height: 1000 });
        await page.locator('#mobile-navigation').waitFor({ state: 'hidden' });
      }
      await page.close();
      results.push({ width, language, errors });
    }
  }
  const animated = await browser.newPage({ viewport: { width: 1440, height: 1000 }, reducedMotion: 'no-preference' });
  await animated.goto(base, { waitUntil: 'networkidle' });
  await animated.getByRole('button', { name: translations.en.ui.caseStudy }).first().click();
  await animated.waitForFunction(() => document.getElementById('matte-study').getBoundingClientRect().height > 300);
  await animated.getByRole('button', { name: translations.en.ui.closeCaseStudy }).click();
  await animated.waitForFunction(() => document.getElementById('matte-study').getBoundingClientRect().height === 0);
  await animated.close();
  results.push({ scenario: 'animated disclosure opens and closes', errors: [] });

  const touch = await browser.newPage({ viewport: { width: 360, height: 800 }, isMobile: true, hasTouch: true, reducedMotion: 'reduce' });
  await touch.goto(base, { waitUntil: 'networkidle' });
  await touch.getByRole('button', { name: /^View screenshot:/ }).first().tap();
  const image = await touch.getByRole('dialog').getByRole('img').boundingBox();
  const cdp = await touch.context().newCDPSession(touch);
  const startX = image.x + image.width / 2 + 70;
  const y = image.y + image.height / 2;
  await cdp.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x: startX, y }] });
  for (const offset of [20, 40, 70, 100, 140]) {
    await cdp.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [{ x: startX - offset, y }] });
  }
  await cdp.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
  await touch.waitForFunction((caption) => document.querySelector('dialog').getAttribute('aria-label') === caption, translations.en.projects.matte.captions[1]);
  await touch.close();
  results.push({ scenario: 'touch swipe remains available with reduced motion', errors: [] });
} finally { await browser.close(); }
await writeFile('artifacts/browser-results.json', `${JSON.stringify(results, null, 2)}\n`);
console.log(JSON.stringify(results, null, 2));
if (results.some((result) => result.errors.length)) process.exitCode = 1;

