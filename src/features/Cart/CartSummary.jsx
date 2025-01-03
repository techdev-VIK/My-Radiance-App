import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CartSummary = () => {

    const cartItems = useSelector((state) => state.cart.cartProducts);


    const navigate = useNavigate();

    const [totalItems, setTotalItems] = useState(0);
    const [totalMrp, setTotalMrp] = useState(0);
    const [totalDiscountedMrp, setTotalDiscountedMrp] = useState(0);
    const [shippingFee, setShippingFee] = useState(60);
    const [totalAmount, setTotalAmount] = useState(0);


    useEffect(() => {
        
            const items = cartItems.reduce((acc, curr) => acc + curr.quantity, 0)

            const mrp = cartItems.reduce((acc, curr) => acc + curr.productMRP * curr.quantity, 0)

            const roundedMrp = mrp.toFixed(2)

            const discountedMrp = cartItems.reduce((acc, curr) => {
                
                const discountPrice = (curr.productMRP * curr.discountPercent / 100);
                return acc + (discountPrice * curr.quantity);
            }, 0);
    
            
            const roundedDiscountedMrp = Math.floor(discountedMrp).toFixed(2);

            setTotalItems(items);
            setTotalMrp(roundedMrp);
            setTotalDiscountedMrp(roundedDiscountedMrp);

            const fee = mrp > 999 ? 0 : 60
            setShippingFee(fee);


            const finalAmount = (mrp + fee).toFixed(2);
            setTotalAmount(finalAmount);
        
    }, [cartItems])



    const handlePlaceOrder = () => {

      navigate("/pages/cart/shipping");
  }

    


    return (
        <div className="card p-0 mt-5" style={{ position: "sticky", top: "100px" }}>
                <div className="card-body">

                  <div className="mb-3">
                    <span className="fs-4 fw-bold"> Summary: ({totalItems}{" "}{totalItems > 1 ? "Items" : "Item"})</span>
                  </div>

                  <div className="d-flex justify-content-between mb-2">
                    <span className="fs-6">Items Cost:</span>
                    <span className="fs-6 fw-bold">₹{totalMrp}</span>
                  </div>

                  <div className="d-flex justify-content-between mb-2">
                    <span className="fs-6">Discount:</span>
                    <span className="fs-6 fw-bold">₹{totalDiscountedMrp}</span>
                  </div>

                  <div className="d-flex justify-content-between mb-2">
                    <span className="fs-6">Shipping Fee:</span>
                    <span className="fs-6 fw-bold">
                      {`₹${shippingFee}`}
                    </span>
                  </div>

                  <hr />

                  <div className="d-flex justify-content-between mb-3">
                    <span className="fs-5 fw-bold">Order Total:</span>
                    <span className="fs-5 fw-bold">₹{totalAmount}</span>
                  </div>

                  <p className="mt-3 text-success">Sold By: Radiance Co.</p>
                  <button className="clickbtn custom-btn-view-rounded text-center w-100" onClick={handlePlaceOrder}>
                    Place Order
                  </button>
                </div>
              </div>
    )
}

export default CartSummary;