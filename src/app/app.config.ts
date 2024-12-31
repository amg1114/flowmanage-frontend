import {
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {
  provideHttpClient,
  withInterceptors,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { authInterceptor } from './core/interceptors/auth.interceptor';
import { apiInterceptor } from './core/interceptors/api.interceptor';
import { JwtModule } from '@auth0/angular-jwt';
import { AuthService } from './core/services/auth.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    importProvidersFrom(
      JwtModule.forRoot({
        config: {
          tokenGetter: () => localStorage.getItem(AuthService.AUTH_TOKEN_KEY),
        },
      }),
    ),
    provideHttpClient(
      withInterceptorsFromDi(),
      withInterceptors([apiInterceptor, authInterceptor]),
    ),
  ],
};
