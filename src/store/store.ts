import { configureStore } from "@reduxjs/toolkit";
import playerSlice from "./player/slice";

const makeStore = configureStore({
  reducer: {
    player: playerSlice.reducer,
  },
});

export default makeStore;
export type AppDispatch = typeof makeStore.dispatch;
