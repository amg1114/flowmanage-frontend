import { Component } from '@angular/core';
import { StyledLinkComponent } from '../../../shared/components/typography/styled-link.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  imports: [StyledLinkComponent, RouterLink],
})
export class HomePageComponent {}
