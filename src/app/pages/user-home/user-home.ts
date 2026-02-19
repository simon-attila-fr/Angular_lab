import { Component, inject, OnInit, signal } from '@angular/core';
import { YouTubeService } from '../../services/you-tube-service';
import { FormsModule } from '@angular/forms';
import { SearchResultList } from '../../components/search-result-list/search-result-list';

@Component({
  selector: 'app-user-home',
  imports: [FormsModule, SearchResultList],
  templateUrl: './user-home.html',
  styleUrl: './user-home.css',
})
export class UserHome {
  youTube = inject(YouTubeService);
  searchField = signal("");
  searchResult = signal({});
  searchResultItems = signal([]);


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
