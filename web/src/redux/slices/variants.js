import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../utils/axios";

const initialState = {
  errorVariants: null,
  loadingVariants: false,
  dataVariants: [],
};

export const slice = createSlice({
    name: "variants",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
      .addCase(getAllVariants.pending, (state) => {
          state.loadingVariants = true;
      })
      .addCase(getAllVariants.fulfilled, (state, action) => {
          state.loadingVariants = false;
          state.dataVariants = action.payload;
      })
      .addCase(getAllVariants.rejected, (state, action) => {
          state.loadingVariants = false;
          state.error = action.payload;
      });
    },
  });
  
  export default slice.reducer
  
  export const getAllVariants = createAsyncThunk(
    "getAllVariants",
    async (data, { rejectWithValues }) => {
      try { 
         const response = await axios.get('/variants')
         return response.data
      } catch (error) {
          throw rejectWithValues(error)
      }
    }
  );