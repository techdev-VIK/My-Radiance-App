import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


export const cartSlice = createSlice({
    name: "cart",
    initialState: {
        cartProducts: [],
        status: "idle",
        error: null,
    },
    reducers: {
        addToCart: (state, action) => {
            const productIndex = state.cartProducts.findIndex((item) => item.productId === action.payload.productId);

            if(productIndex >= 0){
                state.cartProducts[productIndex].quantity += 1;
            }else{
                state.cartProducts.push({...action.payload, quantity: 1});
            }
        },
        removeFromCart: (state,action) => {
            state.cartProducts =  state.cartProducts.filter((item) => item.productId !== action.payload.productId);
        },
        updateQuantity: (state, action) => {
            const {productId, quantity} = action.payload;

            const product = state.cartProducts.find((item) => item.productId === productId);

            if(product){
                product.quantity = quantity;
            }
        },
        clearCart: (state) => {
            state.cartProducts = [];
        }
    },
    
});

export const cartActions = cartSlice.actions;

export default cartSlice;