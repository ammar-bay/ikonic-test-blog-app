import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

const USERS_URL = "https://jsonplaceholder.typicode.com/users";

interface User {
  id: string;
  name: string;
}

interface UserState extends User {
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null | undefined;
}

const initialState: UserState[] = [];

export const fetchUsers = createAsyncThunk<UserState[]>(
  "users/fetchUsers",
  async () => {
    const response = await axios.get<UserState[]>(USERS_URL);
    return response.data;
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(
      fetchUsers.fulfilled,
      (state, action: PayloadAction<UserState[]>) => {
        return action.payload;
      }
    );
  },
});

export const selectAllUsers = (state: { users: UserState[] }) => state.users;

export default usersSlice.reducer;
