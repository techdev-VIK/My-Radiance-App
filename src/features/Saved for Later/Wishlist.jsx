import { useSelector } from "react-redux";
import ProductCard from "../../components/ProductCard";

import Header from "../../components/Header";

import Footer from "../../components/Footer";



const Wishlist = () => {

    const wishlists = useSelector((state) => state.wishlist.wishlistProducts)

    return(
        <>
        <Header />
        <main className="container main-content">
            <div className="row mt-4">

                <div className="col-md-9">
                    <h3>Saved For Later ({wishlists.length})</h3>

                    <hr />

                    <div className="row">
                        {wishlists && wishlists.length > 0 ? (wishlists.map((product) => (
                            <div className='col-lg-4 col-md-4 col-sm-6 mb-4' key={product.productId}>
                                <ProductCard product={product} fromWishlist={true}/> 
                            </div>
                        ))) : (<div className='alert alert-danger col-md-6'>No Products available yet...</div>)}
                    </div>
                </div>

            </div>
        </main>
        <Footer />
        </>
    )
}

export default Wishlist;