import { useEffect, useState } from 'react';
import axios from 'axios';  
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

function OrderHistoryDetails() {
  const username = localStorage.getItem("username");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const backendUrl = "https://radiance-backend.vercel.app";
  const { detailId } = useParams();  // Extract detailId from URL params

  useEffect(() => {
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


  const detailedOrder = orders.find((order) => order._id === detailId); // Find the order by detailId

  if (loading) return (
    <div className='d-flex justify-content-center align-items-center' style={{ height: "100vh" }}>
      <div className="spinner-border text-info" style={{width: "5rem", height: "5rem"}} role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );

  if (error) return <div>{error}</div>;

  if (!detailedOrder) return <div className='alert alert-danger'>Order not found.</div>; // Handle case where order is not found

  const totalAmount = detailedOrder.items.reduce((total, item) => {
    return total + item.quantity * item.itemId.productMRP;
  }, 0);

  return (
    <main className="container main-content my-4">
      <h2>Order Details</h2>

      <div className='col-md-8'>
      <hr />
      </div>
      
      <div className="row">
        <div key={detailedOrder._id} className="col-md-8 mb-4">
        
          <div className="card shadow">
            <div className="row g-0">
              <div className="col-md-12">
                
                <div className="card-header p-3">
                <h5 className="card-title mb-1">Order #: {detailedOrder._id}</h5>
                <hr />
                  <div className="d-flex justify-content-between mt-2">
                    <div className="col-md-8 d-flex justify-content-start">
                      <p><strong>Shipping Address: </strong>{detailedOrder.shippingAddress}</p>
                    </div>
                    <div className="col-md-4 d-flex justify-content-end">
                      <p><strong>Date: </strong>{new Date(detailedOrder.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>
                <div className="card-body">
                  {detailedOrder.items.map((item) => (
                    <div key={item._id} className="row mb-3">
                      <div className="col-md-4">
                        <img
                          src={item.itemId.productImageUrl || "https://placehold.co/200?text=Product"}
                          alt={item.itemId.productName}
                          className="img-fluid rounded-start"
                          style={{objectFit: "cover", height: "100%"}}
                        />
                      </div>
                      <div className="col-md-8">
                        <div className='fs-4 mb-3'>{item.itemId.productName}</div>

                        <div className='mb-2'><strong>Category: </strong>{item.itemId.productCategory}</div>

                        <div className='mb-2'><strong>Quantity: </strong>{item.quantity}</div>

                        <div className='mb-2'><strong>Price: </strong>₹{item.itemId.productMRP}<span className='ms-2 text-secondary fw-light'>(per item)</span></div>

                        <Link to={`/allProducts/${item.itemId._id}`}><button className='btn btn-info text-light mt-3'>Buy Again</button></Link>
                      </div>
                    </div>
                  ))}
                  <hr />
                  <h6 className='text-center mt-2 fw-semibold bg-info p-2 text-light'>Total Amount Paid: ₹{totalAmount}</h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default OrderHistoryDetails;
