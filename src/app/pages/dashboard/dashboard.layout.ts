import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoggedUser } from '@app/core/interfaces/user/user.interface';

import { UsersService } from '@app/core/services/users.service';
import { LucideAngularModule, Loader } from 'lucide-angular';
import { HeaderComponent } from './partials/header/header.component';
import { DashboardConfigService } from '@app/core/services/dashboard-config.service';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, LucideAngularModule, HeaderComponent, RouterOutlet],
  template: `
    <main class="container">
      <span
        class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-secondary dark:text-secondary-dark"
        *ngIf="loading"
      >
        <i-lucide [img]="LoaderIcon" class="h-16 w-16 animate-spin"></i-lucide>
      </span>
      <div
        class="relative flex h-screen flex-col gap-8"
        *ngIf="!loading && loggedUser"
      >
        <dashboard-header [loggedUser]="loggedUser" />
        <router-outlet></router-outlet>
      </div>
    </main>
  `,
})
export class DashboardLayout implements OnInit {
  loggedUser: LoggedUser | null = null;

  loading = true;

  readonly LoaderIcon = Loader;

  constructor(private userService: UsersService) {
    this.userService.loggedUser.subscribe((user) => {
      if (user) {
        this.loggedUser = user;
        this.loading = false;
      }
    });
  }

  ngOnInit(): void {}
}
