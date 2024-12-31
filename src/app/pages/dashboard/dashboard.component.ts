import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoggedUser } from '@app/core/interfaces/user/user.interface';
import { AuthService } from '@app/core/services/auth.service';
import { UsersService } from '@app/core/services/users.service';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule],
  template: `
    <div *ngIf="loading">
      <p>Loading...</p>
    </div>
    <div *ngIf="!loading && loggedUser">
      <h1>Welcome, {{ loggedUser.firstName }} {{ loggedUser.lastName }}</h1>
      <!-- <button (click)="router.navigate(['/logout'])">Logout</button> -->
    </div>
  `,
  styles: ``,
})
export class DashboardComponent {
  loggedUser: LoggedUser | null = null;
  loading = true;

  constructor(
    private authService: AuthService,
    private userService: UsersService,
    private router: Router,
  ) {
    this.userService.loggedUser.subscribe((user) => {
      this.loading = false;
      this.loggedUser = user;
    });
  }
}
