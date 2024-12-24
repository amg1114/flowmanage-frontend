import { Component } from '@angular/core';
import { HeaderComponent } from '@shared/components/partials/header/header.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-brand',
  imports: [HeaderComponent, RouterOutlet],
  template: `
    <app-header />
    <main class="flex md:h-[70vh] md:w-2/5">
      <article
        class="h-[60vh] w-full self-center overflow-hidden md:h-auto md:max-w-md"
      >
        <router-outlet></router-outlet>
      </article>
      <!-- Hero Thumb -->
      <div
        class="absolute bottom-0 left-0 h-[30vh] w-full rounded-t-full bg-cover bg-center bg-no-repeat md:bottom-auto md:left-auto md:right-0 md:top-0 md:block md:h-[75vh] md:w-1/2 md:rounded-t-none md:rounded-bl-3xl md:bg-heroThumb"
      >
        <span
          class="absolute inset-0 rounded-t-full bg-light-secondary from-dark-secondary to-light-secondary opacity-85 md:rounded-t-none md:rounded-bl-3xl md:bg-gradient-to-r"
        ></span>
        <figure
          class="absolute bottom-0 left-1/2 z-10 mx-auto w-full max-w-xs -translate-x-1/2 md:left-0 md:max-w-screen-md md:-translate-x-[20%]"
        >
          <img src="/hero/hero-figure.png" alt="App Indicators" width="750px" />
        </figure>
      </div>
    </main>
  `,
})
export class BrandComponent {}
