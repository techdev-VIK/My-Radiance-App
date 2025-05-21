import { Link } from "react-router-dom";

import FavsHeart from "./FavsHeart";

import AddToCart from "./AddToCart";
import { useState } from "react";

const ProductCard = ({product, fromWishlist = false}) => {

    const [imgLoaded, setImgLoaded] = useState(false);


    return (
        <>
            <div className='card p-0 shadow-sm hover-zoom'>

            {!imgLoaded && (
                <div className="shimmer-card">
                <div className="shimmer shimmer-img"></div>
                <div className="shimmer shimmer-text"></div>
                <div className="shimmer shimmer-text short"></div>
                <div className="shimmer shimmer-text short"></div>
                <div className="shimmer shimmer-text"></div>
                </div>
            )}


            <Link to={`/allProducts/${product._id}`} className="text-decoration-none text-dark">
                <img src={product.productImageUrl ? product.productImageUrl : "https://placehold.co/600x400?text=R"} alt={product.productName} className='card-img-top img-fluid' onLoad={() => setImgLoaded(true)} />
                <div className='card-body'>
                    <div className='text-center mb-2 fixed-height'><strong>{product.productName}</strong></div>
                    <div className='text-center mb-2'>{product.productCategory}</div>
                    <div className='text-center mb-2'><span><i className="bi bi-star-fill text-warning"></i></span>{(product.productRating).toFixed(1)}</div>
                    <div className='text-center mb-2'><strong className='text-success'>₹{(product.productMRP).toFixed(2)} </strong><span className='text-danger' style={{ textDecoration: 'line-through' }}>₹{Math.floor(product.productMRP + (product.productMRP * product.discountPercent / 100)).toFixed(2)}</span></div>
                </div>
                </Link>
                <FavsHeart product={product}/>
                <AddToCart product={product} fromWishlist={fromWishlist}/>
            </div>
            
        </>
    )
}

export default ProductCard;