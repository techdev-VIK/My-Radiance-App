import { createSlice } from "@reduxjs/toolkit";

export const wishlistSlice = createSlice({
    name: "wishlist",
    initialState: {
        wishlistProducts: [],
    },
    reducers: {
        addToWishlist: (state, action) => {
            const productIndex = state.wishlistProducts.findIndex((item) => item.productId === action.payload.productId);

            if(productIndex === -1){
                state.wishlistProducts.push(action.payload)
            }
        },
        removeFromWishlist: (state, action) => {
            state.wishlistProducts = state.wishlistProducts.filter((item) => item.productId !== action.payload.productId)
        }
    }
})

export  const wishlistActions = wishlistSlice.actions;

export default wishlistSlice;