
import Header from "../../components/Header";
import Footer from "../../components/Footer";

import useFetch from "../../useFetch";
import { useParams } from "react-router-dom";

function UserDetails(){

    const {username} = useParams();


    const {data, loading, error} = useFetch(`https://radiance-backend.vercel.app/users/read/${username}`);


    console.log("Fetched Data:", data);
    console.log("Loading:", loading);
    console.log("Error:", error);

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

            {data && <div className="row">
                <div className="col-md-4">
                    <img src="https://placehold.co/200?text=U" alt="" className="img-fluid rounded-circle" />

                    Name: {data.firstName}&nbsp;{data.lastName}
                </div>

                <div className="col-md-8">
                    <div className="card mt-3">
                        <div className="card-body">
                            Name: {data.firstName}&nbsp;{data.lastName}

                            userName: {data.username}

                            Phone Number: {data.phoneNumber}

                            Password: {data.password}

                            Address: {data.address}


                            Alternate Address: {data.alternateAddress}

                        </div>

                    </div>
                </div>

            </div>}
          </main>
          <Footer />
        </>
    )
}


export default UserDetails;