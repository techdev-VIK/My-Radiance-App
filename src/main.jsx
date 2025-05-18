import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';

import App from './App.jsx'

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { Provider } from 'react-redux';

import { PersistGate } from 'redux-persist/integration/react';

import { persistor } from './app/store.js';

import Favorites from './features/Favorites/Favorites.jsx';

import Cart from './features/Cart/Cart.jsx';

import Login from './features/User/Login.jsx';

import radianceStore from './app/store.js';
import OrderPlaced from './features/Cart/OrderPlaced.jsx';
import AllProductsPage from './pages/AllProductsPage.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';

import UserInfo from './pages/UserInfo.jsx';
import ProductDetails from './pages/ProductDetails.jsx';
import SignUpForm from './pages/SignUpForm.jsx';

import ShippingAddress from './pages/ShippingAddress.jsx';
import Wishlist from './features/Saved for Later/Wishlist.jsx';
import OrderHistoryPage from './pages/OrderHistoryPage.jsx';
import OrderHistoryDetailsPage from './pages/OrderHistoryDetailsPage.jsx';
import PlaceOrderAndPay from './features/Cart/PlaceOrderAndPay.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


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
    element: <ProductDetails />
  },
  {
    path: "/pages/userForm",
    element: <SignUpForm />
  },
  {
    path: "/user/edit/:id",
    element: <PrivateRoute><SignUpForm /></PrivateRoute>
  },
  {
    path: "/pages/orderPlaced",
    element: <PrivateRoute><OrderPlaced /></PrivateRoute>
  },
  {
    path: "/pages/userinfo/:username",
    element: <PrivateRoute><UserInfo /></PrivateRoute>
  },
  {
    path: "/pages/cart/shipping",
    element: <PrivateRoute><ShippingAddress /></PrivateRoute>
  },
  {
    path: "/pages/user/order/history",
    element: <PrivateRoute><OrderHistoryPage /></PrivateRoute>
  },
  {
    path: "/order/history/details/:detailId",
    element: <PrivateRoute><OrderHistoryDetailsPage /></PrivateRoute>
  },
  {
    path: "/pages/payAndOrder",
    element: <PrivateRoute><PlaceOrderAndPay /></PrivateRoute>
  },
  {
    path: "/pages/wishlist",
    element: <Wishlist />
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={radianceStore}>
      <PersistGate loading={null} persistor={persistor}>
          <RouterProvider router = {router} />
      </PersistGate>
    </Provider>
    <ToastContainer
      position="bottom-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick={false}
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="colored"
      />
  </StrictMode>,
)
