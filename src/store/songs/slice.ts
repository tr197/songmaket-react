import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Song, SongParamsSearch, Banner } from "@/types/song.types";
import AxiosApi from "@/services/api/AxiosApi";
import ApiUrls from "@/services/api/ApiUrls";
import { PAGE_SIZE } from "@/constants/constants";

const IDLE = "idle";
const LOADING = "loading";

type LoadingStatus = "idle" | "loading";

interface ListSongsResp {
  total: number;
  banners: Banner[];
  new_songs: Song[];
  top_songs: Song[];
}

export interface ListSong {
  status: LoadingStatus;
  data: Song[];
}

export interface SongsState {
  new_songs: ListSong;
  top_songs: ListSong;
  banners: Banner[];
  status: string;
  total: number;
}

const initialState: SongsState = {
  status: IDLE,
  total: 0,
  new_songs: {
    status: IDLE,
    data: [],
  },
  top_songs: {
    status: IDLE,
    data: [],
  },
  banners: [
    {
      title: "default",
      image: "/images/banners/b1.png",
    },
  ],
};

const songsSlice = createSlice({
  name: "songs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchHomeData.pending, (state, _) => {
        state.status = LOADING;
      })
      .addCase(
        fetchHomeData.fulfilled,
        (state, action: { payload: ListSongsResp | false }) => {
          if (action.payload) {
            state.top_songs.data = action.payload.top_songs;
            state.new_songs.data = action.payload.new_songs;
            state.total = action.payload.total;
            state.banners = action.payload.banners;
            state.status = IDLE;
          }
        }
      )
      .addCase(fetchMoreNewSong.pending, (state, _) => {
        state.new_songs.status = LOADING;
      })
      .addCase(
        fetchMoreNewSong.fulfilled,
        (state, action: { payload: Song[] }) => {
          if (action.payload) {
            state.new_songs.data = [...state.new_songs.data, ...action.payload];
            state.new_songs.status = IDLE;
          }
        }
      )
      .addCase(fetchMoreTopSong.pending, (state, _) => {
        state.top_songs.status = LOADING;
      })
      .addCase(
        fetchMoreTopSong.fulfilled,
        (state, action: { payload: Song[] }) => {
          if (action.payload) {
            state.top_songs.data = [...state.top_songs.data, ...action.payload];
            state.top_songs.status = IDLE;
          }
        }
      );
  },
});

export const fetchHomeData = createAsyncThunk("home-data", async () => {
  try {
    const resp = await AxiosApi.instance.get<ListSongsResp>(ApiUrls.home);
    return resp.data;
  } catch (error) {
    console.log("[error when fetch home data]:", error);
    return false;
  }
});

export const fetchMoreNewSong = createAsyncThunk(
  "new-songs",
  async (page: number) => {
    const params: SongParamsSearch = {
      page: page,
      page_size: PAGE_SIZE,
      ordering: "-created_at",
    };
    return fetchMoreSong(params);
  }
);

export const fetchMoreTopSong = createAsyncThunk(
  "top-songs",
  async (page: number) => {
    const params: SongParamsSearch = {
      page: page,
      page_size: PAGE_SIZE,
      ordering: "-view_count",
    };
    return fetchMoreSong(params);
  }
);

const fetchMoreSong = async (params: SongParamsSearch) => {
  try {
    const resp = await AxiosApi.instance.get(ApiUrls.songs, {
      params: params,
    });
    return resp.data.results;
  } catch (error) {
    console.log("[error when fetch song data]:", error);
    return false;
  }
};

export default songsSlice;
