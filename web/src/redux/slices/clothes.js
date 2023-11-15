import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../utils/axios";

const initialState = {
  errorClothes: null,
  loadingClothes: false,
  dataClothes: [],
  clothesState: {
    clothes_picture: {},
    clothes_name: "",
    clothes_price: 0,
    types_id: 0,
    variants_id: 0,
    clothes_description: "",
  }
};

export const slice = createSlice({
  name: "clothes",
  initialState,
  reducers: {
    setState(state, action) {
       state.clothesState.clothes_picture = action.payload.clothes_picture;
       state.clothesState.clothes_name = action.payload.clothes_name;
       state.clothesState.clothes_price = action.payload.clothes_price;
       state.clothesState.types_id = action.payload.types_id;
       state.clothesState.variants_id = action.payload.variants_id;
       state.clothesState.clothes_description = action.payload.clothes_description;
    }
  },
  extraReducers: (builder) => {
    builder
    .addCase(getAllClothes.pending, (state) => {
        state.loadingClothes = true;
    })
    .addCase(getAllClothes.fulfilled, (state, action) => {
        state.loadingClothes = false;
        state.dataClothes = action.payload;
    })
    .addCase(getAllClothes.rejected, (state, action) => {
        state.loadingClothes = false;
        state.errorClothes = action.payload;
    });
  },
});

export default slice.reducer

export const getAllClothes = createAsyncThunk(
  "getAllClothes",
  async (data, { rejectWithValues }) => {
    try { 
       const response = await axios.get('/clothes')
       return response.data
    } catch (error) {
        throw rejectWithValues(error)
    }
  }
);

export const createClothes = createAsyncThunk(
  "createClothes",
  async (data, { rejectWithValues }) => {
    try { 
       let formData = new FormData();
       Object.entries(data).forEach(entry => {
         const [key, value] = entry;
         formData.append(key, value)
       })
       const headers = {
        "Content-Type": "multipart/form-data"
      }
       const response = await axios.post('/clothes', formData, {
        headers
       })
       return response.data
    } catch (error) {
        alert(error?.message)
        throw rejectWithValues(error)
    }
  }
);
