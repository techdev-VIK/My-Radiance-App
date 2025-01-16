import { useEffect, useState } from 'react';
import axios from 'axios';  
import { Link } from 'react-router-dom';

function OrderHistory() {
  const username = localStorage.getItem("username");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortValue, setSortValue] = useState("");

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


  const sortByDateHandler = (e) => {
    
    const {value} = e.target;

    setSortValue(value);

    let sortedOrders = [...orders];


    if(value === "Newest"){
        sortedOrders.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt));
    }else if(value === "Oldest"){
        sortedOrders.sort((a,b) => new Date(a.createdAt) - new Date(b.createdAt));
    }

    setOrders(sortedOrders);
  }

  if (loading) return (
    <div className='d-flex justify-content-center align-items-center' style={{ height: "100vh" }}>
      <div className="spinner-border text-info" style={{width: "5rem", height: "5rem"}} role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );

  if (error) return <div>{error}</div>;

 

  return (
    <main className="container main-content my-4">

      <div className='d-flex justify-content-between align-items-center'>

      <h2>Orders History</h2>

      <select className='form-select' onChange={sortByDateHandler} style={{width: "auto"}} value={sortValue}>
        <option value="" disabled>-- Sort By --</option>
        <option value="Newest">Newest First</option>
        <option value="Oldest">Oldest First</option>
      </select>
      </div>

      <hr />

      {orders.length === 0 ? (
        <div className='alert alert-danger'>No orders found.</div>
      ) : (
        <div className="row">
          {orders.map((order) => {
            
            //Find total items
            const totalItems = order.items.reduce((total, item) => {
                return total + item.quantity;
              }, 0);

          return(
            <div key={order._id} className="col-md-6 mb-4">
              <div className="card shadow p-0">
                <div className="row g-0">
                  <div className="col-md-4">
                    <img
                      src={order.items[0]?.itemId.productImageUrl || "https://placehold.co/200?text=Product"}
                      alt={order.items[0]?.name}
                      className="img-fluid rounded-start" 
                      style={{objectFit: "cover", height: "100%"}}
                    />
                  </div>
                  <div className="col-md-8">
                    <div className="card-body">
                      <div className="card-header p-0 mb-3">
                        <strong>Order #: </strong>{order._id}
                      </div>
                      <p className="card-text">
                        <strong>Date: </strong>{new Date(order.createdAt).toLocaleDateString()}
                      </p>
                      <p className="card-text">
                        <strong>Items Ordered: </strong>{(totalItems)}
                      </p>
                      <p className="card-text fixed-height">
                        <strong>Shipping Address: </strong>{order.shippingAddress}
                      </p>
                      
                      <Link to={`/order/history/details/${order._id}`} className="btn btn-sm btn-info text-light">View Details</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            )})}
        </div>
      )}
    </main>
  );
}

export default OrderHistory;
