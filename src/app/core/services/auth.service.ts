import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isLoggedIn = false;

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    return this.http
      .post<{ access_token: string }>('/api/auth/login', {
        email,
        password,
      })
      .pipe(
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

  isAuthenticated(): boolean {
    return this.isLoggedIn;
  }
}
