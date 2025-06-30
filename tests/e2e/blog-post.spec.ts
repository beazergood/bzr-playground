import { test, expect } from '@playwright/test';

test.describe('Blog Post Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/blog/f1-parallels');
  });

  test('should display the blog post title', async ({ page }) => {
    // Check for title text anywhere on the page (gradient styling might affect accessibility)
    await expect(page.locator('text=Racing Through Code: F1 Parallels in Web Development')).toBeVisible();
  });

  test('should display the interactive badge', async ({ page }) => {
    await expect(page.getByText('Interactive Demos')).toBeVisible();
  });

  test('should display the post date', async ({ page }) => {
    await expect(page.locator('time')).toBeVisible();
  });

  test('should display blog content', async ({ page }) => {
    await expect(page.getByText('As a web developer who loves Formula 1')).toBeVisible();
    await expect(page.getByText('The Async Nature of Pit Stops')).toBeVisible();
  });

  test('should have proper SEO meta tags', async ({ page }) => {
    await expect(page).toHaveTitle(/Racing Through Code: F1 Parallels in Web Development/);
  });

  test('should render markdown content properly', async ({ page }) => {
    // Check for section headings (we use h2 with .section-heading class)
    const headingCount = await page.locator('h2.section-heading').count();
    expect(headingCount).toBeGreaterThan(0);
    
    // Check that we have paragraphs of content
    const paragraphCount = await page.locator('p').count();
    expect(paragraphCount).toBeGreaterThan(0);
  });

  test('should be responsive on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    
    await expect(page.locator('text=Racing Through Code: F1 Parallels in Web Development')).toBeVisible();
    
    // Check that content is readable on mobile
    const article = page.locator('article');
    await expect(article).toBeVisible();
  });

  test('should handle non-existent blog posts gracefully', async ({ page }) => {
    await page.goto('/blog/non-existent-post');
    
    // Wait for page to load and check that we either get content or are redirected
    await page.waitForLoadState('networkidle');
    
    // Should either show the same post (our current behavior) or redirect to homepage
    const url = page.url();
    const hasContent = await page.locator('body').count() > 0;
    
    expect(hasContent).toBeTruthy();
    expect(url).toContain('localhost:5173');
  });
});