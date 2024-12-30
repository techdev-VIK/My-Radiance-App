import { Link } from "react-router-dom";

import FavsHeart from "./FavsHeart";

import AddToCart from "./AddToCart";

const ProductCard = ({product}) => {

    return (
        <>
            <div className='card p-0 shadow-sm hover-zoom'>
            <Link to={`/allProducts/${product.productId}`} className="text-decoration-none text-dark">
                <img src={product.productImageUrl} alt="" className='card-img-top' />
                <div className='card-body'>
                    <div className='text-center mb-2 fixed-height'><strong>{product.productName}</strong></div>
                    <div className='text-center mb-2'>{product.productCategory}</div>
                    <div className='text-center mb-2'><span><i className="bi bi-star-fill text-warning"></i></span>{(product.productRating).toFixed(1)}</div>
                    <div className='text-center mb-2'><strong className='text-success'>₹{(product.productMRP).toFixed(2)} </strong><span className='text-danger' style={{ textDecoration: 'line-through' }}>₹{Math.floor(product.productMRP + (product.productMRP * product.discountPercent / 100)).toFixed(2)}</span></div>
                </div>
                </Link>
                <FavsHeart product={product}/>
                <AddToCart product={product} />
            </div>
            
        </>
    )
}

export default ProductCard;