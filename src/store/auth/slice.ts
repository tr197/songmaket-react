import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import AxiosApi from "@/services/api/AxiosApi";
import ApiUrls from "@/services/api/ApiUrls";

export const ACCESS_TOKEN = "access-token-key";

export interface Profile {
  username: string;
  email?: string;
  first_name?: string;
  last_name?: string;
}

export interface SinginResponse {
  access: string;
  refresh: string;
  user: Profile;
}

export interface AccountState {
  authenticated: boolean;
  access: string | null;
  refresh: string | null;
  profile: Profile | null;
}

const initialState: AccountState = {
  authenticated: false,
  access: null,
  refresh: null,
  profile: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthentication(state, action: PayloadAction<SinginResponse>) {
      state.access = action.payload.access;
      state.refresh = action.payload.refresh;
      state.profile = action.payload.user;
      state.authenticated = true;

      localStorage.setItem(ACCESS_TOKEN, state.access);
      AxiosApi.setAuthorizationToken(state.access);
    },

    signOut(state) {
      state.access = "";
      state.refresh = "";
      state.profile = null;
      state.authenticated = false;

      localStorage.removeItem(ACCESS_TOKEN);
      AxiosApi.removeAuthorizationToken();
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchAccountInfo.fulfilled,
      (state, action: { payload: Profile | null }) => {
        if (action.payload) {
          state.profile = action.payload;
        }
      }
    );
  },
});

export const fetchAccountInfo = createAsyncThunk("account-info", async () => {
  const old_token = localStorage.getItem(ACCESS_TOKEN);
  if (old_token) {
    AxiosApi.setAuthorizationToken(old_token);
  } else {
    return null;
  }
  try {
    const resp = await AxiosApi.instance.get<Profile>(ApiUrls.auth.AccountInfo);
    return resp.data;
  } catch (error) {
    console.log("[error when fetch profile data]:", error);
    return null;
  }
});

export default authSlice;

export const { setAuthentication, signOut } = authSlice.actions;
