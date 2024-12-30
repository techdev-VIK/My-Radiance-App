import Header from "../components/Header";

import Footer from "../components/Footer";


import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [secret, setSecret] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {

    e.preventDefault();

    try {
      // Send the secret in the POST request body
      const response = await axios.post("http://localhost:3000/admin/login", {
        secret,
      });

      if (response.data.token) {
        console.log("Login successful. Token:", response.data.token);
        // Store the token in localStorage
        localStorage.setItem("token", response.data.token);
        navigate("/pages/cart")
      } else {
        console.log(response.data.message); // Handle login errors
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
<>
<Header />

<main className='container main-content'>

<div className="d-flex justify-content-center mt-5">
  <div className="card" style={{border: "2px solid #00AFEF"}}>
    <div className="card-body text-center">

      <img src="https://placehold.co/100?text=U" alt="" className="img-fluid rounded-circle mb-3"/>

      <br />
      <form onSubmit={handleLogin}>
      <label htmlFor="username">Username:</label>
        <input type="text" id="username" className="form-control" style={{border: "2px solid #00AFEF"}} required/>
        <br />
        <label htmlFor="password">Password:</label>
        <input value={secret}
        onChange={(e) => setSecret(e.target.value)} type="password" id="password" className="form-control" style={{border: "2px solid #00AFEF"}} required/>


<button className='clickbtn btn btn-info text-light text-center mt-4' >Log In</button>

      </form>
        
    </div>

    <hr />

    <p className="text-center">New User?</p>

    <button className='clickbtn text-center btn btn-success' >Create Account</button>
  </div>
</div>
</main>

<Footer />

</>
  );
};

export default Login;
