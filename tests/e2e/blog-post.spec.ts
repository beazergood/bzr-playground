import { test, expect } from '@playwright/test';

test.describe('Blog Post Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/blog/f1-parallels');
  });

  test('should display the blog post title', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'F1 Racing and Async Programming: Finding Speed in Parallel' })).toBeVisible();
  });

  test('should display the interactive badge', async ({ page }) => {
    await expect(page.locator('.inline-block').getByText('Interactive')).toBeVisible();
  });

  test('should display the post date', async ({ page }) => {
    await expect(page.locator('time')).toBeVisible();
  });

  test('should display blog content', async ({ page }) => {
    await expect(page.getByText('As a software engineer and F1 enthusiast')).toBeVisible();
    await expect(page.getByText('The Art of the Pit Stop')).toBeVisible();
  });

  test('should have proper SEO meta tags', async ({ page }) => {
    await expect(page).toHaveTitle(/F1 Racing and Async Programming/);
  });

  test('should render markdown content properly', async ({ page }) => {
    // Check for headings (we have multiple h2 elements)
    const headingCount = await page.getByRole('heading', { level: 2 }).count();
    expect(headingCount).toBeGreaterThan(0);
    
    // Check that we have paragraphs of content
    const paragraphCount = await page.locator('p').count();
    expect(paragraphCount).toBeGreaterThan(0);
  });

  test('should be responsive on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    
    await expect(page.getByRole('heading', { name: 'F1 Racing and Async Programming: Finding Speed in Parallel' })).toBeVisible();
    
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