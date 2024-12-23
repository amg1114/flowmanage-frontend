import { Component } from '@angular/core';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-brand',
  imports: [HeaderComponent, RouterOutlet],
  template: `
    <app-header />
    <main class="absolute container inset-0 flex">
      <article class="self-center max-w-md">
        <router-outlet></router-outlet>
      </article>
    </main>
  `,
})
export class BrandComponent {}
