import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { YoutubeApiService } from '../../services/youtube-api.service';
import { Video } from '../../interfaces';

@Component({
  selector: 'app-video',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './video.component.html',
  styleUrl: './video.component.scss',
})
export class VideoComponent {
  @Input()
  set id(videoId: string) {
    this.loadData(videoId);
  }
  data: Video | null = null;

  constructor(private readonly youtubeApiService: YoutubeApiService) {}

  loadData(videoId: string) {
    this.youtubeApiService.getVideoDetails(videoId).subscribe((data: any) => {
      this.data = data;
    });
  }
} 
