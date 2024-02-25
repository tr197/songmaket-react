export type Song = {
    id: string;
    title: string;
    artist_name: string; 
    album: string | null;
    audio: string;
    image: string | null;
    created_at: string;
  };