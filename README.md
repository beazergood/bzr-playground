# 🏁 Racing Through Code - Interactive Dev Blog

A personal blog that's more than just words on a page. Each post is a playground showcasing different design languages, interactive components, and cutting-edge web technologies - all while delivering genuinely interesting content.

## 🎯 Vision

Think Squarespace theme demos meets technical blog. Every article is an opportunity to experiment with new technologies, create unique interactive experiences, and demonstrate both technical and design skills.

- **Not just another dev blog** - Each post has its own visual identity and interactive elements
- **Living portfolio** - Demonstrates real skills through working examples
- **Technical playground** - Explore new Angular features, animation libraries, and web APIs
- **Quality content** - Thoughtful writing enhanced by, not replaced by, interactive elements

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/yourusername/racing-through-code.git
cd racing-through-code

# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:5173
```

## 📁 Project Structure

```
src/
├── app/
│   ├── pages/              # Route pages
│   ├── components/         
│   │   ├── layout/         # Header, footer, navigation
│   │   ├── blog/           # Post list, cards, metadata
│   │   └── interactive/    # Post-specific components
│   │       ├── f1/         # F1 post components
│   │       ├── zen/        # Zen post components
│   │       └── retro/      # Retro gaming components
│   └── styles/
│       └── themes/         # Post-specific themes
├── content/
│   └── posts/              # Blog posts in .agx format
└── public/
    └── assets/             # Images, fonts, sounds
```

## ✍️ Creating a New Post

1. **Create the content file:**
```bash
touch src/content/posts/my-awesome-post.agx
```

2. **Add frontmatter and content:**
```markdown
---
title: "The Zen of State Management"
date: 2024-02-01
description: "Finding peace in the chaos of application state"
tags: ["State Management", "Angular", "RxJS"]
interactive: true
theme: "zen"
---

# Your content here

<zen-garden-visualization />
```

3. **Create interactive components:**
```typescript
// src/app/components/interactive/zen/zen-garden-visualization.component.ts
@Component({
  selector: 'zen-garden-visualization',
  standalone: true,
  template: `
    <div class="zen-garden">
      <!-- Your creative implementation -->
    </div>
  `
})
export class ZenGardenComponent {
  // Make it interactive!
}
```

4. **Register the component** in your blog post page component

## 🎨 Theme System

Each post can have its own visual theme. Define themes in CSS custom properties:

```css
/* src/app/styles/themes/zen-theme.css */
.blog-post[data-theme="zen"] {
  --primary: #2d4a2b;
  --accent: #8b956d;
  --bg: #f5f2e8;
  --font-display: 'Noto Serif JP', serif;
  
  /* Custom animations for this theme */
  --transition-speed: 2s;
  --easing: cubic-bezier(0.4, 0.0, 0.2, 1);
}
```

## 🧩 Interactive Component Ideas

### Already Implemented
- **Pit Stop Animation** - Demonstrates async operations with F1 pit stops
- **DRS Caching Demo** - Interactive explanation of caching strategies
- **Race Strategy Planner** - Tire strategy optimizer

### Planned Components
- [ ] **WebGL Particle System** - For the Zen post
- [ ] **8-bit Game Engine** - For the retro gaming post  
- [ ] **Live Code Editor** - For technical deep-dives
- [ ] **3D CSS Transforms** - For the CSS architecture post
- [ ] **Sound Visualizer** - For the Web Audio API post

## 🛠️ Technologies

- **Framework:** Angular 19 with standalone components
- **Meta-framework:** Analog.js for SSG/SSR capabilities
- **Styling:** Tailwind CSS + Custom CSS for unique themes
- **Animations:** Angular Animations API, CSS, GSAP (post-specific)
- **Build:** Vite for lightning-fast builds
- **Deployment:** Vercel/Netlify

## 📝 Writing Guidelines

1. **Content First** - The interactive elements enhance, not replace, good writing
2. **Progressive Enhancement** - Posts should be readable without JavaScript
3. **Performance Matters** - Lazy load heavy components
4. **Accessibility** - All interactions keyboard navigable, proper ARIA labels
5. **Mobile Friendly** - Touch-optimized interactions

## 🚦 Development Commands

```bash
# Development
npm run dev              # Start dev server
npm run dev:host         # Expose to network

# Building
npm run build           # Production build
npm run preview         # Preview production build

# Content
npm run new:post        # Scaffold new post (coming soon)

# Testing
npm run test            # Run tests
npm run test:watch      # Watch mode

# Code Quality
npm run lint            # Lint code
npm run format          # Format with Prettier
```

## 📈 Roadmap

### Phase 1: Foundation ✅
- [x] Analog.js setup
- [x] Blog infrastructure
- [x] F1 parallels post
- [x] Basic interactive components

### Phase 2: Enhancement 🚧
- [ ] RSS feed
- [ ] Dark mode toggle
- [ ] Post search/filter
- [ ] Reading time estimates
- [ ] Social sharing

### Phase 3: Advanced Features 📋
- [ ] WebGL experiments
- [ ] Sound design system
- [ ] Post performance metrics
- [ ] A/B test different designs
- [ ] Reader interaction tracking

### Phase 4: Community 🌟
- [ ] Comments system
- [ ] Newsletter integration
- [ ] Guest posts
- [ ] Component library
- [ ] Open source components

## 🤝 Contributing

While this is a personal blog, I'm open to:
- Bug reports
- Performance improvements  
- Accessibility enhancements
- Component ideas

Feel free to open an issue!

## 📄 License

MIT License - Feel free to use any code or components in your own projects!

## 🏆 Acknowledgments

- Inspired by the incredible work at [Squarespace](https://www.squarespace.com/templates)
- F1 for being an endless source of coding metaphors
- The Angular team for making standalone components a reality
- You, for reading this far!

---

**Current Status:** 🟢 In Active Development

*"It's lights out and away we code!"* 🏁