import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../utils/axios";

const initialState = {
  errorTypes: null,
  loadingTypes: false,
  dataTypes: [],
};

export const slice = createSlice({
    name: "types",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
      .addCase(getAllTypes.pending, (state) => {
          state.loadingTypes = true;
      })
      .addCase(getAllTypes.fulfilled, (state, action) => {
          state.loadingTypes = false;
          state.dataTypes = action.payload;
      })
      .addCase(getAllTypes.rejected, (state, action) => {
          state.loadingTypes = false;
          state.errorTypes = action.payload;
      });
    },
  });
  
  export default slice.reducer
  
  export const getAllTypes = createAsyncThunk(
    "getAllTypes",
    async (data, { rejectWithValues }) => {
      try { 
         const response = await axios.get('/types')
         return response.data
      } catch (error) {
          throw rejectWithValues(error)
      }
    }
  );