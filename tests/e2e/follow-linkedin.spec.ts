import { test, expect } from '@playwright/test';

// LinkedIn Follow CTA — single-click external-link variant. Verifies
// the hero anchor opens the LinkedIn company page in a new tab and
// carries the safe rel attributes. Companion vitest spec at
// tests/follow-linkedin-flag.test.ts proves the PRE_LAUNCH conditional
// fires correctly on every branch.

test('Hero Follow-on-LinkedIn anchor: correct href, target, rel', async ({ page }) => {
  await page.goto('/');

  const heroLink = page.getByRole('link', { name: /Follow Clawless on LinkedIn/i }).first();
  await expect(heroLink).toBeVisible();

  await expect(heroLink).toHaveAttribute(
    'href',
    'https://www.linkedin.com/company/114564073/',
  );
  await expect(heroLink).toHaveAttribute('target', '_blank');
  await expect(heroLink).toHaveAttribute('rel', /noopener/);
  await expect(heroLink).toHaveAttribute('rel', /noreferrer/);

  // Privacy property: no LinkedIn JavaScript loads on page view in
  // this variant. We never load platform.linkedin.com.
  const linkedInScripts = await page.evaluate(() =>
    Array.from(document.querySelectorAll('script')).filter((s) => {
      const src = s.getAttribute('src') ?? '';
      const type = s.getAttribute('type') ?? '';
      return src.includes('platform.linkedin.com') || type === 'IN/FollowCompany';
    }).length,
  );
  expect(linkedInScripts).toBe(0);
});
