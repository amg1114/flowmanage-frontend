import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, tap, throwError } from 'rxjs';
import { UserLogin } from '../interfaces/user/login.interface';
import { UserRegister } from '../interfaces/user/register.interfacer';
import { LoginRes } from '../interfaces/responses/login-res.interface';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LoggedUser } from '../interfaces/user/user.interface';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  /**
   * A constant key used to store and retrieve the authentication token from storage.
   * This key is used to identify the access token in the storage mechanism.
   */
  static AUTH_TOKEN_KEY = 'access_token';

  private isLoggedIn = false;

  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelperService,
    private userService: UsersService,
  ) {
    const token = localStorage.getItem(AuthService.AUTH_TOKEN_KEY);
    if (token) {
      const isTokenExpired = this.jwtHelper.isTokenExpired(token);
      this.isLoggedIn = !isTokenExpired;

      if (!isTokenExpired) {
        this.setLoggedUser();
      }

      return;
    }

    this.isLoggedIn = false;
  }

  /**
   * Sends a login request to the server with the provided user credentials and retrieves an access token.
   *
   * @param data - An object containing user login credentials
   * @returns An Observable that emits the login response
   */
  login(data: UserLogin): Observable<LoginRes> {
    return this.http.post<LoginRes>('/api/auth/login', data).pipe(
      map((response) => {
        localStorage.setItem(AuthService.AUTH_TOKEN_KEY, response.access_token);

        this.isLoggedIn = true;
        this.setLoggedUser();

        return response;
      }),
      catchError((error) => {
        this.isLoggedIn = false;
        return throwError(() => error);
      }),
    );
  }

  /**
   * Registers a new user with the provided data and updates the user session.
   *
   * @param data - The registration details for the new user.
   * @returns An Observable that emits the login response upon successful registration.
   */
  register(data: UserRegister): Observable<LoginRes> {
    return this.http.post<LoginRes>('/api/auth/register', data).pipe(
      map((response) => {
        localStorage.setItem('access_token', response.access_token);

        this.isLoggedIn = true;
        this.setLoggedUser();
        return response;
      }),
      catchError((error) => {
        this.isLoggedIn = false;
        return throwError(() => error);
      }),
    );
  }

  setLoggedUser(): void {
    if (this.isLoggedIn) {
      this.getUserData().subscribe((userData) => {
        if (userData) {
          this.userService.setLoggedUser(userData);
          return;
        }

        this.isLoggedIn = false;
      });
    }
  }

  /**
   * Retrieves the logged-in user's data.
   *
   * @returns {Observable<LoggedUser | null>} An observable that emits the logged-in user's data if the user is logged in, or `null` if the user is not logged in.
   */
  getUserData(): Observable<LoggedUser | null> {
    if (!this.isLoggedIn) {
      return of(null);
    }

    return this.http.get<LoggedUser>('/api/auth/profile');
  }

  isAuthenticated(): boolean {
    return this.isLoggedIn;
  }

  logout(): void {
    this.isLoggedIn = false;
    localStorage.removeItem(AuthService.AUTH_TOKEN_KEY);
  }
}
