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
    <article class="blog-post max-w-5xl mx-auto px-4 py-8" data-theme="f1">
      <!-- Hero Header -->
      <header class="post-header mb-16 text-center relative overflow-hidden">
        <div class="hero-gradient absolute inset-0 opacity-10"></div>
        <div class="relative z-10">
          <div class="mb-6">
            <span class="inline-block text-6xl mb-4">🏁</span>
            <h1 class="text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-red-600 via-red-500 to-orange-500 bg-clip-text text-transparent">
              {{ post.title }}
            </h1>
            <p class="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              <em>Lights out and away we code!</em> Discovering the surprising parallels between Formula 1 racing and modern web development.
            </p>
          </div>
          <div class="flex items-center justify-center gap-4 text-lg">
            <time class="flex items-center gap-2 text-gray-600">
              <span class="text-2xl">📅</span>
              {{ post.date | date }}
            </time>
            <div *ngIf="post.interactive" class="flex items-center gap-2">
              <span class="text-2xl">⚡</span>
              <span class="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full font-medium shadow-lg">
                Interactive Demos
              </span>
            </div>
          </div>
        </div>
      </header>
      
      <!-- Content -->
      <div class="prose prose-lg max-w-none text-gray-800">
        <!-- Introduction -->
        <div class="intro-section bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-8 mb-12 border border-gray-200">
          <p class="text-xl leading-relaxed mb-6">
            As a web developer who loves Formula 1, I've noticed fascinating parallels between the two worlds. What started as a casual observation about pit stops resembling async functions has turned into a deeper appreciation for how both disciplines share core principles of <strong>optimization</strong>, <strong>strategy</strong>, and <strong>relentless iteration</strong>.
          </p>
          <div class="grid md:grid-cols-2 gap-6 text-base">
            <div class="flex items-start gap-3">
              <span class="text-2xl">🏎️</span>
              <div>
                <strong>F1 Racing:</strong> 20 cars, 300+ km/h, split-second decisions
              </div>
            </div>
            <div class="flex items-start gap-3">
              <span class="text-2xl">💻</span>
              <div>
                <strong>Web Development:</strong> Multiple threads, millisecond response times, async operations
              </div>
            </div>
          </div>
        </div>

        <!-- Async Pit Stops -->
        <section class="mb-16">
          <h2 class="section-heading">🔄 The Async Nature of Pit Stops</h2>
          <p class="mb-6 text-lg">
            Picture this: Lewis Hamilton diving into the pit lane while Max Verstappen continues racing. The race doesn't pause - it's <strong>asynchronous by nature</strong>. While one process (driver) is blocked (in the pits), others continue executing.
          </p>

          <pit-stop-animation></pit-stop-animation>

          <div class="code-section">
            <h3 class="text-lg font-semibold mb-4 flex items-center gap-2">
              <span class="text-2xl">⚡</span>
              Race Lap Implementation
            </h3>
            <pre class="code-block"><code>async function raceLap(driver: Driver): Promise&lt;LapResult&gt; {
  if (driver.needsPitStop()) {
    // Driver pits, but the race continues asynchronously
    await pitStop(driver);
  }
  return driver.completeLap();
}

// All drivers race simultaneously - just like Promise.all()!
const results = await Promise.all(
  drivers.map(driver => raceLap(driver))
);

console.log('Race continues while pit stops happen! 🏁');</code></pre>
          </div>
        </section>

        <!-- DRS Caching -->
        <section class="mb-16">
          <h2 class="section-heading">🚀 DRS Zones = Strategic Caching</h2>
          <p class="mb-6 text-lg">
            DRS (Drag Reduction System) provides a speed boost in designated zones - but only if you're within one second of the car ahead. It's remarkably similar to caching strategies!
          </p>

          <drs-demo></drs-demo>

          <div class="comparison-grid">
            <div class="comparison-card">
              <h4>🏎️ DRS System</h4>
              <ul>
                <li>Within 1 second of car ahead</li>
                <li>Only in designated zones</li>
                <li>Strategic activation for overtaking</li>
                <li>Temporary performance boost</li>
              </ul>
            </div>
            <div class="comparison-card">
              <h4>💾 Cache System</h4>
              <ul>
                <li>Within TTL window</li>
                <li>Only for cacheable resources</li>
                <li>Strategic invalidation</li>
                <li>Temporary speed improvement</li>
              </ul>
            </div>
          </div>

          <div class="code-section">
            <h3 class="text-lg font-semibold mb-4 flex items-center gap-2">
              <span class="text-2xl">🎯</span>
              DRS-Inspired Cache Implementation
            </h3>
            <pre class="code-block"><code>class DRSCache {
  private cache = new Map&lt;string, CacheEntry&gt;();
  private readonly TTL = 1000; // 1 second, just like DRS gap!
  
  get(key: string): any | null {
    const cached = this.cache.get(key);
    if (cached && Date.now() - cached.timestamp < this.TTL) {
      console.log('🚀 DRS activated! Cache hit!');
      return cached.value;
    }
    console.log('❌ Too far behind, no boost');
    return null;
  }
  
  set(key: string, value: any): void {
    this.cache.set(key, {
      value,
      timestamp: Date.now()
    });
  }
}</code></pre>
          </div>
        </section>

        <!-- Race Strategy -->
        <section class="mb-16">
          <h2 class="section-heading">🎯 Race Strategy ≈ System Architecture</h2>
          <p class="mb-6 text-lg">
            F1 teams plan tire strategies like we architect systems. Each choice has trade-offs between performance and longevity.
          </p>

          <race-strategy></race-strategy>

          <div class="strategy-table">
            <table class="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-lg">
              <thead class="bg-gradient-to-r from-red-600 to-red-500 text-white">
                <tr>
                  <th class="p-4 text-left">F1 Strategy</th>
                  <th class="p-4 text-left">Web Development Equivalent</th>
                </tr>
              </thead>
              <tbody>
                <tr class="border-b border-gray-200 hover:bg-gray-50">
                  <td class="p-4"><strong>🔴 Soft Tires</strong><br><small>Fast but degrade quickly</small></td>
                  <td class="p-4"><strong>Bleeding-edge framework</strong><br><small>High performance but might break</small></td>
                </tr>
                <tr class="border-b border-gray-200 hover:bg-gray-50">
                  <td class="p-4"><strong>🟡 Medium Tires</strong><br><small>Balanced performance</small></td>
                  <td class="p-4"><strong>Modern, stable tech</strong><br><small>Good performance and reliability</small></td>
                </tr>
                <tr class="border-b border-gray-200 hover:bg-gray-50">
                  <td class="p-4"><strong>⚪ Hard Tires</strong><br><small>Slower but ultra-reliable</small></td>
                  <td class="p-4"><strong>Battle-tested solutions</strong><br><small>Proven, dependable technologies</small></td>
                </tr>
                <tr class="hover:bg-gray-50">
                  <td class="p-4"><strong>🔄 Split Strategy</strong><br><small>Different approaches per car</small></td>
                  <td class="p-4"><strong>Microservices</strong><br><small>Different tech per service</small></td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <!-- Team Radio -->
        <section class="mb-16">
          <h2 class="section-heading">📻 Team Radio = Observability</h2>
          <div class="radio-section bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-200">
            <p class="mb-6 text-lg">
              <em>"Box, box, box!"</em> The constant stream of telemetry and communication between drivers and engineers mirrors our monitoring systems perfectly.
            </p>
            
            <div class="code-section">
              <pre class="code-block"><code>class RaceEngineer {
  constructor(private driver: Driver) {
    this.telemetry = new TelemetryStream();
    
    // Continuous monitoring - just like APM tools!
    this.telemetry.on('high-tire-temp', () => {
      this.radio.send('⚠️ Manage your tires! Deg is high!');
    });
    
    this.telemetry.on('fuel-critical', () => {
      this.radio.send('🚨 Lift and coast, fuel critical!');
    });
    
    this.telemetry.on('gap-closing', () => {
      this.radio.send('📻 Gap to car behind: 1.2 seconds');
    });
  }
}

// In web dev terms:
logger.error('Memory usage critical!');    // "Box, box, box!"
metrics.alert('Response time degraded');   // "Tires are gone!"
monitoring.warn('High CPU usage');         // "Lift and coast!"</code></pre>
            </div>
          </div>
        </section>

        <!-- Marginal Gains -->
        <section class="mb-16">
          <h2 class="section-heading">📈 The Philosophy: Marginal Gains</h2>
          <p class="mb-6 text-lg">
            Both F1 and web development obsess over tiny improvements that compound into significant advantages.
          </p>
          
          <div class="gains-comparison">
            <div class="gains-card f1-gains">
              <h4>🏎️ F1 Approach</h4>
              <div class="gains-list">
                <div class="gain-item">Improve aerodynamics → <span class="gain-value">-0.05s</span></div>
                <div class="gain-item">Reduce pit stop time → <span class="gain-value">-0.1s</span></div>
                <div class="gain-item">Optimize fuel mix → <span class="gain-value">-0.02s</span></div>
                <div class="total-gain">Total lap time saved: <strong>-0.17s</strong></div>
              </div>
            </div>
            
            <div class="gains-card web-gains">
              <h4>💻 Web Dev Approach</h4>
              <div class="gains-list">
                <div class="gain-item">Enable compression → <span class="gain-value">-50ms</span></div>
                <div class="gain-item">Implement caching → <span class="gain-value">-100ms</span></div>
                <div class="gain-item">Optimize queries → <span class="gain-value">-20ms</span></div>
                <div class="total-gain">Total response time: <strong>-170ms</strong></div>
              </div>
            </div>
          </div>
        </section>

        <!-- Conclusion -->
        <section class="conclusion-section">
          <h2 class="section-heading">🏆 The Podium Celebration</h2>
          <div class="conclusion-content bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 border border-green-200">
            <p class="text-lg mb-6">
              What I love most about both worlds is the constant push for excellence. Whether you're chasing pole position or perfecting your CI/CD pipeline, success requires:
            </p>
            
            <div class="principles-grid">
              <div class="principle">
                <span class="principle-icon">🔄</span>
                <strong>Continuous Iteration</strong>
                <p>Every race/sprint improves the next</p>
              </div>
              <div class="principle">
                <span class="principle-icon">📊</span>
                <strong>Data-Driven Decisions</strong>
                <p>Telemetry and metrics guide strategy</p>
              </div>
              <div class="principle">
                <span class="principle-icon">🤝</span>
                <strong>Team Collaboration</strong>
                <p>Success requires everyone performing</p>
              </div>
              <div class="principle">
                <span class="principle-icon">🛡️</span>
                <strong>Graceful Degradation</strong>
                <p>When things go wrong, fail safely</p>
              </div>
            </div>

            <p class="text-lg mt-8 text-center italic">
              So next time you're debugging async code while watching F1, remember - you're not just procrastinating, you're observing parallel optimization strategies in action! 🏎️
            </p>
          </div>
        </section>
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
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    }

    /* Hero Section */
    .hero-gradient {
      background: linear-gradient(135deg, #e10600 0%, #ff6b35 100%);
    }

    /* Section Headings */
    .section-heading {
      font-size: 2.5rem;
      font-weight: bold;
      margin: 3rem 0 1.5rem 0;
      color: #e10600;
      border-left: 6px solid #e10600;
      padding-left: 1.5rem;
      position: relative;
    }

    .section-heading::before {
      content: '';
      position: absolute;
      left: -6px;
      top: 0;
      bottom: 0;
      width: 6px;
      background: linear-gradient(to bottom, #e10600, #ff6b35);
    }

    /* Code Sections */
    .code-section {
      margin: 2rem 0;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 8px 32px rgba(0,0,0,0.1);
    }

    .code-block {
      background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
      color: #e2e8f0;
      padding: 1.5rem;
      border-radius: 12px;
      font-family: 'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, 'Courier New', monospace;
      font-size: 0.9rem;
      line-height: 1.6;
      overflow-x: auto;
      border: 1px solid #475569;
    }

    .code-block code {
      color: #e2e8f0;
    }

    /* Comparison Grid */
    .comparison-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;
      margin: 2rem 0;
    }

    .comparison-card {
      background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
      border: 2px solid #e2e8f0;
      border-radius: 16px;
      padding: 2rem;
      box-shadow: 0 4px 16px rgba(0,0,0,0.05);
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }

    .comparison-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 8px 32px rgba(0,0,0,0.1);
    }

    .comparison-card h4 {
      font-size: 1.25rem;
      font-weight: bold;
      margin-bottom: 1rem;
      color: #1e293b;
    }

    .comparison-card ul {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    .comparison-card li {
      padding: 0.5rem 0;
      border-bottom: 1px solid #e2e8f0;
      color: #475569;
    }

    .comparison-card li:last-child {
      border-bottom: none;
    }

    /* Strategy Table */
    .strategy-table {
      margin: 2rem 0;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 8px 32px rgba(0,0,0,0.1);
    }

    .strategy-table table {
      width: 100%;
      border-collapse: collapse;
    }

    .strategy-table th {
      font-weight: bold;
      text-align: left;
    }

    /* Radio Section */
    .radio-section {
      position: relative;
    }

    .radio-section::before {
      content: '📻';
      position: absolute;
      top: 1rem;
      right: 1rem;
      font-size: 3rem;
      opacity: 0.3;
    }

    /* Gains Comparison */
    .gains-comparison {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;
      margin: 2rem 0;
    }

    .gains-card {
      border-radius: 16px;
      padding: 2rem;
      position: relative;
      overflow: hidden;
    }

    .f1-gains {
      background: linear-gradient(135deg, #fef3c7 0%, #fbbf24 100%);
      border: 2px solid #f59e0b;
    }

    .web-gains {
      background: linear-gradient(135deg, #dbeafe 0%, #3b82f6 100%);
      border: 2px solid #2563eb;
      color: white;
    }

    .gains-card h4 {
      font-size: 1.25rem;
      font-weight: bold;
      margin-bottom: 1rem;
    }

    .f1-gains h4 {
      color: #92400e;
    }

    .web-gains h4 {
      color: white;
    }

    .gain-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.5rem 0;
      border-bottom: 1px solid rgba(0,0,0,0.1);
    }

    .gain-value {
      font-weight: bold;
      font-family: 'SF Mono', Monaco, monospace;
    }

    .f1-gains .gain-value {
      color: #dc2626;
    }

    .web-gains .gain-value {
      color: #fbbf24;
    }

    .total-gain {
      margin-top: 1rem;
      padding-top: 1rem;
      border-top: 2px solid rgba(0,0,0,0.2);
      font-size: 1.1rem;
      text-align: center;
    }

    /* Principles Grid */
    .principles-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 2rem;
      margin: 2rem 0;
    }

    .principle {
      text-align: center;
      padding: 1.5rem;
      background: white;
      border-radius: 12px;
      border: 2px solid #e2e8f0;
      transition: transform 0.3s ease;
    }

    .principle:hover {
      transform: translateY(-4px);
      border-color: #10b981;
    }

    .principle-icon {
      display: block;
      font-size: 3rem;
      margin-bottom: 1rem;
    }

    .principle strong {
      display: block;
      font-size: 1.1rem;
      margin-bottom: 0.5rem;
      color: #1e293b;
    }

    .principle p {
      color: #64748b;
      margin: 0;
      font-size: 0.9rem;
    }

    /* Responsive Design */
    @media (max-width: 768px) {
      .section-heading {
        font-size: 2rem;
        padding-left: 1rem;
      }

      .comparison-grid,
      .gains-comparison,
      .principles-grid {
        grid-template-columns: 1fr;
        gap: 1rem;
      }

      .code-block {
        font-size: 0.8rem;
        padding: 1rem;
      }

      .blog-post {
        padding: 1rem;
      }
    }

    /* Enhanced Prose Styling */
    .prose {
      color: #374151;
      line-height: 1.7;
    }

    .prose p {
      margin-bottom: 1.5rem;
    }

    .prose strong {
      color: #1f2937;
      font-weight: 600;
    }

    .prose em {
      color: #e10600;
      font-style: italic;
    }
  `]
})
export default class BlogPostPage implements OnInit {
  post = {
    title: 'Racing Through Code: F1 Parallels in Web Development',
    date: new Date('2025-06-30'),
    description: 'Discovering surprising parallels between Formula 1 racing and web development - from async pit stops to caching DRS zones, team radio observability, and marginal gains philosophy.',
    interactive: true
  };

  constructor() {}

  private titleService = inject(Title);

  ngOnInit() {
    // Set the page title for SEO
    this.titleService.setTitle(this.post.title);
  }
}