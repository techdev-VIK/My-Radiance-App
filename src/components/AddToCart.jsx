

import { useDispatch } from "react-redux";
import { cartActions } from "../features/Cart/CartSlice";

const AddToCart = ({product}) => {

    const dispatch = useDispatch();

    const handleAddToCart = () => {
        dispatch(cartActions.addToCart(product));
    }
    
    return (
        <>
            <button className='clickbtn custom-btn-view text-center w-100' onClick={handleAddToCart}>Add To Cart</button>
        </>
    )
}

export default AddToCart