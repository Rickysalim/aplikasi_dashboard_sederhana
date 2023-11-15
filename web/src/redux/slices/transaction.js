import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../utils/axios";

const initialState = {
  errorTransactionsTotal: null,
  loadingTransactionsTotal: false,
  dataTransactionsTotal: [],
  dataTransactionsUserFullName: [],
  dataTransactionsPrice: [],
  loadingTransactionStatus: false,
  dataTransactionsStatus: [],
  errorTransactiondStatus: null,
  errorTransactions: null,
  loadingTransactions: false,
  dataTransactions: [],
  stateTransactions: {
    transactions_id: 0,
    users_id: 0,
    clothes_id: 0,
    transactions_status: 0,
    clothes_quantity: 0,
  },
  loadingCreateTransaction: false,
  
  errorCreateTransaction: null,
};

export const slice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    setTransactionsChartData(state, action) {
      let user = [];
      let price = [];
      for (const iterator of action.payload) {
        user.push(iterator?.Users?.users_fullname);
        price.push(iterator?.clothes_total_price);
      }
      state.dataTransactionsUserFullName = user;
      state.dataTransactionsPrice = price.map((item) => {
        return Number(item);
      });
    },

    setStateTransaction(state, action) {
      state.stateTransactions.transactions_id = action.payload.transactions_id;
      state.stateTransactions.clothes_id = action.payload.clothes_id;
      state.stateTransactions.users_id = action.payload.users_id;
      state.stateTransactions.transactions_status = action.payload.transactions_status;
      state.stateTransactions.clothes_quantity = action.payload.clothes_quantity;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllTransactionsTotal.pending, (state) => {
        state.loadingTransactionsTotal = true;
      })
      .addCase(getAllTransactionsTotal.fulfilled, (state, action) => {
        state.loadingTransactionsTotal = false;
        state.dataTransactionsTotal = action.payload;
      })
      .addCase(getAllTransactionsTotal.rejected, (state, action) => {
        state.loadingTransactionsTotal = false;
        state.errorTransactionsTotal = action.payload;
      })
      .addCase(getAllTransactionsStatus.pending, (state) => {
        state.loadingTransactionStatus = true;
      })
      .addCase(getAllTransactionsStatus.fulfilled, (state, action) => {
        state.loadingTransactionStatus = false;
        let data = [];
        for (const iterator in action.payload[0]) {
          data.push(Number(action.payload[0][iterator]));
        }
        state.dataTransactionsStatus = data;
      })
      .addCase(getAllTransactionsStatus.rejected, (state, action) => {
        state.loadingTransactionStatus = false;
        state.errorTransactiondStatus = action.payload;
      })
      .addCase(getAllTransactions.pending, (state) => {
        state.loadingTransactions = true;
      })
      .addCase(getAllTransactions.fulfilled, (state, action) => {
        state.loadingTransactions = false;
        state.dataTransactions = action.payload
      })
      .addCase(getAllTransactions.rejected, (state, action) => {
        state.loadingTransactions = false;
        state.errorTransactions = action.payload
      })
      .addCase(createTransactions.pending, (state) => {
        state.loadingCreateTransaction = true;
      })
      .addCase(createTransactions.fulfilled, (state) => {
        state.loadingCreateTransaction = false;
      })
      .addCase(createTransactions.rejected, (state, action) => {
        state.loadingCreateTransaction = false;
        console.info(action.payload)
        state.errorCreateTransaction = action.payload
      })
  },
});

export default slice.reducer;

export const { setTransactionsChartData, setStateTransaction } = slice.actions;

export const getAllTransactionsTotal = createAsyncThunk(
  "getAllTransactionsTotal",
  async (data, { rejectWithValues }) => {
    try {
      const response = await axios.get("/transactions/total");
      return response.data;
    } catch (error) {
      throw rejectWithValues(error);
    }
  }
);

export const getAllTransactionsStatus = createAsyncThunk(
  " getAllTransactionsStatus",
  async (data, { rejectWithValues }) => {
    try {
      const response = await axios.get("/transactions/status");
      return response.data;
    } catch (error) {
      console.info(error)
      throw rejectWithValues(error);
    }
  }
);

export const getAllTransactions = createAsyncThunk(
  " getAllTransactions",
  async (data, { rejectWithValues }) => {
    try {
      const response = await axios.get("/transactions");
      return response.data;
    } catch (error) {
      throw rejectWithValues(error);
    }
  }
);

export const createTransactions = createAsyncThunk( 
  "createTransactions", 
  async (data, { rejectWithValues }) => {
    try {
      const response = await axios.post("/transactions",data);
      return response.data;
    } catch (error) {
      alert(error?.message)
      throw rejectWithValues(error);
    }
  }
)

