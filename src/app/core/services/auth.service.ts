import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, tap, throwError } from 'rxjs';
import { UserLogin } from '../interfaces/user/login.interface';
import { UserRegister } from '../interfaces/user/register.interfacer';
import { LoginRes } from '../interfaces/responses/login-res.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isLoggedIn = false;

  constructor(private http: HttpClient) {}

  /**
   * Sends a login request to the server with the provided user credentials and retrieves an access token.
   *
   * @param data - An object containing user login credentials
   * @returns An Observable that emits the login response
   */
  login(data: UserLogin): Observable<LoginRes> {
    return this.http.post<LoginRes>('/api/auth/login', data).pipe(
      map((response) => {
        this.isLoggedIn = false;
        localStorage.setItem('access_token', response.access_token);

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
        this.isLoggedIn = true;
        console.log({ response });
        localStorage.setItem('access_token', response.access_token);
        return response;
      }),
      catchError((error) => {
        this.isLoggedIn = false;
        return throwError(() => error);
      }),
    );
  }

  isAuthenticated(): boolean {
    return this.isLoggedIn;
  }
}
