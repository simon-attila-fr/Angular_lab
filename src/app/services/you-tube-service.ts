import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { AuthService } from './auth-service';

const baseURL = 'https://www.googleapis.com/youtube/v3/';
const searchURL = 'search'; // List
const getByIdURL = 'videos';

const userPlaylistURL = 'playlists/';
const userPlaylisURLParams = '?part=snippet,contentDetails,id&mine=true';

@Injectable({
  providedIn: 'root',
})
export class YouTubeService {
  private readonly http = inject(HttpClient);
  private readonly auth = inject(AuthService);
  private sanitizer = inject(DomSanitizer)
  private readonly YouTubeAPIKey: string = environment.YouTubeAPI_key;
  
  search(searchParams: string[]) {
    if(searchParams.length === 1) {
      const url: string = `${baseURL}${searchURL}?part=snippet&type=video&q=${searchParams}&maxResults=25&type=video&key=${this.YouTubeAPIKey}`;
      return this.http.get(url)
    } else {
      let searchString = "";
      for (let i = 0; i < searchParams.length; i++) {
        if(i === searchParams.length - 1) {
            searchString += `${searchParams[i]}`
        } else {
          searchString += `${searchParams[i]}+`
        }        
      }
      const url =`${baseURL}${searchURL}?part=snippet&type=video&q=${searchString}&maxResults=25&type=video&key=${this.YouTubeAPIKey}`
      return this.http.get<{ items?: object[] }>(url, { responseType: 'json' })
    }
  }

  getVideoById(videoId: string) {
    const url: string = `${baseURL}${getByIdURL}?part=snippet&part=player&id=${videoId}&key=${this.YouTubeAPIKey}`;
    console.log("one video url: ", url);
    return this.http.get<{ items?: object[] }>(url, { responseType: 'json' })
  }

  getEmbedURL(id: string): SafeResourceUrl {
      const safeURL = this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/` + id);
      return safeURL;
  }

  getUserPlaylist() {
      const accessToken: string = this.auth.getAccessToken();
      return this.http.get(
        `${baseURL}${userPlaylistURL}${userPlaylisURLParams}`,
        {
          headers: { 'Authorization': `Bearer ${accessToken}` },
          observe: 'response',
          // credentials: 'include'
        }
      );
  }
}
