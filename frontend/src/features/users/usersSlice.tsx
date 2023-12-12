import { createSlice } from "@reduxjs/toolkit";

interface UserState {
  id: string;
  email: string;
  username: string;
}

const initialState: UserState = {
  id: "",
  email: "",
  username: "",
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
});

export const selectUser = (state: { user: UserState }) => state.user;

export default usersSlice.reducer;
