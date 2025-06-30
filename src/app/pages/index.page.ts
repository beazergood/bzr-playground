import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DatePipe, CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, DatePipe, CommonModule],
  template: `
    <div class="home min-h-screen bg-gray-50">
      <header class="hero text-center py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <h1 class="text-5xl font-bold mb-4">BZR Playground</h1>
        <p class="text-xl opacity-90">Where code meets creativity</p>
      </header>
      
      <section class="posts max-w-4xl mx-auto px-4 py-12">
        <h2 class="text-3xl font-bold mb-8 text-center text-gray-800">Latest Posts</h2>
        
        <div class="grid gap-6">
          <div *ngFor="let post of posts; trackBy: trackBySlug" 
               class="post-card bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow duration-300"
               [attr.data-interactive]="post.interactive">
            <a [routerLink]="['/blog', post.slug]" class="block">
              <h2 class="text-2xl font-semibold mb-3 text-gray-900 hover:text-blue-600 transition-colors">
                {{ post.title }}
              </h2>
              <p class="text-gray-600 mb-4 leading-relaxed">
                {{ post.description }}
              </p>
              <div class="flex items-center justify-between">
                <time class="text-sm text-gray-500">
                  {{ post.date | date }}
                </time>
                <span *ngIf="post.interactive" 
                      class="inline-block px-3 py-1 bg-blue-500 text-white rounded-full text-sm font-medium">
                  Interactive
                </span>
              </div>
            </a>
          </div>
        </div>
        
        <div *ngIf="posts.length === 0" class="text-center py-12">
          <p class="text-gray-600 text-lg">No posts yet. Check back soon!</p>
        </div>
      </section>
    </div>
  `,
  styles: [`
    .post-card[data-interactive="true"] {
      border-left: 4px solid #3b82f6;
    }
    
    .post-card:hover {
      transform: translateY(-2px);
    }
  `]
})
export default class HomePage {
  // Mock posts for now
  posts = [
    {
      slug: 'f1-parallels',
      title: 'F1 Racing and Async Programming: Finding Speed in Parallel',
      description: 'Exploring how Formula 1 racing strategies mirror asynchronous programming concepts, from pit stops to race management.',
      date: new Date('2024-01-15'),
      interactive: true
    }
  ];
  
  trackBySlug(index: number, post: any) {
    return post.slug;
  }
}