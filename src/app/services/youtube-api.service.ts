import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class YoutubeApiService {
  private readonly url = 'http://localhost:8000/';
  constructor(
    private readonly httpClient: HttpClient,
    protected _sanitizer: DomSanitizer,
  ) {}

  search(query: string) {
    return this.httpClient.get(this.url + 'search', {
      params: {
        part: 'snippet,id',
        maxResults: '25',
        q: query,
        // type: 'video,channel',
        // order: 'viewCount',
      },
    });
  }

  getVideoDetails(videoId: string) {
    return this.httpClient
      .get(this.url + 'videos', {
        params: {
          part: 'snippet,contentDetails,statistics',
          id: videoId,
        },
      })
      .pipe(
        map((data: any) => {
          const item = data.items[0];
          return {
            id: item.id,
            name: item.snippet.title,
            description: item.snippet.description,
            date: item.snippet.publishedAt.split('T')[0],
            thumbnail: item.snippet.thumbnails.medium.url,
            duration: item.contentDetails.duration,
            views: item.statistics.viewCount,
            likes: item.statistics.likeCount,
            dislikes: item.statistics.dislikeCount,
            comments: item.statistics.commentCount,
            embedUrl: this._sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${item.id}`),
            url: `https://www.youtube.com/watch?v=${item.id}`,
          };
        })
      );
  }

  getChannelDetails(channelId: string) {
    return this.httpClient
      .get(this.url + 'channels', {
        params: {
          part: 'snippet,contentDetails,statistics',
          id: channelId,
        },
      })
      .pipe(
        map((data: any) => {
          const item = data.items[0];
          return {
            id: item.id,
            name: item.snippet.title,
            description: item.snippet.description,
            date: item.snippet.publishedAt.split('T')[0],
            thumbnail: item.snippet.thumbnails.medium.url,
            views: item.statistics.viewCount,
            subscribers: item.statistics.subscriberCount,
            url: `https://www.youtube.com/channel/${item.id}`,
          };
        })
      );
  }

  getChannelVideos(channelId: string) {
    return this.httpClient.get(this.url + 'search', {
      params: {
        part: 'snippet',
        channelId,
        order: 'date',
        maxResults: '50',
      },
    }).pipe(
      map((data: any) => {
        return data.items.map((item: any) => ({
          id: item.id.videoId,
          name: item.snippet.title,
          description: item.snippet.description,
          date: item.snippet.publishedAt.split('T')[0],
          thumbnail: item.snippet.thumbnails.medium.url,
          url: `https://www.youtube.com/watch?v=${item.id.videoId}`,
        }));
      })
    );
  }
}
