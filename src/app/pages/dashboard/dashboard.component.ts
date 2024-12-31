import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoggedUser } from '@app/core/interfaces/user/user.interface';
import { AuthService } from '@app/core/services/auth.service';
import { UsersService } from '@app/core/services/users.service';
import { LucideAngularModule, Loader } from 'lucide-angular';
import { HeaderComponent } from './partials/header/header.component';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, LucideAngularModule, HeaderComponent],
  templateUrl: './dashboard.component.html',
  styles: ``,
})
export class DashboardComponent {
  loggedUser: LoggedUser | null = null;
  loading = true;

  readonly LoaderIcon = Loader;

  constructor(private userService: UsersService) {
    this.userService.loggedUser.subscribe((user) => {
      this.loading = false;
      this.loggedUser = user;
    });
  }
}
