import 'zone.js';
import '@angular/compiler';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { CommonModule } from '@angular/common';

import { AppComponent } from './app/app.component';

// Define simple routes for now
const routes = [
  { 
    path: '', 
    loadComponent: () => import('./app/pages/index.page').then(m => m.default) 
  },
  { 
    path: 'blog/:slug', 
    loadComponent: () => import('./app/pages/(blog)/[slug].page').then(m => m.default) 
  },
  { path: '**', redirectTo: '' }
];

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    importProvidersFrom(CommonModule)
  ]
}).catch(err => console.error('Bootstrap error:', err));