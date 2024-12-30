import { configureStore } from "@reduxjs/toolkit";
import { productsSlice } from "../features/allProducts/productsSlice";
import { cartSlice } from "../features/Cart/CartSlice";
import favoritesSlice from "../features/Favorites/favoritesSlice";


const radianceStore =  configureStore({
    reducer: {
        products: productsSlice.reducer,
        cart: cartSlice.reducer,
        favorites: favoritesSlice.reducer,
        
    }
})

export default radianceStore;