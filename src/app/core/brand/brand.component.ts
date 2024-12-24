import { Component } from '@angular/core';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { RouterOutlet } from '@angular/router';
import { HeroComponent } from './components/hero/hero.component';

@Component({
  selector: 'app-brand',
  imports: [HeaderComponent, RouterOutlet, HeroComponent],
  template: `
    <app-header />
    <main class="h-[75vh] container inset-0 flex self-stretch">
      <article class="self-center max-w-md">
        <router-outlet></router-outlet>
      </article>
      <app-hero class="absolute w-1/2 right-0 top-0" />
    </main>
  `,
})
export class BrandComponent {}
