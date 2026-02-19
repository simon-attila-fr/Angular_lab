import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

const baseURL = 'https://www.googleapis.com/youtube/v3/';
const searchURL = 'search';

@Injectable({
  providedIn: 'root',
})
export class YouTubeService {
  private readonly http = inject(HttpClient);
  private readonly YouTubeAPIKey: string = environment.YouTubeAPI_key;
  
  search(searchParams: string[]) {
    if(searchParams.length = 1) {
      return this.http.get(`${baseURL}${searchURL}?part=snippet&type=video&q=${searchParams}&maxResults=25&key=${this.YouTubeAPIKey}`)
    } else {
      let searchString = "";
      for (let i = 0; i < searchParams.length; i++) {
        if(i === searchParams.length - 1) {
            searchString += `${searchParams[i]}`
        } else {
          searchString += `${searchParams[i]}+`
        }        
      }
      return this.http.get(`${baseURL}${searchURL}?part=snippet&type=video&q=${searchString}&maxResults=25&key=${this.YouTubeAPIKey}`)
    }
  }
}
