import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { Provider } from 'react-redux';


import Details from './features/allProducts/Details.jsx';

import Favorites from './features/Favorites/Favorites.jsx';

import Cart from './features/Cart/Cart.jsx';

import Login from './pages/Login.jsx';

import radianceStore from './app/store.js';
import OrderPlaced from './features/Cart/OrderPlaced.jsx';
import AllProductsPage from './pages/AllProductsPage.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
  {
    path: "/pages/allProducts",
    element: <AllProductsPage />
  },
  {
    path: "/pages/favorites",
    element: <Favorites />
  },
  {
    path: "/pages/cart",
    element: <Cart />
  },
  {
    path: "/pages/login",
    element: <Login />
  },
  {
    path: "/allProducts/:productId",
    element: <Details />
  },
  {
    path: "/pages/orderPlaced",
    element: <PrivateRoute><OrderPlaced /></PrivateRoute>
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={radianceStore}>
    <RouterProvider router = {router} />
    </Provider>
  </StrictMode>,
)
