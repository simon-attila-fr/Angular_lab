import { Component, inject, OnInit } from '@angular/core';
import { YouTubeService } from '../../services/you-tube-service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-home',
  imports: [FormsModule],
  templateUrl: './user-home.html',
  styleUrl: './user-home.css',
})
export class UserHome {
  youTube = inject(YouTubeService);
  searchField: string = "";

  handleSearchClick() {
    console.log("Searching...")
    const searchFieldArray = this.searchField.split(",");
    this.youTube.search(searchFieldArray).subscribe((res) => {
      console.log("YouTube response:")
      console.log(res)
    })
  }
}
