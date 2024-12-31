import { NavLink, useNavigate } from 'react-router-dom';
import '../App.css';

import { useState } from 'react';

import { useSelector } from 'react-redux';

import { useEffect } from 'react';


export default function Header(){


  const[searchTerm, setSearchTerm] = useState('');

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleLogout = () => {
    if (!isLoggedIn) {
      navigate("/pages/login");
    } else {
      localStorage.removeItem("token"); // Remove token from storage
      localStorage.removeItem("username");
      setIsLoggedIn(false);
      navigate("/"); // Redirect to home
    }
  };

  const cartItems = useSelector((state) => state.cart.cartProducts);

  const favorites = useSelector((state) => state.favorites.favProducts);


  // Calculate the total number of items in the cart
  const totalCartItems = cartItems.reduce((acc, curr) => acc + curr.quantity, 0);



  const handleSearchSubmit = (e) => {
    e.preventDefault();

      navigate(`/pages/allProducts?search=${searchTerm}`, {state: {searchTerm}})
    
  }

  const username = localStorage.getItem("username");



    return (

      
<nav className="navbar navbar-expand-lg navbar-dark bg-dark" style={{position: "fixed", width: "100%", zIndex: 1000}}>
  <div className="container">
    <NavLink className="eagle-lake-regular" to="/">Radiance</NavLink>

    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation" style={{ color: "#00AFEF" }}>
      <span className="navbar-toggler-icon"></span>
    </button>

    

    <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <div style={{width: "70%"}}>
      <form className="w-75 ms-5" onSubmit={handleSearchSubmit}>
        <div className='input-group'>
        <input className="form-control" type="search" placeholder="Please enter any product you wish to buy..." aria-label="Search"  value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />

        <button className="clickbtn custom-btn-search"  type="submit" >Search</button>
        </div>
      </form>
    </div>



<div className='ms-5 mt-3'>
    <ul className="navbar-nav">
            <li className="nav-item me-4">
              <NavLink className="nav-link clickbtn" to="/pages/favorites">
                <span className="bi bi-heart position-relative" style={{ fontSize: '1.5rem', color: "#00AFEF" }}>
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{ fontSize: '0.95rem', padding: '2px 6px', lineHeight: '1' }}>
                  {favorites.length > 9 ? "9+" : favorites.length}
                </span>
                </span>
                </NavLink>
            </li>
           

            <li className="nav-item me-4">
              
              <NavLink className="nav-link clickbtn" to="/pages/cart">
                <span className="bi bi-cart position-relative" style={{ fontSize: '1.5rem', color: "#00AFEF" }}>
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{ fontSize: '0.95rem', padding: '2px 6px', lineHeight: '1' }}>
                  {totalCartItems > 9 ? "9+" : totalCartItems}
                </span>
                </span>
                </NavLink>
            </li>
                

            <li className="nav-item me-4">
              
              <NavLink className="nav-link clickbtn" to={isLoggedIn ? `/pages/userinfo/${username}` : "/pages/login"}>
              <span className="bi bi-person position-relative" style={{ fontSize: '1.6rem', color: "#00AFEF" }}>
                {isLoggedIn ? <span className="position-absolute top-0 start-100 translate-middle p-2 bg-success border border-light rounded-circle" style={{ fontSize: '0.95rem', padding: '2px 6px', lineHeight: '1' }}>
                  
                  </span> : <span className="position-absolute top-0 start-100 translate-middle p-2 bg-danger border border-light rounded-circle" style={{ fontSize: '0.95rem', padding: '2px 6px', lineHeight: '1' }}>
                  
                  </span>}
                
                </span>
                
                </NavLink>
                
            </li>


            <li className="nav-item me-4">
              
              <button className='custom-btn-search p-1 mt-2 click-btn' onClick={handleLogout}>
              {isLoggedIn ? "Logout" : "Login"}
              </button>
                
            </li>
               
        </ul>
        </div>
     </div>
     </div>
</nav>
    )
}