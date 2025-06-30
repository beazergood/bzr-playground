import { Component, OnInit, inject } from '@angular/core';
import { DatePipe, CommonModule } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { PitStopAnimationComponent } from '../../components/interactive/f1/pit-stop-animation.component';
import { DrsDemoComponent } from '../../components/interactive/f1/drs-demo.component';
import { RaceStrategyComponent } from '../../components/interactive/f1/race-strategy.component';

@Component({
  selector: 'blog-post',
  standalone: true,
  imports: [DatePipe, CommonModule, PitStopAnimationComponent, DrsDemoComponent, RaceStrategyComponent],
  template: `
    <article class="blog-post max-w-4xl mx-auto px-4 py-8" data-theme="f1">
      <header class="post-header mb-12 text-center">
        <h1 class="text-4xl font-bold mb-4">{{ post.title }}</h1>
        <time class="text-gray-600 text-lg">{{ post.date | date }}</time>
        <div class="mt-4" *ngIf="post.interactive">
          <span class="inline-block px-3 py-1 bg-blue-500 text-white rounded-full text-sm font-medium">
            Interactive
          </span>
        </div>
      </header>
      
      <div class="prose prose-lg max-w-none">
        <div class="mb-8">
          <p class="text-lg text-gray-700 leading-relaxed">
            As a software engineer and F1 enthusiast, I've always been fascinated by the parallels between Formula 1 racing and asynchronous programming. Both domains are obsessed with speed, efficiency, and managing multiple concurrent operations.
          </p>
        </div>

        <h2 class="text-2xl font-bold mt-8 mb-4 text-red-600">The Art of the Pit Stop</h2>
        <p class="mb-6">
          In Formula 1, a pit stop is a masterclass in parallel processing. Watch any modern F1 pit stop, and you'll see 20+ crew members working in perfect synchronization.
        </p>

        <pit-stop-animation></pit-stop-animation>

        <p class="mt-6 mb-6">
          This is exactly what we achieve with asynchronous programming! Instead of waiting for each operation to complete before starting the next, we orchestrate multiple tasks to run in parallel.
        </p>

        <h2 class="text-2xl font-bold mt-8 mb-4 text-red-600">DRS Zones: Controlled Optimization</h2>
        <p class="mb-6">
          In F1, DRS zones are specific track sections where drivers can reduce drag for overtaking. In programming, we have similar "zones" where async optimization makes the biggest difference.
        </p>

        <drs-demo></drs-demo>

        <h2 class="text-2xl font-bold mt-8 mb-4 text-red-600">Race Strategy</h2>
        <p class="mb-6">
          Just as F1 drivers don't win championships by going fast in a straight line, we don't build great applications by making everything asynchronous.
        </p>

        <race-strategy></race-strategy>

        <h2 class="text-2xl font-bold mt-8 mb-4 text-red-600">Conclusion</h2>
        <p class="mb-6">
          Formula 1 and asynchronous programming share the same core philosophy: optimal performance through intelligent parallelization. The next time you're optimizing async code, think like an F1 strategist!
        </p>
      </div>
    </article>
  `,
  styles: [`
    :host {
      display: block;
    }
    
    .blog-post[data-theme="f1"] {
      --accent: #e10600;
      --bg-dark: #15151e;
    }
  `]
})
export default class BlogPostPage implements OnInit {
  post = {
    title: 'F1 Racing and Async Programming: Finding Speed in Parallel',
    date: new Date('2024-01-15'),
    description: 'Exploring how Formula 1 racing strategies mirror asynchronous programming concepts, from pit stops to race management.',
    interactive: true
  };

  constructor() {}

  private titleService = inject(Title);

  ngOnInit() {
    // Set the page title for SEO
    this.titleService.setTitle(this.post.title);
  }
}