import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const backendUrl = "https://radiance-backend.vercel.app"

export const fetchProducts = createAsyncThunk("products/fetchProducts", async() => {
    const response = await axios.get(`${backendUrl}/allProducts`);
    // console.log(response.data);
    return response.data;
})


export const productsSlice = createSlice({
    name: "products",
    initialState: {
        products: [],
        status: "idle",
        error: null,
    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(fetchProducts.pending, (state) => {
            state.status = "loading"
        }),
        builder.addCase(fetchProducts.fulfilled, (state, action) => {
            state.status = "success",
            state.products = action.payload
        }),
        builder.addCase(fetchProducts.rejected, (state,action) => {
            state.status = "error",
            state.error = action.error.message
        })
    }
});


export default productsSlice.reducer;