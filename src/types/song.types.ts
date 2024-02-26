export type Song = {
  id: string;
  title: string;
  artist_name: string;
  album: string | null;
  audio: string;
  image: string | null;
  created_at: string;
};

export type SongSectionChoice = "new" | "top";

export interface SongParamsSearch {
  ordering: string;
  page: number;
  page_size: number;
}

export interface Banner {
  title: string;
  image: string;
}
