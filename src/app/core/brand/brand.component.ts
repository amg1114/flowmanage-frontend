import { Component } from '@angular/core';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-brand',
  imports: [HeaderComponent, RouterOutlet],
  template: `
    <app-header />
    <main class="container inset-0 flex md:h-[70vh]">
      <article class="self-center max-w-md">
        <router-outlet></router-outlet>
      </article>
      <div
        class="absolute w-1/2 right-0 top-0 hidden md:block h-[75vh] bg-no-repeat bg-cover bg-center bg-heroThumb rounded-bl-3xl"
      >
        <span
          class="absolute inset-0 bg-light-primary/85 rounded-bl-3xl"
        ></span>
        <figure class="absolute z-10 -translate-x-[20%] bottom-0 left-0">
          <img src="/hero/hero-figure.png" alt="App Indicators" width="750px" />
        </figure>
      </div>
    </main>
  `,
})
export class BrandComponent {}