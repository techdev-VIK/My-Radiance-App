import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { cartActions } from './CartSlice';

import axios from "axios";


import { useLocation } from 'react-router-dom';

function PlaceOrderAndPay() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const backendUrl = "https://radiance-backend.vercel.app";

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart.cartProducts);
  const { userData } = useSelector((state) => state.user);

  const location = useLocation();

  const shippingAddress = location.state?.shippingAddress;

  const handlePlaceOrderAndPay = async() => {
    setLoading(true); 
    setError(null); 
    
    const orderData = {
        userId: userData._id,
        items: cartItems.map((item) => ({
          itemId: item._id,
          name: item.productName,
          quantity: item.quantity,
          price: item.productMRP
        })),
        shippingAddress
      }

    //   console.log(orderData);

      try {
          const response = await axios.post(`${backendUrl}/order/create`, orderData);

          if(response.data){

            dispatch(cartActions.clearCart());
            navigate("/pages/orderPlaced");
          }
      } catch (error) {
        console.error('Error placing order:', error);

      } finally{
        setLoading(false);
      }
  };

  // Calculate the total amount for the cart items
  const totalAmount = cartItems.reduce((total, item) => {
    return total + item.quantity * item.productMRP;
  }, 0);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
        <div className="spinner-border text-info" style={{ width: "5rem", height: "5rem" }} role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) return <div>{error}</div>;

  return (
    <main className="container my-4">
      <h2 className="text-center mb-4">Review Your Order</h2>

      <div className="card shadow">
        <div className="card-header bg-info text-light">
          <h5>Order Summary</h5>
        </div>
        <div className="card-body">
          <div className="card col-md-6 mb-3">
          <h5 className='mb-3'><strong>{userData.firstName} {userData.lastName}</strong></h5>
            
            <p><strong>Contact:</strong> {userData.phoneNumber}</p>

            <p><strong>Shipping Address:</strong> {shippingAddress}</p>
          </div>

          <div className="table-responsive">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Item(s)</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item._id}>
                    <td>
                      <div className="d-flex align-items-center">
                        <img
                          src={item.productImageUrl || "https://placehold.co/50?text=Image"}
                          alt={item.productName}
                          className="img-fluid rounded-start me-2"
                          style={{ width: "50px", height: "50px" }}
                        />
                        {item.productName}
                      </div>
                    </td>
                    <td>₹{item.productMRP}</td>
                    <td>{item.quantity}</td>
                    <td>₹{item.quantity * item.productMRP}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan="3" className="text-end fw-bold">Total Amount:</td>
                  <td className="fw-bold">₹{totalAmount}</td>
                </tr>
              </tfoot>
            </table>
          </div>

          <hr />

          <div className="d-flex justify-content-center mt-4">
            <button className="btn btn-success btn-lg" onClick={handlePlaceOrderAndPay} disabled={loading}>
            {loading ? "Processing..." : "Place Order"}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

export default PlaceOrderAndPay;
