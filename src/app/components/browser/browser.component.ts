import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { YoutubeApiService } from '../../services/youtube-api.service';
import { FormsModule } from '@angular/forms';
import { Item } from '../../interfaces';
import { RouterModule } from '@angular/router';
import { CacheService } from '../../services/cache.service';

@Component({
  selector: 'app-browser',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  providers: [YoutubeApiService],
  templateUrl: './browser.component.html',
  styleUrl: './browser.component.scss',
})
export class BrowserComponent implements OnInit {
  searchQuery = '';
  results$ = this.youtubeApiService.search(this.searchQuery);
  results: Array<Item> = [];

  constructor(
    private readonly youtubeApiService: YoutubeApiService, 
    private readonly cacheService: CacheService,
  ) {}

  ngOnInit(): void {
    if (this.cacheService.get('results')) {
      this.results = this.cacheService.get('results');
    } else {
      this.loadData();
    }
  }

  loadData() {
    this.results$.subscribe((data: any) => {
      this.results = data.items.map((item: any) => ({
        id: item.id.videoId || item.id.channelId,
        name: item.snippet.title,
        description: item.snippet.description,
        thumbnail: item.snippet.thumbnails.medium.url,
        isChannel: item.id.kind === 'youtube#channel',
      }));

      this.cacheService.set('results', this.results);
    });
  }

  handleSearch() {
    this.results$ = this.youtubeApiService.search(this.searchQuery);
    this.loadData();
  }
}
