import Header from "../../components/Header";

import Footer from "../../components/Footer";

import { useParams } from "react-router-dom";


import { useEffect, useState } from "react";

import ProductCard from "../../components/ProductCard";

import AddToCart from "../../components/AddToCart";
import { useDispatch, useSelector } from "react-redux";

import { fetchProducts } from "./productsSlice";

export default function Details(){


  const dispatch = useDispatch();

  const {products, status, error} = useSelector((state) => state.products)

  // console.log(products)

  useEffect(() => {
    dispatch(fetchProducts())
  }, [dispatch])


    const [quantity, setTotalQuantity] = useState(1)

    const productId = useParams();
    // console.log(productId)

    const productData = products?.find((item) => item.productId === Number(productId.productId));

    // console.log(productData)

    const recommendProducts = productData.productType;

    const currentProductId = productData.productId;



    if (status==="error") return <div className="alert alert-danger">{error}</div>

    if (status === "loading") return <div className='d-flex justify-content-center align-items-center' style={{ height: "100vh" }}><div className="spinner-border text-info" style={{width: "5rem", height: "5rem"}} role="status">
  <span className="visually-hidden">Loading...</span>
</div></div>
    
    return(
        <>
         <Header />

         <main className="container main-content">
         {productData && (
            <div className="row mt-5">
            <div className="col-md-3">
            <img
                src={productData.productImageUrl}
                alt={productData.productName}
                className="img-fluid rounded"
                style={{position: "sticky", top: "100px"}}
            />
            
            </div>

            <div className='col-md-6'>
                <p className='mb-2 fs-2'>{productData.productName}, {(productData.productDescription).slice(0,-1)
                }, {productData.
                    productQuantity
                    }</p>
                
                <hr />

                <div className='mt-3 fs-5 fw-3'>Category: {productData.productCategory}</div>

                <div className='mt-3 fs-5 fw-3'>Skin Type: {productData.productSkinType}</div>

                <div className='mt-3 fs-5'>Rating: <span><i className="bi bi-star-fill text-warning"></i></span>{(productData.productRating).toFixed(1)}</div>
                

                <div className='mt-2'><span className="text-danger fs-6">-{productData.discountPercent}% </span><sup className="ms-2 fs-6">₹</sup><span className="fs-3 text-success">{(productData.productMRP).toFixed(2)} </span></div>

                
                <div className="mt-2 fs-5">
                <p>M.R.P. <span className="text-danger" style={{ textDecoration: 'line-through' }}>₹{Math.floor(productData.productMRP + (productData.productMRP * productData.discountPercent / 100)).toFixed(2)}</span></p>
                </div>
                <hr />

            <div className="d-flex justify-content-around">

                <div className="d-flex flex-column mx-4">
                <img src="https://res.cloudinary.com/dcvvdfif9/image/upload/v1734197948/transaction_jcybsb.png" alt="transaction" style={{width: "70px", height: "70px"}} />

                <p className="text-center" style={{width: "70px", height: "30px"}}>Secure Transaction</p>
                </div>


                <div className="d-flex flex-column mx-4">
                <img src="https://res.cloudinary.com/dcvvdfif9/image/upload/v1734197948/delivery_bcpy6s.png" alt="delivery" style={{width: "70px", height: "70px"}} />

                <p className="text-center" style={{width: "70px", height: "30px"}}>Fast Delivery</p>
                </div>


                <div className="d-flex flex-column mx-4">
                <img src="https://res.cloudinary.com/dcvvdfif9/image/upload/v1734197948/ecommerce_vsilhw.png" alt="return" style={{width: "70px", height: "70px"}} />

                <p className="text-center" style={{width: "70px", height: "30px"}}>Easy Returns</p>
                </div>


                <div className="d-flex flex-column mx-4">
                <img src="https://res.cloudinary.com/dcvvdfif9/image/upload/v1734198915/cash-on-delivery_fgh4aa.png" alt="COD" style={{width: "70px", height: "70px"}} />

                <p className="text-center" style={{width: "70px", height: "30px"}}>COD Available</p>
                </div>

            </div>
                
            <hr />

            <div>
                <h5 className="mb-3"><strong>Details:</strong></h5>

                <div className="mb-2 d-flex">
                    <div style={{ width: "150px", fontWeight: "bold" }}>Brand:</div>
                    <div>{productData.productBrand}</div>
                </div>

                <div className="mb-2 d-flex">
                    <div style={{ width: "150px", fontWeight: "bold" }}>Item Volume:</div>
                    <div>{productData.productQuantity}</div>
                </div>

                <div className="mb-2 d-flex">
                    <div style={{ width: "150px", fontWeight: "bold" }}>Special Features:</div>
                    <div>{productData.productfeatures.join(", ")}</div>
                </div>

                <div className="mb-2 d-flex">
                    <div style={{ width: "150px", fontWeight: "bold" }}>Skin Type:</div>
                    <div>{productData.productSkinType}</div>
                </div>

                <div className="mb-2 d-flex">
                    <div style={{ width: "150px", fontWeight: "bold" }}>Item Type:</div>
                    <div>{productData.productType}</div>
                </div>

                <div className="mb-2 d-flex">
                    <div style={{ width: "150px", fontWeight: "bold" }}> Ingredients:</div>
                    <ul className="px-2">
                    {productData.productIngredients.map((ing, index) => (
                        <li key={index}>{ing}</li>
                    ))}
                    </ul>
                    
                </div>
                </div>

                
            <hr />

             <div>
                <h6><strong>About This Item</strong></h6>
                <ul>
                    {productData.aboutTheProduct.map((about, index) => (
                        <li key={index}>{about}</li>
                    ))}
                </ul>
             </div>

            </div>

            <div className="col-md-3">
                <div className="card p-0" style={{position: "sticky", top: "100px"}}>
                <div className="card-body">
                <div className='mb-2'><sup className="fs-6">₹</sup><span className="fs-3">{(productData.productMRP * quantity).toFixed(2)} </span></div>
                <p className="text-success">In Stock</p>
                <div>
                    Pack of:
                    <select className="form-control p-1 w-50" onChange={(e) => setTotalQuantity(e.target.value)}>
                    <option value="1">1</option>
                    </select>
                </div>
                <p className="mt-3">Sold By: Radiance Co.</p>
                <AddToCart product={productData} /> 
                
            </div>
            </div>
            </div>
            </div>)}

            <hr />


        <div className="my-5">

        <h4 className="mb-3">Other Products You May Like:</h4>
                        
        <div className='row'>
        {products && (products.filter((item) => item.productType === recommendProducts).filter((item) => item.productId !== currentProductId).map((product) => ( 
             <div className='col-lg-3 col-md-3 col-sm-6 mb-4' key={product._id}>
                <ProductCard product={product} />
                </div>
              
            )))}
            </div>

        </div>
            
         </main>

         <Footer />
        </>
    )
}