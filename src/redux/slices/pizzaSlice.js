import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  items: [],
  status: '',
};

export const getFetchPizza = createAsyncThunk("pizza/fetchPizza", async (params) => {
    const { category, search, sort,activeCategories} = params;
    const { data } = await axios.get(`https://6525cd0a67cfb1e59ce7af29.mockapi.io/Items?${category ? `category=${activeCategories}` : ""}&sortBy=${sort.sort}${search}`);
    return data;
  }
);

export const pizzaSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {
    setItem: (state, action) => {
      state.items = action.payload;
    },
  },
    extraReducers: (builder) => {
    builder
        .addCase(getFetchPizza.pending, (state, action) => {
            state.items = []
            state.status = "loading"
        })
        .addCase(getFetchPizza.fulfilled, (state, action) => {
            state.items = action.payload
            state.status = "success"
        })
        .addCase(getFetchPizza.rejected, (state, action) => {
            state.items = []
            state.status = "error"
        })
    }
});

// Action creators are generated for each case reducer function
export const { setItem } = pizzaSlice.actions;

export default pizzaSlice.reducer;
