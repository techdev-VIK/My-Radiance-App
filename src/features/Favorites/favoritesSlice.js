import { createSlice } from "@reduxjs/toolkit";

export const favoritesSlice = createSlice({
    name: "favorites",
    initialState: {
        favProducts: [],
    },
    reducers: {
        addToFavs: (state, action) => {

    //         console.log('Add to Favs Payload:', action.payload);
    // console.log('State before adding:', state.favProducts);

            const productIndex = state.favProducts.findIndex((item) => item.productId === action.payload.productId);

            if(productIndex === -1){
                state.favProducts.push(action.payload)
            }
            
            // console.log('State after adding:', state.favProducts);
        },
        removeFromFavs: (state,action) => {
            state.favProducts = state.favProducts.filter((item) => item.productId !== action.payload.productId)
        }
    }
})

export const favActions = favoritesSlice.actions;

export default favoritesSlice;