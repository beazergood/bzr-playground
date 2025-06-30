# Analog.js Blog Setup & Architecture

## Project Overview
A personal blog built with Analog.js that serves as both a creative outlet and living portfolio, featuring interactive components and experimental designs for each post.

## Initial Setup

### 1. Create the Analog.js Project
```bash
npm create analog@latest bzr-playground
cd bzr-playground
npm install
```

Choose the following options:
- ✅ Angular 20
- ✅ Tailwind CSS (for quick styling)
- ✅ Prettier

### 2. Project Structure
```
src/
├── app/
│   ├── pages/
│   │   ├── index.page.ts           # Homepage/post list
│   │   ├── about.page.ts           # About page
│   │   ├── (blog)/                 # Blog route group
│   │   │   └── [slug].page.ts      # Dynamic blog post pages
│   └── components/
│       ├── layout/
│       │   ├── header.component.ts
│       │   └── footer.component.ts
│       ├── blog/
│       │   ├── post-card.component.ts
│       │   └── post-list.component.ts
│       └── interactive/            # Post-specific components
│           └── f1/
│               ├── pit-stop-animation.component.ts
│               ├── drs-demo.component.ts
│               └── race-strategy.component.ts
├── content/
│   └── posts/
│       └── f1-parallels.agx        # First blog post
└── styles/
    └── themes/
        └── post-themes.css         # Post-specific styles
```

### 3. Configure Content Collection

Create `src/content/config.ts`:
```typescript
import { defineCollection, z } from '@analogjs/content';

export const collections = {
  posts: defineCollection({
    schema: z.object({
      title: z.string(),
      date: z.date(),
      description: z.string(),
      tags: z.array(z.string()),
      interactive: z.boolean().optional(),
      theme: z.string().optional(), // For custom post themes
    }),
  }),
};
```

### 4. Create the Blog Post Page Component

`src/app/pages/(blog)/[slug].page.ts`:
```typescript
import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { ContentRenderer, injectContent } from '@analogjs/content';
import { MarkdownComponent } from '@analogjs/markdown';

@Component({
  selector: 'blog-post',
  standalone: true,
  imports: [AsyncPipe, MarkdownComponent],
  template: `
    <article class="blog-post" [attr.data-theme]="post?.attributes?.theme">
      @if (post$ | async; as post) {
        <header class="post-header">
          <h1>{{ post.attributes.title }}</h1>
          <time>{{ post.attributes.date | date }}</time>
        </header>
        
        <analog-markdown 
          [content]="post.content"
          [components]="customComponents">
        </analog-markdown>
      }
    </article>
  `,
  styles: [`
    :host {
      display: block;
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem;
    }
    
    .post-header {
      margin-bottom: 3rem;
      text-align: center;
    }
    
    /* Theme-specific styles will override */
    .blog-post[data-theme="f1"] {
      --accent: #e10600;
      --bg-dark: #15151e;
    }
  `]
})
export default class BlogPostPage {
  // Inject custom components for MDX
  customComponents = {
    'pit-stop-animation': () => import('../components/interactive/f1/pit-stop-animation.component'),
    'drs-demo': () => import('../components/interactive/f1/drs-demo.component'),
    'race-strategy': () => import('../components/interactive/f1/race-strategy.component'),
  };
  
  readonly post$ = injectContent<{ 
    title: string;
    date: Date;
    description: string;
    theme?: string;
  }>();
}
```

### 5. Homepage with Post List

`src/app/pages/index.page.ts`:
```typescript
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { injectContentFiles } from '@analogjs/content';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="home">
      <header class="hero">
        <h1>BZR Playground</h1>
        <p>Where code meets creativity</p>
      </header>
      
      <section class="posts">
        @for (post of posts; track post.slug) {
          <article class="post-card" [attr.data-interactive]="post.attributes.interactive">
            <a [routerLink]="['/blog', post.slug]">
              <h2>{{ post.attributes.title }}</h2>
              <p>{{ post.attributes.description }}</p>
              <time>{{ post.attributes.date | date }}</time>
              @if (post.attributes.interactive) {
                <span class="badge">Interactive</span>
              }
            </a>
          </article>
        }
      </section>
    </div>
  `,
  styles: [`
    .hero {
      text-align: center;
      padding: 4rem 0;
    }
    
    .posts {
      display: grid;
      gap: 2rem;
      max-width: 800px;
      margin: 0 auto;
    }
    
    .post-card {
      border: 1px solid #ddd;
      padding: 1.5rem;
      border-radius: 8px;
      transition: transform 0.2s;
    }
    
    .post-card:hover {
      transform: translateY(-2px);
    }
    
    .post-card[data-interactive="true"] {
      border-color: var(--accent, #0066cc);
    }
    
    .badge {
      display: inline-block;
      padding: 0.25rem 0.5rem;
      background: var(--accent, #0066cc);
      color: white;
      border-radius: 4px;
      font-size: 0.75rem;
      margin-top: 0.5rem;
    }
  `]
})
export default class HomePage {
  readonly posts = injectContentFiles<{
    title: string;
    date: Date;
    description: string;
    interactive?: boolean;
  }>((contentFile) => contentFile.filename.includes('/posts/'));
}
```

### 6. Interactive Component Example

`src/app/components/interactive/f1/pit-stop-animation.component.ts`:
```typescript
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'pit-stop-animation',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="pit-stop-container">
      <div class="race-track">
        <div class="car" [class.in-pit]="inPit" (click)="triggerPitStop()">
          🏎️
        </div>
        <div class="pit-lane">
          <div class="pit-crew" [class.active]="inPit">
            👨‍🔧👨‍🔧👨‍🔧
          </div>
        </div>
      </div>
      
      <div class="code-comparison">
        <pre><code>{{ inPit ? asyncCode : syncCode }}</code></pre>
      </div>
      
      <button (click)="triggerPitStop()">
        {{ inPit ? 'Resume Race' : 'Enter Pit Stop' }}
      </button>
    </div>
  `,
  styles: [`
    .pit-stop-container {
      background: #1a1a1a;
      border-radius: 12px;
      padding: 2rem;
      color: white;
    }
    
    .race-track {
      position: relative;
      height: 200px;
      margin-bottom: 2rem;
    }
    
    .car {
      position: absolute;
      font-size: 2rem;
      cursor: pointer;
      transition: all 1s ease;
      top: 50px;
      left: 10%;
    }
    
    .car.in-pit {
      top: 120px;
      left: 50%;
    }
    
    .pit-crew {
      position: absolute;
      top: 120px;
      left: 48%;
      opacity: 0;
      transition: opacity 0.5s;
    }
    
    .pit-crew.active {
      opacity: 1;
    }
    
    button {
      background: #e10600;
      color: white;
      border: none;
      padding: 0.75rem 1.5rem;
      border-radius: 6px;
      cursor: pointer;
      font-weight: bold;
    }
  `]
})
export class PitStopAnimationComponent implements OnInit {
  inPit = false;
  
  syncCode = `// Synchronous - blocks everything
changeTires();
refuel();
adjustWing();
// Race continues only after ALL complete`;
  
  asyncCode = `// Asynchronous - race continues
await Promise.all([
  changeTires(),
  refuel(),
  adjustWing()
]);
// Other cars keep racing while we pit!`;
  
  triggerPitStop() {
    this.inPit = !this.inPit;
  }
  
  ngOnInit() {
    // Animation setup
  }
}
```

### 7. Development Workflow

```bash
# Start dev server
npm run dev

# Create new blog post
touch src/content/posts/new-post.agx

# Build for production
npm run build

# Preview production build
npm run preview
```

### 8. Deployment Options

1. **Vercel** (Recommended)
   ```bash
   npm i -g vercel
   vercel
   ```

2. **Netlify**
   - Push to GitHub
   - Connect repo to Netlify
   - Build command: `npm run build`
   - Publish directory: `dist/analog/public`

### Key Features to Implement

- **RSS Feed**: Use `@analogjs/content` utilities
- **Syntax Highlighting**: Add Prism.js or Shiki
- **SEO**: Use Angular meta tags in each page
- **Dark Mode**: CSS custom properties with theme switcher
- **Analytics**: Simple privacy-focused analytics

### Next Steps

1. Create the F1 blog post in `src/content/posts/f1-parallels.agx`
2. Build the interactive components
3. Style with your preferred approach (Tailwind/custom CSS)
4. Deploy and share!

This setup gives you a modern, performant blog that showcases your Angular skills while providing complete creative freedom for each post.