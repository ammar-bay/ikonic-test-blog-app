import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

const URL = "http://localhost:5001";

interface AuthState {
  username: string | null;
  accessToken: string | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null | undefined;
}

interface Credentials {
  username: string;
  password: string;
}

interface Register extends Credentials {
  email: string;
}

export const login = createAsyncThunk<AuthState, Credentials>(
  "auth/login",
  async (credentials) => {
    const response = await axios.post<AuthState>(
      `${URL}/auth/login`,
      credentials
    );
    return response.data;
  }
);

export const register = createAsyncThunk<AuthState, Register>(
  "auth/register",
  async (credentials) => {
    const response = await axios.post<AuthState>(
      `${URL}/register`,
      credentials
    );
    return response.data;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: { username: null, accessToken: null } as AuthState,
  reducers: {
    setCredentials: (state, action: PayloadAction<AuthState>) => {
      const { username, accessToken } = action.payload;
      state.username = username;
      state.accessToken = accessToken;
    },
    logOut: (state) => {
      state.username = null;
      state.accessToken = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(login.pending, (state) => {
        state.status = "loading";
      })
      .addCase(login.fulfilled, (state, action) => {
        state = action.payload;
        state.status = "succeeded";
      })
      .addCase(register.pending, (state) => {
        state.status = "loading";
      })
      .addCase(register.fulfilled, (state, action) => {
        state = action.payload;
        state.status = "succeeded";
      });
  },
});

export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state: { auth: AuthState }) =>
  state.auth.username;
export const selectCurrentToken = (state: { auth: AuthState }) =>
  state.auth.accessToken;
