import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Song } from "@/types/song.types";
import AxiosApi from "@/services/api/AxiosApi";
import ApiUrls from "@/services/api/ApiUrls";

const IDLE = "idle";
const LOADING = "loading";

interface ListSongsData {
  new_songs: Song[];
  top_songs: Song[];
}

export interface SongsState extends ListSongsData {
  status: string;
}

const initialState: SongsState = {
  status: IDLE,
  new_songs: [],
  top_songs: [],
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
        (state, action: { payload: ListSongsData | false }) => {
          if (action.payload) {
            state.top_songs = action.payload.top_songs;
            state.new_songs = action.payload.new_songs;
            state.status = IDLE;
          }
        }
      );
  },
});

export const fetchHomeData = createAsyncThunk("home-data", async () => {
  try {
    const resp = await AxiosApi.instance.get<ListSongsData>(ApiUrls.home);
    return resp.data;
  } catch (error) {
    console.log("[error when fetch home data]:", error);
    return false;
  }
});

export default songsSlice;
