import { test, expect, type Page } from '@playwright/test';

// Pages checked in every engine. Each check loads the page, fails on
// console errors or failed same-origin requests, checks the single h1
// and the footer follow links, and saves a full-page screenshot.
const PAGES: { name: string; path: string }[] = [
  { name: 'home', path: '/' },
  { name: 'what-it-does', path: '/what-it-does/' },
  { name: 'architecture', path: '/architecture/' },
  { name: 'download', path: '/download/' },
  { name: 'docs-index', path: '/docs/' },
  { name: 'family', path: '/family/' },
  { name: 'privacy', path: '/privacy/' },
];

const ORIGIN = 'http://127.0.0.1:4391';

// Third-party requests (the analytics beacon) are answered locally so a
// run never calls out and never counts as a visit.
async function isolate(page: Page) {
  await page.route(
    (url) => url.origin !== ORIGIN,
    (route) =>
      route.fulfill({
        status: 200,
        contentType: route.request().resourceType() === 'script' ? 'text/javascript' : 'text/plain',
        body: '',
      }),
  );
}

function collectProblems(page: Page) {
  const problems: string[] = [];
  page.on('console', (msg) => {
    if (msg.type() === 'error') problems.push(`console: ${msg.text()}`);
  });
  page.on('pageerror', (err) => problems.push(`pageerror: ${err.message}`));
  page.on('requestfailed', (req) => {
    if (req.url().startsWith(ORIGIN)) problems.push(`requestfailed: ${req.url()} ${req.failure()?.errorText ?? ''}`);
  });
  page.on('response', (res) => {
    if (res.url().startsWith(ORIGIN) && res.status() >= 400) problems.push(`http ${res.status()}: ${res.url()}`);
  });
  return problems;
}

for (const p of PAGES) {
  test(`${p.name} renders`, async ({ page }, testInfo) => {
    await isolate(page);
    const problems = collectProblems(page);

    const res = await page.goto(p.path, { waitUntil: 'load' });
    expect(res?.status(), 'page status').toBe(200);
    await page.waitForLoadState('networkidle');

    await expect(page.locator('h1'), 'exactly one h1').toHaveCount(1);
    await expect(page.locator('h1')).toBeVisible();

    const footer = page.locator('footer');
    await expect(footer.locator('a[href="https://www.linkedin.com/company/114564073/"]')).toHaveCount(1);
    await expect(footer.locator('a[href="https://x.com/ClawlessAi"]')).toHaveCount(1);

    // Scroll through once so content revealed on scroll is in the screenshot.
    await page.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += window.innerHeight) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 120));
      }
      window.scrollTo(0, 0);
    });
    await page.waitForTimeout(300);

    const shot = await page.screenshot({ fullPage: true });
    await testInfo.attach(`${p.name}-${testInfo.project.name}.png`, { body: shot, contentType: 'image/png' });

    expect(problems, problems.join('\n')).toEqual([]);
  });
}

test('mobile menu opens and closes', async ({ page, isMobile }, testInfo) => {
  test.skip(!isMobile, 'phone profiles only');
  await isolate(page);
  const problems = collectProblems(page);
  await page.goto('/');

  const toggle = page.getByRole('button', { name: 'Menu', exact: true });
  await expect(toggle).toBeVisible();
  await expect(toggle).toHaveAttribute('aria-expanded', 'false');
  await toggle.click();

  const panel = page.getByRole('navigation', { name: 'Mobile' });
  await expect(panel).toBeVisible();
  await expect(toggle).toHaveAttribute('aria-expanded', 'true');
  await expect(panel.locator('a[href]').first()).toBeVisible();

  const shot = await page.screenshot();
  await testInfo.attach(`mobile-menu-${testInfo.project.name}.png`, { body: shot, contentType: 'image/png' });

  await toggle.click();
  await expect(panel).toBeHidden();
  expect(problems, problems.join('\n')).toEqual([]);
});
