import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

// const baseURL = "https://developers.google.com/oauthplayground/?code=4/0AfrIepAFXaZy9SLqvknmqKrQCrA0JpHahCfq9Xy9N-uc6tlgTbMrXRXlFlkm4YV55hoxdQ&scope=https://www.googleapis.com/auth/youtube";
const baseURL = 'https://accounts.google.com/o/oauth2/v2/auth?';
const client_id = `client_id=${environment.AuthClientID}`;
const redirect_uri = 'redirect_uri=http://localhost:4200/userHome';
const state = "state=auth-request-sent";
const response_type = 'response_type=token';
const scope = 'scope=https://www.googleapis.com/auth/youtube.readonly'

const completedURL = `${baseURL}${client_id}&${redirect_uri}&${state}&${response_type}&${scope}`;

@Injectable({
  providedIn: 'root',
})

// const baseURL = 'https://dummyjson.com/auth/';
// const loginURL = 'login';
// const userDetailsURL = 'me';


export class AuthService {
  private readonly http = inject(HttpClient);
  userAuthenticated = signal(false);
  private accessToken: string = "";

  login(username: string, password: string) {
    console.log("Auth Service Login");

    // this.http.get(completedURL, {}).subscribe((res) => {
    //   console.log(res)
    // });
    window.open(completedURL, '_blank');
    this.userAuthenticated.set(true);
  }

  setAccessToken(accessToken: string) {
    this.accessToken = accessToken;
  }

  getAccessToken():string {
    return this.accessToken;
  }
}
