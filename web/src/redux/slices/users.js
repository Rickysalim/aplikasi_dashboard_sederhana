import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../utils/axios";

const initialState = {
  errorUsers: null,
  loadingUsers: false,
  dataUsers: [],
};

export const slice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(getAllUsers.pending, (state) => {
        state.loadingUsers = true;
    })
    .addCase(getAllUsers.fulfilled, (state, action) => {
        state.loadingUsers = false;
        state.dataUsers = action.payload;
    })
    .addCase(getAllUsers.rejected, (state, action) => {
        state.loadingUsers = false;
        state.errorUsers = action.payload;
    });
  },
});

export default slice.reducer;

export const getAllUsers = createAsyncThunk(
  "getAllUsers",
  async (data, { rejectWithValues }) => {
    try {
      const response = await axios.get("/all/users");
      return response.data;
    } catch (error) {
      throw rejectWithValues(error);
    }
  }
);