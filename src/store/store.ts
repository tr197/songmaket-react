import { configureStore } from "@reduxjs/toolkit";
import playerSlice from "./player/slice";
import songsSlice from "./songs/slice";
import authSlice from "./auth/slice";

const makeStore = configureStore({
  reducer: {
    player: playerSlice.reducer,
    songs: songsSlice.reducer,
    auth: authSlice.reducer,
  },
});

export default makeStore;
export type AppDispatch = typeof makeStore.dispatch;
