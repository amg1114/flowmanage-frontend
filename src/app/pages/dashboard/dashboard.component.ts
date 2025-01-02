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
  templateUrl: './dashboard.component.html',
  styles: ``,
})
export class DashboardComponent implements OnInit {
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
