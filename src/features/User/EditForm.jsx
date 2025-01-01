import { useEffect, useState } from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { useDispatch, useSelector } from "react-redux";
import { createUser,updateUser } from "./UserSlice";
import { useLocation, useParams } from "react-router-dom";

const EditForm = () => {

    const{id} = useParams();

    const dispatch = useDispatch();

    const location = useLocation();

    const {user, status, error} = useSelector((state) => state.user);

    const currentUser = location.state || {};

    console.log(user)


    useEffect(() => {
        if(user){
            setFirstName(user.firstName);
            setLastName(user.lastName);
            setUsername(user.username);
            setPassword(user.password);
            setPhoneNumber(user.phoneNumber);
            setEmail(user.emailAddress);
            setAddress(user.address);
            setAlternateAddress(user.alternateAddress);
            setImageUrl(user.imageUrl);
        }
    }, [user])


    const [passwordToggle, setPasswordToggle] = useState(false);

    const [rePasswordToggle, setRePasswordToggle] = useState(false);

    const [passwordMatch, setPasswordMatch] = useState(true);

    const [firstName, setFirstName] = useState(currentUser.firstName || '')
    const [lastName, setLastName] = useState(currentUser.lastName || '')
    const [username, setUsername] = useState(currentUser.username || '')
    const [password, setPassword] = useState(currentUser.password || '')
    const [reEnterPassword, setReEnterPassword] = useState( '')
    const [phoneNumber, setPhoneNumber] = useState(currentUser.phoneNumber || '')
    const [email, setEmail] = useState(currentUser.emailAddress || '')
    const [address, setAddress] = useState(currentUser.address || '')
    const [alternateAddress, setAlternateAddress] = useState(currentUser.alternateAddress || '')
    const [imageUrl, setImageUrl] = useState(currentUser.imageUrl || '')



    const formHandler = (e) => {
        e.preventDefault();

        const userData = {
            _id: id,
            firstName,
            lastName,
            username,
            password,
            phoneNumber,
            emailAddress: email,
            address,
            alternateAddress,
            imageUrl
        }

        if(id){
            dispatch(updateUser(userData))
        }else{
            dispatch(createUser(userData));
        
            setFirstName('');
            setLastName('');
            setUsername('');
            setPassword('');
            setReEnterPassword('');
            setPhoneNumber('');
            setEmail('');
            setAddress('');
            setAlternateAddress('');
            setImageUrl('');
            
        }

       
    }


    const handleReEnterPasswordChange = (e) => {
        const value = e.target.value;

        setReEnterPassword(value);

        setPasswordMatch(value===password);
    }


    if (status === "loading") return <div className='d-flex justify-content-center align-items-center' style={{ height: "100vh" }}><div className="spinner-border text-info" style={{width: "5rem", height: "5rem"}} role="status">
  <span className="visually-hidden">Loading...</span>
</div></div>

//  const errorStatus = status==="error" && (<div className="alert alert-danger">{error}</div>)
    

    return (
        <>
            <Header />
            <main className="container main-content">
                <h3 className="my-4 fs-1">{id ? "Edit Details Form" :"Registration Form"}</h3>
                
                {/* {errorStatus} */}

                <form onSubmit={formHandler}>
                    <div className="col-md-4 mb-2">
                        <label htmlFor="firstName" className="form-label">First Name</label>
                        <input type="text" className="form-control border-info" id="firstName" onChange={(e) => setFirstName(e.target.value)} value={firstName} required />
                    </div>

                    <div className="col-md-4 mb-2">
                        <label htmlFor="lastName" className="form-label">Last Name</label>
                        <input type="text" className="form-control border-info" id="lastName" onChange={(e) => setLastName(e.target.value)} value={lastName} required />
                    </div>
                    <div className="col-md-4 mb-2">
                        <label htmlFor="username" className="form-label">Username</label>
                        <div className="input-group">
                            <span className="input-group-text" id="inputGroupPrepend">@</span>
                            <input type="text" className={`form-control border-info`} id="username" aria-describedby="inputGroupPrepend" onChange={(e) => setUsername(e.target.value)} value={username} required />
                        </div>
                    </div>

                    <div className="col-md-4 mb-2">
                        <label htmlFor="password" className="form-label">Password</label>
                        <div className="input-group">
                            <input 
                                type={passwordToggle ? "text" : "password"} 
                                className="form-control border-info" 
                                id="password"
                                onChange={(e) => setPassword(e.target.value)} value={password}  minLength={8}
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
                                    <i className="bi bi-eye-slash-fill text-dark"></i>
                                )}
                            </button>
                        </div>
                    </div>


                    <div className="col-md-4 mb-2">
                        <label htmlFor="password" className="form-label">Repeat Password</label>
                        <div className="input-group">
                            <input 
                                type={rePasswordToggle ? "text" : "password"} 
                                className={ `form-control border-info ${!passwordMatch && "is-invalid"}`} 
                                id="password"
                                onChange={handleReEnterPasswordChange} value={reEnterPassword} 
                                required 
                            />
                            <button
                                type="button"
                                className={`btn btn-outline-info ${!passwordMatch && "is-invalid"}`}
                                onClick={() => setRePasswordToggle(!rePasswordToggle)}
                            >
                                {rePasswordToggle ? (
                                    <i className="bi bi-eye-fill text-dark"></i>
                                ) : (
                                    <i className="bi bi-eye-slash-fill text-dark"></i>
                                )}
                            </button>
                        </div>
                    </div>

                    <div className="col-md-4 mb-2">
                        <label htmlFor="phoneNumber" className="form-label">Phone Number</label>
                        <input type="text" className={`form-control border-info`} id="phoneNumber" minLength={10} maxLength={10} onChange={(e) => {const value = e.target.value.replace(/[^0-9]/g, ""); setPhoneNumber(value)}} value={phoneNumber} required />
                    </div>

                    <div className="col-md-4 mb-2">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input type="email" className="form-control border-info" id="email" onChange={(e) => setEmail(e.target.value)} value={email} required />
                    </div>

                    <div className="col-md-4 mb-2">
                        <label htmlFor="address" className="form-label">Address</label>
                        <input type="text" className="form-control border-info" id="address" onChange={(e) => setAddress(e.target.value)} value={address} required />
                    </div>

                    <div className="col-md-4 mb-2">
                        <label htmlFor="altAddress" className="form-label">Alternate Address <span className="ms-1 fw-lighter">(optional)</span></label>
                        <input type="text" className="form-control border-info" id="altAddress" onChange={(e) => setAlternateAddress(e.target.value)} value={alternateAddress}/>
                    </div>

                    <div className="col-md-4 mb-4">
                        <label htmlFor="imageUrl" className="form-label">Image URL <span className="ms-1 fw-lighter">(optional)</span></label>
                        <input type="text" className="form-control border-info" id="imageUrl" onChange={(e) => setImageUrl(e.target.value)} value={imageUrl} />
                    </div>

                    <div className="col-12 mb-5">
                        <button className="btn btn-info text-light fw-semibold" type="submit" disabled={!passwordMatch}>{id ? "Update" : "Submit Form"}</button>
                    </div>
                </form>
            </main>
            <Footer />
        </>
    );
};

export default EditForm;
