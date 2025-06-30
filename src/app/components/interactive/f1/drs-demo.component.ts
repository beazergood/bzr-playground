import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'drs-demo',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="drs-demo bg-blue-900 rounded-xl p-8 text-white my-8">
      <h3 class="text-2xl font-bold mb-4 text-center">DRS System Demo</h3>
      <div class="text-center">
        <p class="text-gray-300 mb-4">Interactive DRS demonstration coming soon!</p>
        <div class="text-6xl">🏎️💨</div>
      </div>
    </div>
  `
})
export class DrsDemoComponent {}