import { Component, input } from '@angular/core';
import { Card } from '../card/card';

@Component({
  selector: 'app-search-result-list',
  imports: [Card],
  templateUrl: './search-result-list.html',
  styleUrl: './search-result-list.css',
})
export class SearchResultList {
  searchResultItems = input<any[]>([]);
}
