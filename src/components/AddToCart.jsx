import { useDispatch } from "react-redux";
import { cartActions } from "../features/Cart/CartSlice";
import { wishlistActions } from "../features/Saved for Later/wishlistSlice";
import { toast } from "react-toastify";

const AddToCart = ({product, fromWishlist = false}) => {

    const dispatch = useDispatch();

    const handleAddToCart = () => {
        dispatch(cartActions.addToCart(product));
        toast.success("Yayy!! Item added to cart!");

        if(fromWishlist){
            dispatch(wishlistActions.removeFromWishlist(product));
        }
    }
    
    return (
        <>
            <button className='clickbtn custom-btn-view text-center w-100' onClick={handleAddToCart}>{fromWishlist ? "Move To Cart" : "Add To Cart"}</button>
        </>
    )
}

export default AddToCart