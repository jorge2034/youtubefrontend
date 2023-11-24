import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { YoutubeApiService } from '../../services/youtube-api.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-channel',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './channel.component.html',
  styleUrl: './channel.component.scss',
})
export class ChannelComponent {
  @Input()
  set id(channelId: string) {
    this.loadData(channelId);
  }
  data: any;
  lastVideos: any = [];

  constructor(private readonly youtubeApiService: YoutubeApiService) {}

  loadData(channelId: string) {
    this.youtubeApiService
      .getChannelDetails(channelId)
      .subscribe((data: any) => {
        this.data = data;
        this.loadLatestVideos(channelId);
      });
  }

  loadLatestVideos(channelId: string) {
    this.youtubeApiService
      .getChannelVideos(channelId)
      .subscribe((data: any) => {
        this.lastVideos = data;
      });
  }
}
