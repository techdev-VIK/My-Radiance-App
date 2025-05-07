import '../../App.css'

import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

import { useEffect, useState } from 'react';

import { fetchProducts } from './productsSlice';

import ProductCard from '../../components/ProductCard';
import { useDispatch, useSelector } from 'react-redux';

function HomePage() {

  const dispatch = useDispatch();

  const {products, status, error} = useSelector((state) => state.products);


  useEffect(() => {
    dispatch(fetchProducts())
  }, [dispatch])



  if (status === "loading") return <div className='d-flex justify-content-center align-items-center' style={{ height: "100vh" }}><div className="spinner-border text-info" style={{width: "5rem", height: "5rem"}} role="status">
  <span className="visually-hidden">Loading...</span>
</div></div>

  if (status==="error") return <div className="alert alert-danger">{error}</div>
 


  return (
    <>
      
      <main className='main-content'> 
      
        
      <div id="carouselExampleAutoplaying" className="carousel slide" data-bs-ride="carousel" data-bs-interval="3000"  >
        <div className="carousel-inner" style={{maxHeight: "50vh", objectFit:"cover"}}>

        <div className="carousel-item active">
          <img src="https://res.cloudinary.com/dcvvdfif9/image/upload/c_crop,w_10000,h_2400/v1734192117/Banner3_eqhdeh.jpg" className="d-block w-100" alt="carousel image1" />
        </div>

        <div className="carousel-item" >
          <img src="https://res.cloudinary.com/dcvvdfif9/image/upload/t_BannerImage1/v1737225966/freepik__expand__92827_df2btw.png" className="d-block w-100" alt="carousel image2" />
          </div>

          <div className="carousel-item">
          <img src="https://res.cloudinary.com/dcvvdfif9/image/upload/t_BannerImageFinal/v1737225868/freepik__expand__70433_diatcq.png" className="d-block w-100" alt="carousel image3" />
          </div>

          <div className="carousel-item">
          <img src="https://res.cloudinary.com/dcvvdfif9/image/upload/v1737225409/freepik__expand__21747_copy_cubgql.png" className="d-block w-100" alt="carousel image4" />
          </div>

          

          <div className="carousel-item">
          <img src="https://res.cloudinary.com/dcvvdfif9/image/upload/t_BannerImageFinal/v1734192117/Banner1_f8igxx.jpg" className="d-block w-100" alt="carousel image5" />
          </div>

        </div>

        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>



      <div className='container py-4'>


      <div className='d-flex justify-content-between align-items-center mt-4'>
          <div>
            <h4>Best Sellers</h4>
            <p>Explore best-selling safe, natural, and 100% toxin-free beauty products from Radiance.</p>
            
          </div>
          <Link to="/pages/allProducts" className='clickbtn custom-btn-view-rounded text-center'>View All</Link>
            
        </div>
        <div className='row'>
        {products && (products.filter((item) => item.productRating >= 4.9).sort((a,b) => b.productRating - a.productRating).slice(0,4).map((product) => ( 
             <div className='col-lg-3 col-md-3 col-sm-6 mb-4' key={product._id}>
             <ProductCard product={product} />
             </div>
              
            )))}
            </div>


        <div className='d-flex justify-content-between align-items-center mt-4'>
          <div>
            <h4>Skin Care</h4>
            <p>Explore 100% toxin-free and safe skincare products by Radiance that are formulated with natural ingredients.</p>
            
          </div>
          <Link to="/pages/allProducts" className='clickbtn custom-btn-view-rounded text-center'>View All</Link>
            
        </div>
        <div className='row'>
        {products && (products.filter((item) => item.productType === "Skin Care").slice(4,8).map((product) => ( 
             <div className='col-lg-3 col-md-3 col-sm-6 mb-4' key={product._id}>
             <ProductCard product={product} />
             </div>
              
            )))}
            </div>


            <div className='d-flex justify-content-between align-items-center mt-5'>
          <div>
            <h4>Hair Care</h4>
            <p>Check Out our Radiance 100% toxin-free safe Hair products, formulated without harmful chemicals.</p>
            
          </div>
          <Link to="/pages/allProducts" className='clickbtn custom-btn-view-rounded text-center'>View All</Link>
            
        </div>
        <div className='row'>
        {products && (products.filter((item) => item.productType === "Hair Care").slice(5,9).map((product) => (
             <div className='col-lg-3 col-md-3 col-sm-6 mb-4' key={product._id}>
             <ProductCard product={product} />
             </div>
                
              
            )))}
            </div>



            <div className='d-flex justify-content-between align-items-center mt-5'>
          <div>
            <h4>Perfumes</h4>
            <p>Radiance Perfume range is the Safe Certified perfume and is inspired by both nature and you.</p>
            
          </div>
          <Link to="/pages/allProducts" className='clickbtn custom-btn-view-rounded text-center'>View All</Link>
            
        </div>
        <div className='row'>
        {products && (products.filter((item) => item.productType === "Perfume").slice(0,4).map((product) => (
                <div className='col-lg-3 col-md-3 col-sm-6 mb-4' key={product._id}>
                 <ProductCard product={product} />
                </div>  
              
            )))}
            </div>

        </div>
      </main>

    </>
  )
}

export default HomePage;
