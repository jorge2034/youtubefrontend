export interface Item {
  id?: number;
  name: string;
  description: string;
  thumbnail?: string;
  isChannel?: boolean;
}

export interface Video {
  id?: number;
  name: string;
  description: string;
  date: string;
  thumbnail?: string;
  views?: number;
  likes?: number;
  dislikes?: number;
  comments?: number;
  embedUrl?: string;
  url?: string;
}