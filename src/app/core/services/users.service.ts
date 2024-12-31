import { Injectable } from '@angular/core';
import { LoggedUser } from '../interfaces/user/user.interface';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private userData = new BehaviorSubject<LoggedUser | null>(null);
  loggedUser = this.userData.asObservable();

  constructor() {}

  setLoggedUser(user: LoggedUser): void {
    this.userData.next(user);
  }

  clearLoggedUser(): void {
    this.userData.next(null);
  }
}
