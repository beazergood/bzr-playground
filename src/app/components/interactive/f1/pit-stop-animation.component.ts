import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'pit-stop-animation',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="pit-stop-container bg-gray-900 rounded-xl p-8 text-white my-8">
      <h3 class="text-2xl font-bold mb-6 text-center text-red-500">F1 Pit Stop Simulator</h3>
      
      <div class="race-track relative h-48 mb-8 bg-gray-800 rounded-lg overflow-hidden">
        <div class="track-line absolute top-16 left-0 right-0 h-1 bg-white opacity-30"></div>
        <div class="pit-line absolute top-32 left-0 right-0 h-1 bg-yellow-400 opacity-50"></div>
        
        <div class="car text-4xl absolute transition-all duration-1000 ease-in-out cursor-pointer hover:scale-110" 
             [style.top.px]="carPosition.top"
             [style.left.px]="carPosition.left"
             (click)="triggerPitStop()">
          🏎️
        </div>
        
        <div class="pit-crew absolute top-28 left-1/2 transform -translate-x-1/2 transition-opacity duration-500" 
             [class.opacity-100]="inPit"
             [class.opacity-0]="!inPit">
          <div class="flex space-x-2 text-2xl">
            <span class="animate-bounce" [style.animation-delay]="'0ms'">👨‍🔧</span>
            <span class="animate-bounce" [style.animation-delay]="'100ms'">👨‍🔧</span>
            <span class="animate-bounce" [style.animation-delay]="'200ms'">👨‍🔧</span>
          </div>
        </div>
      </div>
      
      <div class="code-comparison mb-6">
        <div class="bg-gray-800 rounded-lg p-4">
          <h4 class="text-lg font-semibold mb-3 text-blue-400">
            {{ inPit ? 'Asynchronous Programming' : 'Synchronous Programming' }}
          </h4>
          <pre class="text-sm text-green-400 font-mono leading-relaxed">
            <code>{{ inPit ? asyncCode : syncCode }}</code>
          </pre>
        </div>
      </div>
      
      <div class="text-center">
        <button 
          (click)="triggerPitStop()"
          class="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:scale-105">
          {{ inPit ? 'Resume Race 🏁' : 'Enter Pit Stop ⚡' }}
        </button>
      </div>
      
      <div class="explanation mt-6 text-sm text-gray-300 text-center">
        <p>Click the car or button to see how synchronous vs asynchronous operations work!</p>
      </div>
    </div>
  `,
  styles: [`
    .animate-bounce {
      animation: bounce 1s infinite;
    }
    
    @keyframes bounce {
      0%, 20%, 53%, 80%, 100% {
        transform: translate3d(0,0,0);
      }
      40%, 43% {
        transform: translate3d(0,-8px,0);
      }
      70% {
        transform: translate3d(0,-4px,0);
      }
      90% {
        transform: translate3d(0,-2px,0);
      }
    }
  `]
})
export class PitStopAnimationComponent implements OnInit {
  inPit = false;
  
  carPosition = {
    top: 50,
    left: 50
  };
  
  syncCode = `// Synchronous - blocks everything
changeTires();        // 🛞 Wait for completion
refuel();            // ⛽ Wait for completion  
adjustWing();        // 🔧 Wait for completion
// Race continues only after ALL complete
// Other cars keep racing while we wait! 😰`;
  
  asyncCode = `// Asynchronous - race continues
await Promise.all([
  changeTires(),     // 🛞 Parallel execution
  refuel(),         // ⛽ Parallel execution
  adjustWing()      // 🔧 Parallel execution
]);
// Other cars keep racing while we pit! 🏎️💨
// Much faster pit stop! ⚡`;
  
  ngOnInit() {
    this.resetCarPosition();
  }
  
  triggerPitStop() {
    this.inPit = !this.inPit;
    
    if (this.inPit) {
      this.carPosition = {
        top: 110,
        left: window.innerWidth > 768 ? 300 : 150
      };
    } else {
      this.resetCarPosition();
    }
  }
  
  private resetCarPosition() {
    this.carPosition = {
      top: 50,
      left: 50
    };
  }
}