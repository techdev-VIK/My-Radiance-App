import Header from "../../components/Header";

import Footer from "../../components/Footer";

import { useDispatch, useSelector } from "react-redux";

import { cartActions } from "./CartSlice";
import CartSummary from "./CartSummary";

import { wishlistActions } from "../Saved for Later/wishlistSlice";
import { toast } from "react-toastify";

function Cart(){

    const cartItems = useSelector((state) => state.cart.cartProducts);

    const wishlists = useSelector((state) => state.wishlist.wishlistProducts)

    const dispatch = useDispatch();


    const handleIncrement = (productId) => {

      const product = cartItems.find((item) => item._id === productId);
      
      if(product){
        dispatch(cartActions.updateQuantity({productId: product._id, quantity: product.quantity + 1}))
      }
    };

    const handleDecrement = (productId) => {

      const product = cartItems.find((item) => item._id === productId);
      
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
    toast.error("Item(s) removed from cart!");
}


const handleSaveForLater = (productId) => {

  const product = cartItems.find((item) => item._id === productId)

  if (!product) {

    return;
  }

  const isWishlist = wishlists.some((item) => item._id === product.productId);



  if(!isWishlist){
    dispatch(wishlistActions.addToWishlist(product))
  
    dispatch(cartActions.removeFromCart({productId}));
    toast.info("Item(s) saved for later!");
  }else{
    dispatch(cartActions.removeFromCart({productId}));
  }
}


const totalCartItems = cartItems.reduce((acc, curr) => acc + curr.quantity, 0);

  
    return (
      <>
        <Header />
        <main className='container main-content mb-3'>
          <div className="row mt-4">
            <div className="col-md-8">

            <h2>My Cart ({totalCartItems})</h2>

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

                      <div className='text-center mb-2'><strong>Size: </strong>{product.productQuantity}</div>

                      
                      <div className="text-center my-3">
                        
                        <button type="button" className="clickbtn btn btn-outline-danger fw-bold" onClick={() => handleDecrement(product._id)}>-</button>
                        <div style={{
                            display: "inline-block",
                            width: "30px",
                            textAlign: "center",
                          }}
                          className="mx-3"
                        >
                          {product.quantity}
                        </div>
                        <button type="button" className="clickbtn btn btn-outline-success fw-bold" onClick={() => handleIncrement(product._id)}>+</button>
                        
                      </div>
                      


                      <div className='text-center mb-2'><strong className='text-success'>₹{(product.productMRP)} </strong><span className="text-danger" style={{ textDecoration: 'line-through' }}>₹{Math.floor(product.productMRP + (product.productMRP * product.discountPercent / 100)).toFixed(2)}</span></div>
                    </div>
                    </div>

                    <div className="btn-group w-100" role="group">
                    <button 
                      className="btn btn-sm btn-outline-success w-50 p-2" 
                      onClick={() => handleSaveForLater(product._id)}
                    >
                      <i className="bi bi-save2 me-1"></i>Save For Later
                    </button>
                    <button 
                      className="btn btn-sm btn-outline-danger w-50 p-2" 
                      onClick={() => handleRemoveFromCart(product._id)}
                    >
                      <i className="bi bi-trash me-1"></i>Delete
                    </button>
                  </div>
                </div>
                    
                </div>
                ))): (<div className='alert alert-danger col-md-6'>Your Radiance Cart is empty.</div>)}
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