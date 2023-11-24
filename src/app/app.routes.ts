import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/browser', pathMatch: 'full' },
  {
    path: 'browser',
    loadComponent: () =>
      import('./components/browser/browser.component').then(
        (m) => m.BrowserComponent
      ),
  },
  {
    path: 'video/:id',
    loadComponent: () =>
      import('./components/video/video.component').then(
        (m) => m.VideoComponent
      ),
  },
  {
    path: 'channel/:id',
    loadComponent: () =>
      import('./components/channel/channel.component').then(
        (m) => m.ChannelComponent
      ),
  }
];