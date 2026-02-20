import { Component, inject, OnInit, signal } from '@angular/core';
import { YouTubeService } from '../../services/you-tube-service';
import { FormsModule } from '@angular/forms';
import { SearchResultList } from '../../components/search-result-list/search-result-list';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-user-home',
  imports: [FormsModule, SearchResultList],
  templateUrl: './user-home.html',
  styleUrl: './user-home.css',
})
export class UserHome implements OnInit {
  youTube = inject(YouTubeService);
  auth    = inject(AuthService);
  searchField = signal("");
  searchResult = signal({});
  searchResultItems = signal([]);

  ngOnInit() {
    const hash = window.location.hash;
  
    const params = new URLSearchParams(hash.substring(1));
    const accessToken = params.get('access_token') ?? "";
    
    console.log('Access token:', accessToken);
    if(accessToken !== "") {
      this.auth.setAccessToken(accessToken);
    }
    this.youTube.getUserPlaylist().subscribe({
      next: (res: any) => {
        console.log("User's playlists");
        console.log(res);
        this.youTube.setUserPlaylists(res.items);
      },
      error: (err) => console.error(err)
    })
  }


  handleSearchClick() {
    console.log("Searching...")
    const searchFieldArray = this.searchField().split(",");
    console.log(searchFieldArray)
    this.youTube.search(searchFieldArray).subscribe({
      next: (res: any) => {
        console.log("YouTube response:")
        console.log(res)
        this.searchResult.set(res);
        this.searchResultItems.set(res.items ?? []);
      },
      error: (err) => console.error(err)
    })
  }
}
