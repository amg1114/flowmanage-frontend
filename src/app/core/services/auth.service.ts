import { HttpClient } from '@angular/common/http';
import { computed, effect, Injectable, signal } from '@angular/core';
import { catchError, map, tap, throwError } from 'rxjs';
import { UserLogin } from '../interfaces/user/login.interface';
import { UserRegister } from '../interfaces/user/register.interfacer';
import { LoginRes } from '../interfaces/responses/login-res.interface';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LoggedUser } from '../interfaces/user/user.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  static AUTH_TOKEN_KEY = 'access_token';

  private token = signal<string | null>(null);

  loggedUser = signal<LoggedUser | null>(null);
  isLogged = computed(() => !!this.token());

  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelperService,
  ) {
    const token = localStorage.getItem(AuthService.AUTH_TOKEN_KEY);
    const isValid = token && !this.jwtHelper.isTokenExpired(token);

    if (isValid) {
      this.token.set(token);
    } else {
      this.logOut();
    }

    effect(() => {
      if (this.isLogged() && !this.loggedUser()) {
        this.fetchUser().subscribe();
      } else if (!this.isLogged()) {
        this.logOut();
      }
    });
  }

  private setToken(token: string | null, store = true) {
    if (token) {
      console.log('token', token);
      localStorage.setItem(AuthService.AUTH_TOKEN_KEY, token);
    } else {
      localStorage.removeItem(AuthService.AUTH_TOKEN_KEY);
    }

    this.token.set(token);
  }

  login(data: UserLogin) {
    return this.http.post<LoginRes>('/api/auth/login', data).pipe(
      map((res) => {
        this.setToken(res.access_token);
        return res;
      }),
      catchError((err) => {
        return throwError(() => err);
      }),
    );
  }

  logOut() {
    this.setToken(null);
    this.loggedUser.set(null);
  }

  register(data: UserRegister) {
    return this.http.post<LoginRes>('/api/auth/register', data).pipe(
      map((response) => {
        this.setToken(response.access_token);
        return response;
      }),
      catchError((error) => {
        this.setToken(null);
        return throwError(() => error);
      }),
    );
  }

  fetchUser() {
    return this.http.get<LoggedUser>('/api/auth/profile').pipe(
      tap((user) => {
        this.loggedUser.set(user);
      }),
      catchError((error) => {
        this.logOut();
        return throwError(() => error);
      }),
    );
  }
}
