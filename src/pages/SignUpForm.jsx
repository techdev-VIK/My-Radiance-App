import { useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";

const SignUpForm = () => {
    const [passwordToggle, setPasswordToggle] = useState(false);

    return (
        <>
            <Header />
            <main className="container main-content">
                <h3 className="my-4 fs-1">Registration Form</h3>
                <form className="">
                    <div className="col-md-4 mb-2">
                        <label htmlFor="firstName" className="form-label">First Name</label>
                        <input type="text" className="form-control border-info" id="firstName" required />
                    </div>
                    <div className="col-md-4 mb-2">
                        <label htmlFor="lastName" className="form-label">Last Name</label>
                        <input type="text" className="form-control border-info" id="lastName" required />
                    </div>
                    <div className="col-md-4 mb-2">
                        <label htmlFor="username" className="form-label">Username</label>
                        <div className="input-group">
                            <span className="input-group-text text-info" id="inputGroupPrepend">@</span>
                            <input type="text" className="form-control border-info" id="username" aria-describedby="inputGroupPrepend" required />
                        </div>
                    </div>

                    <div className="col-md-4 mb-2">
                        <label htmlFor="password" className="form-label">Password</label>
                        <div className="input-group">
                            <input 
                                type={passwordToggle ? "text" : "password"} 
                                className="form-control border-info" 
                                id="password" 
                                required 
                            />
                            <button
                                type="button"
                                className="btn btn-outline-info"
                                onClick={() => setPasswordToggle(!passwordToggle)}
                            >
                                {passwordToggle ? (
                                    <i className="bi bi-eye-fill text-dark"></i>
                                ) : (
                                    <i className="bi bi-eye-slash-fill text-info"></i>
                                )}
                            </button>
                        </div>
                    </div>

                    <div className="col-md-4 mb-2">
                        <label htmlFor="phoneNumber" className="form-label">Phone Number</label>
                        <input type="text" className="form-control border-info" id="phoneNumber" required />
                    </div>

                    <div className="col-md-4 mb-2">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input type="email" className="form-control border-info" id="email" required />
                    </div>

                    <div className="col-md-4 mb-2">
                        <label htmlFor="address" className="form-label">Address</label>
                        <input type="text" className="form-control border-info" id="address" required />
                    </div>

                    <div className="col-md-4 mb-2">
                        <label htmlFor="altAddress" className="form-label">Alternate Address <span className="ms-1 fw-lighter">(optional)</span></label>
                        <input type="text" className="form-control border-info" id="altAddress" />
                    </div>

                    <div className="col-md-4 mb-4">
                        <label htmlFor="imageUrl" className="form-label">Image URL <span className="ms-1 fw-lighter">(optional)</span></label>
                        <input type="text" className="form-control border-info" id="imageUrl" />
                    </div>

                    <div className="col-12 mb-5">
                        <button className="btn btn-info text-light fw-semibold" type="submit">Submit Form</button>
                    </div>
                </form>
            </main>
            <Footer />
        </>
    );
};

export default SignUpForm;
