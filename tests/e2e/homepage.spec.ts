import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display the main heading', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'BZR Playground' })).toBeVisible();
  });

  test('should display the tagline', async ({ page }) => {
    await expect(page.getByText('Where code meets creativity')).toBeVisible();
  });

  test('should have a posts section', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Latest Posts' })).toBeVisible();
  });

  test('should display blog posts when available', async ({ page }) => {
    // Wait for page to load
    await page.waitForLoadState('networkidle');
    
    // Check if we have posts or empty state
    const hasPostCard = await page.locator('.post-card').count() > 0;
    const hasEmptyState = await page.getByText('No posts yet. Check back soon!').isVisible();
    
    // Should have either posts or empty state
    expect(hasPostCard || hasEmptyState).toBeTruthy();
    
    if (hasPostCard) {
      await expect(page.locator('text=Racing Through Code')).toBeVisible();
      await expect(page.getByText('Interactive')).toBeVisible();
    }
  });

  test('should navigate to blog post when clicked', async ({ page }) => {
    // Wait for page to load
    await page.waitForLoadState('networkidle');
    
    const hasPostCard = await page.locator('.post-card').count() > 0;
    
    if (hasPostCard) {
      // Click on the F1 blog post
      await page.locator('text=Racing Through Code').click();
      
      // Should navigate to blog post page
      await expect(page).toHaveURL('/blog/f1-parallels');
    }
  });

  test('should be responsive on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    
    await expect(page.getByRole('heading', { name: 'BZR Playground' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Latest Posts' })).toBeVisible();
  });
});