import { useDispatch, useSelector } from 'react-redux';
import { favActions } from '../features/Favorites/favoritesSlice';

function FavsHeart({product}){
    
    const favorites = useSelector((state) => state.favorites.favProducts)

    const isFavorite = favorites.some((item) => item.productId === product.productId);

    const dispatch = useDispatch();

    const handleHeartClick = () => {
        if(!isFavorite){
            dispatch(favActions.addToFavs(product))
        }else{
            dispatch(favActions.removeFromFavs(product))
        }
    }
    return (

        <div style={{ position: "absolute", top: "10px", right: "10px", zIndex: 1 }}>
            <button
                onClick={handleHeartClick}
                className="btn p-2 clickbtn"
                style={{ background: "transparent", border: "none" }}
            >
                <i
                    className={`bi ${isFavorite ? "bi-heart-fill text-danger" : "bi-heart-fill text-light"}`}
                    style={{ fontSize: "1.5rem" }}
                ></i>
            </button>
        </div>
    )
}


export default FavsHeart;