import { Component, effect, inject, signal } from '@angular/core';
import { Card } from "../../components/card/card";
import { YouTubeService } from '../../services/you-tube-service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-one-video',
  imports: [Card],
  templateUrl: './one-video.html',
  styleUrl: './one-video.css',
})
export class OneVideo {
    youTube      = inject(YouTubeService);
    videoId      = signal("");
    title        = signal("");
    thumbnailURL = signal("");
    description  = signal("");
    videoURL     = signal("");
    embedHtml    = signal("");

    constructor(route: ActivatedRoute) {
      const id: Observable<string> = route.params.pipe(map((p) => p['videoId']));
      let _id: string = "";
      id.subscribe((id) => {
        console.log(id);
        _id = id
      })
      effect(() => {
        // const id = this.videoId();
        if (_id) {
          this.youTube.getVideoById(_id).subscribe({
            next: (res: any) => {
              const item = res.items[0];
              this.title.set(item.snippet.title);
              this.thumbnailURL.set(item.snippet.thumbnails.standard.url);
              this.description.set(item.snippet.description);
              this.embedHtml.set(item.player.embedHtml);
            },
            error: (err) => {
              console.error(err)
            }
          });
        }
      });
    }
}
