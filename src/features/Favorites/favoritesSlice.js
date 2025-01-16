import { createSlice } from "@reduxjs/toolkit";

export const favoritesSlice = createSlice({
    name: "favorites",
    initialState: {
        favProducts: [],
    },
    reducers: {
        addToFavs: (state, action) => {

            const productIndex = state.favProducts.findIndex((item) => item._id === action.payload._id);

            if(productIndex === -1){
                state.favProducts.push(action.payload)
            }

        },
        removeFromFavs: (state,action) => {
            state.favProducts = state.favProducts.filter((item) => item._id !== action.payload._id)
        }
    }
})

export const favActions = favoritesSlice.actions;

export default favoritesSlice;