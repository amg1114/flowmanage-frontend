import { Component } from '@angular/core';
import { HorizontalBrandComponent } from '../horizontal-brand/horizontal-brand.component';

import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [
    HorizontalBrandComponent,
    RouterLink,
    RouterLinkActive,
    CommonModule,
  ],
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  readonly menuItems = [
    {
      name: 'Home',
      route: '/',
    },
    {
      name: 'About',
      route: '/about',
    },
    {
      name: 'Contact',
      route: '/contact',
    },
  ];
}
