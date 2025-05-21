
import '../../App.css';

import 'bootstrap/dist/css/bootstrap.min.css';

import { useEffect, useState } from 'react';

import { Link, useLocation } from 'react-router-dom';

import ProductCard from '../../components/ProductCard';
import { useDispatch, useSelector } from 'react-redux';

import { fetchProducts } from './productsSlice';
import Pagination from '../../components/Pagination';
import ShimmerCard from '../../components/Shimmer';


function AllProducts() {

  const location = useLocation();

  const dispatch = useDispatch();

  const {products, status, error} = useSelector((state) => state.products)


  useEffect(() => {
    dispatch(fetchProducts())
  }, [dispatch])

 

 const searchParams = new URLSearchParams(location.search);

 const searchQuery = searchParams.get('search') || '';

 const [category, setCategory] = useState(['All']);
 const [rating, setRating] = useState(1);
 const [price, setPrice] = useState('All');
 const [sortOption, setSortPrice] = useState('');


 const [currentPageProducts, setCurrentPageProducts] = useState([]);

 

  const clearFilters = () => {
    setCategory(['All']);
    setRating(1);
    setPrice('All');
  }

 const categoryHandler = (e) => {
    const {checked, value} = e.target;

    if(value === "All"){
        if(checked){
            setCategory(['All'])
        }else{
            setCategory([])
        }
    }else{
        setCategory((prev) => {
            if(checked){
                return prev.filter((val) => val !== "All").concat(value);
            }else{
                return prev.filter((val) => val !== value)
            }
        })
    }
 }


// Filter for Rating 
const handleRatingChange = (e) => {
  const getRating = e.target.value;

  setRating(getRating);
};


  // Filter based on search query
  const filteredProducts = products?.filter((product) =>
    product.productName.toLowerCase().includes(searchQuery.toLowerCase()) // Search filter
  )
  .filter((product) => (category.includes('All') || category.includes(product.productType)))
  .filter((product) => product.productRating >= rating)
  .filter((product) => {
    if (price === 'All') return true;
    if (price === 'Less than 999') return product.productMRP < 999;
    if (price === 'Between 1000 to 1999') return product.productMRP >= 1000 && product.productMRP <= 1999;
    if (price === 'Between 2000 to 2999') return product.productMRP >= 2000 && product.productMRP <= 2999;
    return product.productMRP >= 3000;
  });



const filterAfterSorting = !sortOption ? filteredProducts : filteredProducts.sort((a,b) => {
    if(sortOption === "High"){
        return (b.productMRP - a.productMRP);
    }else{
        return (a.productMRP - b.productMRP);
    }
})


// Pagination:

const [currentPage, setCurrentPage] = useState(0);


const handlePageChange = (start, end) => {
  setCurrentPageProducts(filterAfterSorting.slice(start, end))

}


useEffect(() => {
setCurrentPage(0);
handlePageChange();
}, [filterAfterSorting.length, sortOption])


  if (status === "error") return <div className="alert alert-danger">{error}</div>

  if (status === "loading") {
    return (
      <div className='container py-5'>
        <div className='row mt-5'>
          {Array(12).fill().map((_, idx) => (
            <div className='col-lg-3 col-md-3 col-sm-6' key={idx}>
              <ShimmerCard />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <>
      
      <main className='container main-content'>
        <div className='row mt-5'>
            <div className='col-md-3'>
            <div style={{position: "sticky", top: "100px" }}>
            
            <div className='d-flex justify-content-between my-2'>
                <h3>Filters</h3>
                <button className='clickbtn btn btn-outline-info btn-sm p-1' onClick={clearFilters}>Clear All</button>
            </div>
              
              <hr />

              <h5 className='mt-4'>Category</h5>
              <input type="checkbox" id="allProducts" value="All" onChange={categoryHandler} checked={category.includes("All")} /> <label htmlFor="allProducts">All Products</label><br />
              <input type="checkbox" id="skin" value="Skin Care" onChange={categoryHandler} checked={category.includes('Skin Care')}/> <label htmlFor="skin">Skin Care</label> <br />
              <input type="checkbox" id="hair" value="Hair Care" onChange={categoryHandler} checked={category.includes('Hair Care')}/> <label htmlFor="hair">Hair Care </label><br />
              <input type="checkbox" id="perfume" value="Perfume" onChange={categoryHandler} checked={category.includes('Perfume')}/> <label htmlFor="perfume">Perfume</label> <br />



              <h5 className='mt-4'>Price</h5>
              <input type="radio" name="productPrice" id="allPrices" value="All" onChange={(e) => setPrice(e.target.value)} checked={price == "All"}/> <label htmlFor="allPrices">All Prices</label> <br />

              <input type="radio" name="productPrice" id="lessThan999" value="Less than 999" onChange={(e) => setPrice(e.target.value)} checked={price=="Less than 999"}/> <label htmlFor="lessThan999">Less than 999</label> <br />

              <input type="radio" name="productPrice" id="between1000to1999" value="Between 1000 to 1999" onChange={(e) => setPrice(e.target.value)} checked={price == "Between 1000 to 1999"}/> <label htmlFor="between1000to1999">Between 1000 to 1999</label><br />

              <input type="radio" name="productPrice" id="between2000to2999" value="Between 2000 to 2999" onChange={(e) => setPrice(e.target.value)} checked={price == "Between 2000 to 2999"}/> <label htmlFor="between2000to2999">Between 2000 to 2999</label> <br />

              <input type="radio" name="productPrice" id="3000AndAbove" value="3000 or Above" onChange={(e) => setPrice(e.target.value)} checked={price == "3000 or Above"}/> <label htmlFor="3000AndAbove">3000 or Above</label> <br />

            

              <h5 className="mt-4"><i className="bi bi-star-fill text-warning"></i>&nbsp;Rated &nbsp;{rating}+</h5>
                <input 
                type="range" 
                min="0" 
                max="4" 
                step="1" 
                value={rating} 
                onChange={handleRatingChange} 
                className="rating-slider" 
                />
                

                <div className="rating-div">
                <span>0</span>
                <span>1</span>
                <span>2</span>
                <span>3</span>
                <span>4</span>
                </div>
            </div>
            </div>

            <div className="col-md-9">

            <div className='d-flex justify-content-between my-2'>
                <h3>{searchQuery ? `Products available for "${searchQuery}": `: "Products available: " }{filterAfterSorting &&filterAfterSorting.length}</h3>

                <select className='form-select w-auto' onChange={(e) => setSortPrice(e.target.value)}>
                    <option value="">-- Sort By Price --</option>
                    <option value="High">High to Low</option>
                    <option value="Low">Low to High</option>
                </select>
            </div>
          
            <hr />

            <div className="row">
                {currentPageProducts && currentPageProducts.length > 0 ?(currentPageProducts.map((product) => (
                <div className='col-lg-4 col-md-4 col-sm-6 mb-4' key={product._id}>
                <ProductCard product={product} />
                </div>
                ))): (<><div className='alert alert-danger'>Sorry, Products are not available. Please check later.</div><div className="d-flex justify-content-center mt-5">
                  <Link
                    className='clickbtn custom-btn-view text-center'
                    to="/"
                  >
                    Back to previous page
                  </Link>
                </div></>)}

                {filterAfterSorting.length>0 && <Pagination products = {filterAfterSorting} currentPage={currentPage} setCurrentPage={setCurrentPage} onPageChange={handlePageChange} />}
            </div>
            </div>
        </div>
      </main>
      
    </>
  )
}

export default AllProducts;
