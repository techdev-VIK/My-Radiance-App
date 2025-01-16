import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useFetch from "../../useFetch";
import { useEffect } from "react";
import { setUserData } from "../User/UserSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";


const ShippingAddressComp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const username = localStorage.getItem("username");
  const backendUrl = "https://radiance-backend.vercel.app";

  // Fetch user data
  const { data, loading, error } = useFetch(`${backendUrl}/users/read/${username}`);

  
  const {userData} = useSelector((state) => state.user)


  const [selectedAddress, setSelectedAddress] = useState("");

  const [otherAddressForm, setOtherAddressForm] = useState(false);

  const [getOtherAddress, setOtherAddress] = useState('');

  const [isFormSubmitted, setIsFormSubmitted] = useState(false);


  useEffect(() => {
    if (data) {
      dispatch(setUserData(data));

      if (data.primaryAddress) {
        setSelectedAddress(data.primaryAddress);
      }
    }
  }, [data, dispatch]);

  const handleCardClick = (address) => {
    setSelectedAddress(address);
  };


   const handleOrderNow = () => {

      navigate("/pages/payAndOrder", {state: {shippingAddress: selectedAddress}});
          
    }



    const otherAddressHandler = () => {
      setOtherAddressForm(true);
    }


    const cancelOtherAddressForm = () => {
      setOtherAddressForm(false)
    }


    const formHandlerOtherAddress = async(e) => {
      e.preventDefault();

      try {
        const response = await axios.post(`${backendUrl}/add/otherAddress/${username}`, {
          username,
          newAddress: getOtherAddress,
        })

        if (response.data) {
          // Fetch updated user data
          const updatedData = await axios.get(`${backendUrl}/users/read/${username}`);
          

          dispatch(setUserData(updatedData.data));
          setSelectedAddress(updatedData.data.otherAddresses.at(-1));
    
          setIsFormSubmitted(true);
          // Reset form state
          setOtherAddressForm(false);
          setOtherAddress("");
        }
        
        
      } catch (error) {
        console.error('Error in adding the address', error);
      }

    }



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

  return (
    <>
      <main className="container mt-5 main-content py-5">
        <h4 className="fw-semibold">Please Select Your Shipping Address:</h4>
        <div className="col-md-6">
          <hr />
        </div>

        <div className="row mt-4">
          {/* Address Selection Section */}
          <div className="col-md-8">
            <div className="row">
              <div className="col-md-8">
                {data && (
                  <div
                    className={`card mb-3 ${selectedAddress === data.primaryAddress ? "shadow-box" : ""}`}
                    onClick={() => handleCardClick(data.primaryAddress)}
                    style={{ cursor: "pointer" }}
                  >
                    <div className="card-title">
                      <h5 className="text-info fw-semibold">Primary Address:</h5>
                    </div>
                    <div className="card-body">
                      <div>{data.primaryAddress}</div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="row">
              <div className="col-md-8">
                {data && data.secondaryAddress && data.secondaryAddress !== data.primaryAddress && (
                  <div
                    className={`card ${selectedAddress === data.secondaryAddress ? "shadow-box" : ""}`}
                    onClick={() => handleCardClick(data.secondaryAddress)}
                    style={{ cursor: "pointer" }}
                  >
                    <div className="card-title">
                      <h5 className="text-info fw-semibold">Secondary Address:</h5>
                    </div>
                    <div className="card-body">
                      <div>{data.secondaryAddress}</div>
                    </div>
                  </div>
                )}
              </div>
            </div>


            <h4 className="fw-semibold mt-4">Ship To Different Address?</h4>
            <div className="col-md-8">
              <hr />
            </div>


            <div className="row">
              <div className="col-md-6 mt-3">
                <button className="btn btn-outline-success fw-semibold clickbtn" onClick={otherAddressHandler}>+ Add Address</button>
              </div>
            </div>
              
              {otherAddressForm && <div className="row">
                <div className="col-md-8 mt-4">
                  <form onSubmit={formHandlerOtherAddress}>
                    <textarea className="form-control" onChange={(e) => setOtherAddress(e.target.value)} value={getOtherAddress} required >

                    </textarea>
                    
                    <div className="d-flex justify-content-between mt-3">
                      <button type="submit" className="btn btn-sm btn-outline-success">Submit</button>
                      <button className="btn btn-sm btn-outline-danger" onClick={cancelOtherAddressForm}>Cancel</button>
                    </div>
                  </form>
              </div>
              </div>}
              

              <div className="col-md-8">
              {isFormSubmitted && userData?.otherAddresses?.slice(-1).map((address, index) => (
                <div
                  key={index}
                  className={`card ${selectedAddress === address ? "shadow-box" : ""} mt-3`}
                  onClick={() => handleCardClick(address)}
                  style={{ cursor: "pointer" }}
                >
                  <div className="card-title">
                  <h5 className="text-info fw-semibold">Shipping Address:</h5>
                  </div>
                  <div className="card-body">
                    {address}
                  </div>
                </div>
              ))}
              </div>
              

          </div>

          {/* Shipping Details Card */}

          {data && (<div className="col-md-4">
            <div className="card shadow" style={{ position: "sticky", top: "100px" }}>
              <div className="card-header text-white bg-color">
                <h5 className="mb-0">Shipping Details</h5>
              </div>
              <div className="card-body">
                <div className="mb-3">
                  <strong>Deliver To:</strong>
                  <div>
                    {data.firstName} {data.lastName}
                  </div>
                </div>
                <div className="mb-3">
                  <strong>Contact:</strong>
                  <div>{data.phoneNumber || "-"}</div>
                </div>
                <div className="mb-3">
                  <strong>Email Address:</strong>
                  <div>{data.emailAddress || "-"}</div>
                </div>
                <div className="mb-3">
                  <strong>Shipping Address:</strong>
                  <div>{selectedAddress || "No address selected"}</div>
                </div>
              </div>
              <div className="card-footer text-center">
                <button className="btn btn-info text-light w-100" onClick={handleOrderNow}>
                  Order Now
                </button>
              </div>
            </div>
          </div>)}
          
        </div>
      </main>
    </>
  );
};

export default ShippingAddressComp;
