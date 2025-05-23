
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";


import useFetch from '../../useFetch';
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "./UserSlice";

function UserDetails() {

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [passwordToggle, setPasswordToggle] = useState(false);

  const [expanded, setExpanded] = useState(false);

  const [data, setData ] = useState(null);

  const { username } = useParams();

  const backendUrl = "https://radiance-backend.vercel.app";

  const {userData} = useSelector((state) => state.user)


  const {data: fetchedData, loading, error} = useFetch(`${backendUrl}/users/read/${username}`)


  useEffect(() => {
    if(fetchedData){
        setData(fetchedData);
        dispatch(setUserData(fetchedData))
    }
  }, [fetchedData, dispatch]);



  const handleEdit = () => {
    navigate(`/user/edit/${data._id}`)
  }

  const handleOrderHistory = () => {
    navigate(`/pages/user/order/history`)
  }

  const handleDelete = async () => {
    try {
      const response = await fetch(`${backendUrl}/delete/${username}`, {
        method: "DELETE",
        headers:{
          'Content-Type' : 'application/json'
        },
        body: JSON.stringify({ addressType: "secondaryAddress" })
      })

      if(!response.ok){
        throw new Error("Failed to Delete Address");
    }

    setData((prevData) => ({
      ...prevData, secondaryAddress: null
    }));
      
    } catch (error) {
      console.error("Error:", error);
    }  
  }


  const otherAddressDeleteHandler = async (username, address) => {
    try {
      const response = await fetch(`${backendUrl}/delete/otherAddress/${username}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ addressToRemove: address }),
      });
  
      if (response.ok) {
  
        setData((prevData) => {
          const updatedData = {
              ...prevData,
              otherAddresses: prevData.otherAddresses.filter((add) => add !== address),
          };
          dispatch(setUserData(updatedData));
          return updatedData;
      });

      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };
  

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <div
          className="spinner-border text-info"
          style={{ width: "5rem", height: "5rem" }}
          role="status"
        >
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
      
      <main className="container main-content">
        {data ? (
          <div className="row my-4">
            {/* Left Section: Profile Info */}
            <div className="col-md-4">
              <div className="card mt-3 shadow">
                <div className="card-body text-center">
                  <img
                    src={data.imageUrl ? data.imageUrl : `https://placehold.co/200?text=${data.firstName.slice(0,1)}${data.lastName.slice(0,1)}`}
                    alt="User"
                    className="img-fluid rounded-circle mb-4"
                    style={{ width: '200px', height: '200px', objectFit: 'cover' }}
                  />
                  <h4 className="fw-bold text-info mb-4">
                    {data.firstName} {data.lastName}
                  </h4>
                  <h6 className="fw-normal">@{data.username}</h6>

                </div>
              </div>

              <div className="card shadow mt-3">
                <div className="card-title">
                  <h5 className="text-info fw-semibold">My Orders:</h5>
                </div>

                <div className="card-body">
                  Check Your Orders History Here
                </div>
                
                <div className="d-flex justify-content-end">
                <button className="btn btn-sm btn-info text-light mt-3" onClick={handleOrderHistory}>My Orders</button>
                </div>
              </div>
            </div>


            

            {/* Right Section: User Details */}
            <div className="col-md-8">
              <div className="card mt-3 shadow">
                <div className="card-body">
                  <h5 className="card-title mb-4 text-info fs-3">
                    User Details
                  </h5>

                  <div className="row mb-3">
                    <div className="col-4">
                      <strong>Name:</strong>
                    </div>
                    <div className="col-8">
                      {data.firstName} {data.lastName}
                    </div>
                  </div>

                  <div className="row mb-3">
                    <div className="col-4">
                      <strong>username:</strong>
                    </div>
                    <div className="col-8">@{data.username}</div>
                  </div>

                  <div className="row mb-3">
                    <div className="col-4">
                      <strong>Phone Number:</strong>
                    </div>
                    <div className="col-8">{data.phoneNumber}</div>
                  </div>

                  <div className="row mb-3">
                    <div className="col-4">
                      <strong>Email Address:</strong>
                    </div>
                    <div className="col-8">{data.emailAddress}</div>
                  </div>

                  <div className="row mb-3">
                    <div className="col-4">
                        <strong>Password:</strong>
                    </div>
                    <div className="col-3">
                        <div className="form-control">
                        {!passwordToggle ? "********" : data.password}
                        </div>
                    </div>
                    <div className="col-2 me-auto">
                        <button
                        className="btn btn-outline-info"
                        onClick={() => setPasswordToggle(!passwordToggle)}
                        >
                        {!passwordToggle ? (
                            <i className="bi bi-eye-slash-fill text-dark"></i>
                        ) : (
                            <i className="bi bi-eye-fill text-dark"></i>
                        )}
                        </button>
                    </div>
                    </div>

                  
                  <button className="btn btn-sm btn-info text-light" onClick={handleEdit}>Edit Details</button>
                  
                </div>
              </div>
                  
                  <div className="row">
                  <div className="col-md-6 mt-3">
                  <div className="card shadow h-100">
                    <div className="card-title">
                    <h5 className="text-info fw-semibold">Primary Address:</h5>
                    </div>
                      <div className="card-body">
                      
                      <div>{data.primaryAddress}</div>
                      
                      </div>
                      <div className="d-flex justify-content-end">

                      <button className="clickbtn btn btn-sm btn-danger text-light disabled mt-3">Delete</button>

                      </div>
                      
                      
                    </div>
                  </div>
                  
                    
                    {data.secondaryAddress ? (<div className="col-md-6 mt-3">
                    <div className="card shadow h-100">
                    <div className="card-title">
                    <h5 className="text-info fw-semibold">Secondary Address:</h5>
                    </div>
                      <div className="card-body">

                      <div>{data.secondaryAddress}</div>
                      </div>

                      <div className="d-flex justify-content-end">

                      <button className="clickbtn btn btn-sm btn-danger text-light mt-3" data-bs-toggle="modal" data-bs-target="#deleteModal"  >Delete</button>

                      <div className="modal fade" id="deleteModal" aria-labelledby="deleteModalLabel" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered">
                          <div className="modal-content">
                            <div className="modal-header">
                              <h1 className="modal-title fs-5" id="deleteModalLabel">Confirm Delete</h1>
                              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                              Are you sure you want to delete this address?
                            </div>
                            <div className="modal-footer">
                              <button type="button" className="btn btn-outline-secondary" data-bs-dismiss="modal">Cancel</button>
                              <button type="button" className="clickbtn custom-btn-view" data-bs-dismiss="modal" onClick={handleDelete}>Confirm</button>
                            </div>
                          </div>
                        </div>
                      </div>
                      </div>
                    </div>
                    </div>) : (<div className="col-md-6 mt-3">
                      <div className="card h-100 d-flex justify-content-center align-items-center">
                  
                      <button className="clickbtn btn btn-outline-success fw-semibold" onClick={handleEdit}>+ Add Secondary Address</button>

                      </div></div>)}



                      {userData?.otherAddresses.length>0 && (
                        
                        <>
                          <div className="col-md-12 mt-4">
                          <hr />
                          <h4>Other Addresses:</h4>
                        </div>

                        {
                          userData?.otherAddresses.map((address, index) => (
                            <div key={index} className="col-md-6">
                            <div className="card shadow mt-3">
                              <div className="card-title">
                                <h5 className="text-info fw-semibold">Other Address {index + 1}:</h5>
                              </div>
                              <div className="card-body">
                                <div>{expanded ? address : `${address.slice(0,20)}`} {address.length > 20 && (
                                <span className="text-secondary btn-link" style={{ cursor: 'pointer', textDecoration: 'none' }} onClick={() => setExpanded((prev) => !prev)}>
                                  {expanded ? '(Show less)' : '...Show more'}
                                </span>
                              )
                            }</div>
                            </div>
                              


                              <div className="d-flex justify-content-end">
                              
                                <button
                                  className="clickbtn btn btn-sm btn-danger text-light mt-3"
                                  data-bs-toggle="modal"
                                  data-bs-target={`#deleteModal-${index}`}
                                >
                                  Delete
                                </button>
                                
                                <div className="modal fade" id={`deleteModal-${index}`} aria-labelledby="deleteModalLabel" aria-hidden="true">
                                  <div className="modal-dialog modal-dialog-centered">
                                    <div className="modal-content">
                                      <div className="modal-header">
                                        <h1 className="modal-title fs-5" id="deleteModalLabel">Confirm Delete</h1>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                      </div>
                                      <div className="modal-body">
                                        Are you sure you want to delete this address?
                                      </div>
                                      <div className="modal-footer">
                                        <button type="button" className="btn btn-outline-secondary" data-bs-dismiss="modal">
                                          Cancel
                                        </button>
                                        <button
                                          type="button"
                                          className="clickbtn custom-btn-view"
                                          data-bs-dismiss="modal"
                                          onClick={() => otherAddressDeleteHandler(username, address)}
                                        >
                                          Confirm
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            </div>
                          ))
                        }
                        </>
                        )}
                    </div>
                  </div>

                  </div>
        ) : (
          <div className="alert alert-danger">user not available</div>
        )}
      </main>
      
    </>
  );
}

export default UserDetails;
