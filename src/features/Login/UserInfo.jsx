
import Header from "../../components/Header";
import Footer from "../../components/Footer";

import { Link } from "react-router-dom";

import useFetch from "../../useFetch";

function UserInfo(){

    const username = localStorage.getItem("username");

    const {data, loading, error} = useFetch(`https://radiance-backend.vercel.app/users/read/${username}`);


    if (loading) {
        return (
          <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
            <div className="spinner-border text-info" style={{ width: "5rem", height: "5rem" }} role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        );
      }
    
      if (error) {
        return <div className="alert alert-danger">{error}</div>;
      }

    return(
        <>
          <Header />
          <main className="container main-content">
            <Link to={`/pages/userinfo/${username}`}><button>User Details</button></Link>
          </main>
          <Footer />
        </>
    )
}


export default UserInfo;