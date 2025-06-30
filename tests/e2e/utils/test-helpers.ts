import { Page, expect } from '@playwright/test';

export class BlogTestHelpers {
  constructor(private page: Page) {}

  async waitForPageLoad() {
    await this.page.waitForLoadState('networkidle');
  }

  async navigateToHomepage() {
    await this.page.goto('/');
    await this.waitForPageLoad();
  }

  async navigateToBlogPost(slug: string) {
    await this.page.goto(`/blog/${slug}`);
    await this.waitForPageLoad();
  }

  async assertPostsLoaded() {
    await this.page.waitForFunction(() => {
      const debugElement = document.querySelector('.debug');
      return debugElement && debugElement.textContent?.includes('Found');
    });
  }

  async getPostCount(): Promise<number> {
    await this.assertPostsLoaded();
    const debugText = await this.page.locator('.debug').textContent();
    const match = debugText?.match(/Found (\d+) posts/);
    return match ? parseInt(match[1]) : 0;
  }

  async assertInteractiveComponent(componentName: string) {
    await expect(this.page.getByText(componentName)).toBeVisible();
  }

  async clickPitStopButton(action: 'enter' | 'resume' = 'enter') {
    const buttonText = action === 'enter' ? /Enter Pit Stop/i : /Resume Race/i;
    await this.page.getByRole('button', { name: buttonText }).click();
  }

  async assertPitStopMode(mode: 'sync' | 'async') {
    const expectedText = mode === 'sync' ? 'Synchronous Programming' : 'Asynchronous Programming';
    await expect(this.page.getByText(expectedText)).toBeVisible();
  }
}