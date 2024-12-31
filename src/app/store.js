import { configureStore } from "@reduxjs/toolkit";
import { productsSlice } from "../features/allProducts/productsSlice";
import { cartSlice } from "../features/Cart/CartSlice";
import favoritesSlice from "../features/Favorites/favoritesSlice";
import { userSlice } from "../features/Login/UserSlice";


const radianceStore =  configureStore({
    reducer: {
        products: productsSlice.reducer,
        cart: cartSlice.reducer,
        favorites: favoritesSlice.reducer,
        user: userSlice.reducer,
        
    }
})

export default radianceStore;