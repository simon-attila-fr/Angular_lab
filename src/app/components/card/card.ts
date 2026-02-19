import { Component, input } from '@angular/core';
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
}
