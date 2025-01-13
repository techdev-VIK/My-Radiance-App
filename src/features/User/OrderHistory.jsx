import { useEffect, useState } from 'react';
import axios from 'axios';  
import { Link, useParams } from 'react-router-dom'; // Import Link for navigation

function OrderHistory() {
  const username = localStorage.getItem("username");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const backendUrl = "https://radiance-backend.vercel.app";

  useEffect(() => {
    // Fetch orders when the component mounts
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${backendUrl}/allOrders/${username}`);
        setOrders(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch orders');
        setLoading(false);
      }
    };

    fetchOrders();
  }, [username]);

  if (loading) return (
    <div className='d-flex justify-content-center align-items-center' style={{ height: "100vh" }}>
      <div className="spinner-border text-info" style={{width: "5rem", height: "5rem"}} role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );

  if (error) return <div>{error}</div>;

  return (
    <main className="container main-content my-3">
      <h2>Orders History</h2>
      <hr />
      {orders.length === 0 ? (
        <div className='alert alert-danger'>No orders found.</div>
      ) : (
        <div className="row">
          {orders.map((order) => (
            <div key={order._id} className="col-md-6 mb-4">
              <div className="card shadow p-0">
                <div className="row g-0">
                  <div className="col-md-4">
                    <img
                      src={order.productImageUrl || "https://placehold.co/200?text=Product"}
                      alt={order.productName}
                      className="img-fluid rounded-start" 
                      style={{objectFit: "cover", height: "100%"}}
                    />
                  </div>
                  <div className="col-md-8">
                    <div className="card-body">
                      <h5 className="card-title">{order.productName}</h5>
                      <p className="card-text">
                        <strong>Order ID: </strong>{order._id}
                      </p>
                      <p className="card-text">
                        <strong>Date: </strong>{new Date(order.createdAt).toLocaleDateString()}
                      </p>
                      <p className="card-text">
                        <strong>Total Amount: </strong>₹{order.totalAmount}
                      </p>
                      
                      <Link to={`/order-details/${order._id}`} className="btn btn-info text-light">View Details</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}

export default OrderHistory;