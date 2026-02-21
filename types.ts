
export interface DramaItem {
  title: string;
  book_id: string | null;
  image: string;
  views?: string | number;
  episodes?: string;
  rank?: string;
}

export interface HomeResult {
  latest: DramaItem[];
  trending: DramaItem[];
}

export interface HomeResponse {
  status: boolean;
  creator: string;
  result: HomeResult;
}

export interface SearchResponse {
  status: boolean;
  creator: string;
  result: DramaItem[];
}

export interface Episode {
  episode: number;
  id: string;
}

export interface DramaDetail {
  book_id: string;
  title: string;
  description: string;
  thumbnail: string;
  upload_date: string;
  stats: {
    total_episodes: string;
  };
  episode_list: Episode[];
}

export interface DetailResponse {
  status: boolean;
  creator: string;
  result: DramaDetail;
}

export interface StreamResponse {
  status: boolean;
  creator: string;
  result: {
    book_id: string;
    episode: string;
    video_url: string;
  };
}
