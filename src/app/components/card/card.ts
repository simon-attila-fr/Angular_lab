import { Component, input, signal } from '@angular/core';
import { SafeResourceUrl } from '@angular/platform-browser';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-card',
  imports: [RouterLink],
  templateUrl: './card.html',
  styleUrl: './card.css',
})
export class Card {
    videoId      = input("");
    thumbnailURL = input("");
    title        = input("");
    description  = input("");
    showVideo    = input(false);
    showThumbnail= input(true);
    safeURL      = input<SafeResourceUrl | null>(null);
    truncatedDescription = signal(25 < Number(this.description().length) ? false : true);

    handleTruncateDescription() {
      this.truncatedDescription.set(!this.truncatedDescription());
    }
}
