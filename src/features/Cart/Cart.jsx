import Header from "../../components/Header";

import Footer from "../../components/Footer";

import { useDispatch, useSelector } from "react-redux";

import { cartActions } from "./CartSlice";
import CartSummary from "./CartSummary";


function Cart(){

    const cartItems = useSelector((state) => state.cart.cartProducts);

    const dispatch = useDispatch();


    const handleIncrement = (productId) => {

      const product = cartItems.find((item) => item.productId === productId);
      
      if(product){
        dispatch(cartActions.updateQuantity({productId, quantity: product.quantity + 1}))
      }
    };

    const handleDecrement = (productId) => {

      const product = cartItems.find((item) => item.productId === productId);
      
      if(product){
        if(product.quantity > 1){
          dispatch(cartActions.updateQuantity({productId, quantity: product.quantity - 1}))
        }else{
          dispatch(cartActions.removeFromCart({productId}))
        }
        
      }
    };


const handleRemoveFromCart = (productId) => {
    dispatch(cartActions.removeFromCart({productId}))
}


const totalCartItems = cartItems.reduce((acc, curr) => acc + curr.quantity, 0);

  
    return (
      <>
        <Header />
        <main className='container main-content mb-3'>
          <div className="row mt-4">
            <div className="col-md-8">

            <h3>My Cart ({totalCartItems})</h3>

            <div className="col-md-10">
            <hr />
            </div>
            
            <div className="row mt-3">
                {cartItems && cartItems.length > 0 ?(cartItems.map((product) => (
                <div className="col-lg-5 col-md-5 mb-4" key={product.productId}>
                    <div className="card p-0" style={{height: "100%"}}>
                    <div>
                    <img
                        src={product.productImageUrl}
                        alt={product.productName}
                        className="card-img-top"
                    />
                     <div className='card-body'>
                      <div className='text-center mb-2 fixed-height'><strong>{product.productName}</strong></div>
                      <div className='text-center mb-2'>{product.productCategory}</div>
                      
                      <div className="text-center my-3">
                        
                        <button type="button" className="clickbtn btn btn-outline-danger fw-bold" onClick={() => handleDecrement(product.productId)}>-</button>
                        <div style={{
                            display: "inline-block",
                            width: "30px",
                            textAlign: "center",
                          }}
                          className="mx-3"
                        >
                          {product.quantity}
                        </div>
                        <button type="button" className="clickbtn btn btn-outline-success fw-bold" onClick={() => handleIncrement(product.productId)}>+</button>
                        
                      </div>
                      


                      <div className='text-center mb-2'><strong className='text-success'>₹{(product.productMRP)} </strong><span className="text-danger" style={{ textDecoration: 'line-through' }}>₹{Math.floor(product.productMRP + (product.productMRP * product.discountPercent / 100)).toFixed(2)}</span></div>
                    </div>
                    </div>

                    <button className='clickbtn custom-btn-view text-center w-100' onClick={() => handleRemoveFromCart(product.productId)}>Remove From Cart</button>
                    </div>
                </div>
                ))): (<div className='alert alert-danger col-md-6'>No Products Available in the Cart.</div>)}
            </div>
            </div>

            {cartItems && cartItems.length > 0 && (
              <div className="col-md-4">
              <CartSummary />
            </div>
            )}
            
          </div>
          
        
        </main>
        <Footer />
      </>
    )
}

export default Cart;