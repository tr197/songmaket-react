import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Song } from "@/types/song.types";

export interface PlayerState {
  display: boolean;
  song: Song | null;
}

const initialState: PlayerState = {
  display: false,
  song: null,
};

const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    setSongPlayer(state, action: PayloadAction<Song>) {
      state.song = action.payload;
      state.display = true;
    },
  },
});

export default playerSlice;
export const { setSongPlayer } = playerSlice.actions;
