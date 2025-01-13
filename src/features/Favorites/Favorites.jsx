
import '../../App.css';

import 'bootstrap/dist/css/bootstrap.min.css';

import Header from '../../components/Header';
import Footer from '../../components/Footer';

import ProductCard from '../../components/ProductCard';

import { useSelector } from 'react-redux';

function Favorites() {

    const favorites = useSelector((state) => state.favorites.favProducts);


    // console.log(favorites);


  return (
    <>
      <Header />
      <main className='container main-content'>
        <div className='row mt-4'>

            <div className="col-md-9">

                <h2>My Favorites ({favorites.length})</h2>
          
            <hr />

            <div className="row">
                {favorites && favorites.length > 0 ?(favorites.map((product) => (
                  <div className='col-lg-4 col-md-4 col-sm-6 mb-4' key={product._id}>
                    <ProductCard product={product} />
                  </div>
                ))): (<div className='alert alert-danger col-md-6'>Your Wishlist is Empty...</div>)}
            </div>
            </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

export default Favorites;
