

import useFetch from "../../useFetch";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser, userSlice } from "./UserSlice";

function UserDetails() {

  const [passwordToggle, setPasswordToggle] = useState(false);

  const { username } = useParams();

  const dispatch = useDispatch();

  const {user, status, error} = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchUser(username));
  }, [dispatch])



  if (status==="loading") {
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

  if (status==="error") {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <>
      
      <main className="container main-content">
        {user ? (
          <div className="row py-4">
            {/* Left Section: Profile Info */}
            <div className="col-md-4">
              <div className="card mt-5 shadow">
                <div className="card-body text-center">
                  <img
                    src="https://placehold.co/150?text=U"
                    alt="User"
                    className="img-fluid rounded-circle mb-3"
                  />
                  <h4 className="fw-bold text-info">
                    {user.firstName} {user.lastName}
                  </h4>
                  <p className="text-muted">@{user.username}</p>
                </div>
              </div>
            </div>

            {/* Right Section: User Details */}
            <div className="col-md-8">
              <div className="card mt-5 shadow">
                <div className="card-body">
                  <h5 className="card-title mb-4 text-info fs-3">
                    User Details
                  </h5>

                  <div className="row mb-3">
                    <div className="col-4">
                      <strong>Name:</strong>
                    </div>
                    <div className="col-8">
                      {user.firstName} {user.lastName}
                    </div>
                  </div>

                  <div className="row mb-3">
                    <div className="col-4">
                      <strong>Username:</strong>
                    </div>
                    <div className="col-8">@{user.username}</div>
                  </div>

                  <div className="row mb-3">
                    <div className="col-4">
                      <strong>Phone Number:</strong>
                    </div>
                    <div className="col-8">{user.phoneNumber}</div>
                  </div>

                  <div className="row mb-3 align-items-center">
                    <div className="col-4">
                        <strong>Password:</strong>
                    </div>
                    <div className="col-3">
                        <div>
                            
                        </div>
                        <div className="form-control">
                        {!passwordToggle ? "**************" : user.password}
                        </div>
                    </div>
                    <div className="col-2 me-auto">
                        <button
                        className="btn btn-outline-info"
                        onClick={() => setPasswordToggle(!passwordToggle)}
                        >
                        {!passwordToggle ? (
                            <i className="bi bi-eye-slash-fill tetx-danger"></i>
                        ) : (
                            <i className="bi bi-eye-fill text-dark"></i>
                        )}
                        </button>
                    </div>
                    </div>


                  <div className="row mb-3">
                    <div className="col-4">
                      <strong>Address:</strong>
                    </div>
                    <div className="col-8">{user.address}</div>
                  </div>

                  <div className="row mb-4">
                    <div className="col-4">
                      <strong>Alternate Address:</strong>
                    </div>
                    <div className="col-8">{user.alternateAddress}</div>
                  </div>

                  <button className="clickbtn custom-btn-view">Edit Details</button>
                </div>
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
