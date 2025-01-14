import { configureStore } from "@reduxjs/toolkit";
import storage from 'redux-persist/lib/storage';

import { persistReducer, persistStore } from "redux-persist";

import { combineReducers } from "@reduxjs/toolkit";

import { productsSlice } from "../features/allProducts/productsSlice";
import { cartSlice } from "../features/Cart/CartSlice";
import favoritesSlice from "../features/Favorites/favoritesSlice";
import userSlice from "../features/User/UserSlice";
import wishlistSlice from "../features/Saved for Later/wishlistSlice";

// Step 1: Create a persist configuration
const persistConfig = {
    key: "root",
    storage,
};


// Step 2: Combine your reducers
const rootReducer = combineReducers({
    products: productsSlice.reducer,
    cart: cartSlice.reducer,
    favorites: favoritesSlice.reducer,
    user: userSlice.reducer,
    wishlist: wishlistSlice.reducer,
})

// Step 3: Wrap the rootReducer with persistReducer

const persistedReducer = persistReducer(persistConfig, rootReducer)

// Step 4: Create the store with the persisted reducer

const radianceStore = configureStore({
    reducer: persistedReducer,
})

// Step 5: Create the persistor for the store

export const persistor = persistStore(radianceStore);

export default radianceStore;