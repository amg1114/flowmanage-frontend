import { Component } from '@angular/core';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-brand',
  imports: [HeaderComponent, RouterOutlet],
  template: `
    <app-header />
    <main class="container inset-0 flex md:h-[70vh]">
      <article class="w-full max-w-md self-center">
        <router-outlet class="w-full"></router-outlet>
      </article>
      <div
        class="absolute right-0 top-0 hidden h-[75vh] w-1/2 rounded-bl-3xl bg-heroThumb bg-cover bg-center bg-no-repeat md:block"
      >
        <span
          class="absolute inset-0 rounded-bl-3xl bg-light-primary/85"
        ></span>
        <figure class="absolute bottom-0 left-0 z-10 -translate-x-[20%]">
          <img src="/hero/hero-figure.png" alt="App Indicators" width="750px" />
        </figure>
      </div>
    </main>
  `,
})
export class BrandComponent {}
