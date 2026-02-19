import { HttpClient, HttpResponse } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

// const baseURL = 'https://dummyjson.com/auth/';
// const loginURL = 'login';
// const userDetailsURL = 'me';

export class AuthService {
  private readonly http = inject(HttpClient);
  userAuthenticated = signal(false);

  login(username: string, password: string) {
    console.log("Auth Service Login");
    this.userAuthenticated.set(true);
  }
}
