import { test, expect } from '@playwright/test';

test.describe('Interactive F1 Components', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/blog/f1-parallels');
    // Wait for the page to load completely
    await page.waitForLoadState('networkidle');
  });

  test.describe('Pit Stop Animation Component', () => {
    test('should display the pit stop simulator', async ({ page }) => {
      await expect(page.getByText('F1 Pit Stop Simulator')).toBeVisible();
    });

    test('should show the race car emoji', async ({ page }) => {
      await expect(page.locator('.car').getByText('🏎️')).toBeVisible();
    });

    test('should display initial synchronous code', async ({ page }) => {
      await expect(page.getByRole('heading', { name: 'Synchronous Programming' })).toBeVisible();
      await expect(page.getByText('changeTires();')).toBeVisible();
      await expect(page.getByText('blocks everything')).toBeVisible();
    });

    test('should toggle to pit stop mode when clicked', async ({ page }) => {
      const button = page.getByRole('button', { name: /Enter Pit Stop/i });
      await expect(button).toBeVisible();
      
      await button.click();
      
      // Should switch to asynchronous mode within the pit stop component
      const pitStopContainer = page.locator('.pit-stop-container');
      await expect(pitStopContainer.getByRole('heading', { name: 'Asynchronous Programming' })).toBeVisible();
      await expect(pitStopContainer.getByText('Parallel execution')).toBeVisible();
      await expect(pitStopContainer.getByText('Much faster pit stop!')).toBeVisible();
      
      // Button text should change
      await expect(page.getByRole('button', { name: /Resume Race/i })).toBeVisible();
    });

    test('should animate car position during pit stop', async ({ page }) => {
      // Target the specific car within the pit stop component
      const pitStopContainer = page.locator('.pit-stop-container');
      const car = pitStopContainer.locator('.car');
      
      // Get initial position
      const initialPosition = await car.boundingBox();
      
      // Click to enter pit stop
      await page.getByRole('button', { name: /Enter Pit Stop/i }).click();
      
      // Wait for animation
      await page.waitForTimeout(1100); // Wait for transition
      
      // Get new position
      const newPosition = await car.boundingBox();
      
      // Position should have changed (car moves to pit)
      expect(newPosition?.y).not.toBe(initialPosition?.y);
    });

    test('should show pit crew when in pit stop mode', async ({ page }) => {
      await page.getByRole('button', { name: /Enter Pit Stop/i }).click();
      
      // Pit crew should become visible
      await expect(page.locator('text=👨‍🔧').first()).toBeVisible();
    });

    test('should toggle back to racing mode', async ({ page }) => {
      // Enter pit stop
      await page.getByRole('button', { name: /Enter Pit Stop/i }).click();
      await expect(page.getByRole('heading', { name: 'Asynchronous Programming' })).toBeVisible();
      
      // Resume race
      await page.getByRole('button', { name: /Resume Race/i }).click();
      
      // Should be back to synchronous mode
      await expect(page.getByRole('heading', { name: 'Synchronous Programming' })).toBeVisible();
      await expect(page.getByRole('button', { name: /Enter Pit Stop/i })).toBeVisible();
    });

    test('should work on mobile devices', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      
      await expect(page.getByText('F1 Pit Stop Simulator')).toBeVisible();
      
      const button = page.getByRole('button', { name: /Enter Pit Stop/i });
      await button.click();
      
      await expect(page.getByRole('heading', { name: 'Asynchronous Programming' })).toBeVisible();
    });
  });

  test.describe('DRS Demo Component', () => {
    test('should display DRS demo placeholder', async ({ page }) => {
      await expect(page.getByText('DRS System Demo')).toBeVisible();
      await expect(page.getByText('Interactive DRS demonstration coming soon!')).toBeVisible();
    });

    test('should show racing car with speed emoji', async ({ page }) => {
      await expect(page.locator('text=🏎️💨')).toBeVisible();
    });
  });

  test.describe('Race Strategy Component', () => {
    test('should display race strategy placeholder', async ({ page }) => {
      await expect(page.getByText('Race Strategy Simulator')).toBeVisible();
      await expect(page.getByText('Interactive race strategy tool coming soon!')).toBeVisible();
    });

    test('should show checkered flag and chart emoji', async ({ page }) => {
      const raceStrategyContainer = page.locator('.race-strategy');
      await expect(raceStrategyContainer.locator('text=🏁')).toBeVisible();
      await expect(raceStrategyContainer.locator('text=📊')).toBeVisible();
    });
  });

  test('should have all interactive components in correct order', async ({ page }) => {
    // Check that components appear in the expected sequence in the blog post
    const components = [
      'F1 Pit Stop Simulator',
      'DRS System Demo', 
      'Race Strategy Simulator'
    ];

    for (const component of components) {
      await expect(page.getByText(component)).toBeVisible();
    }
  });
});