import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const OrderPlaced = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to home page after 5 seconds
    const timer = setTimeout(() => {
      navigate("/");
    }, 5000);

    // Cleanup the timer on component unmount
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        flexDirection: "column",
        textAlign: "center",
      }}
    >
      <h1 style={{ color: "#00AFEF", fontSize: "2.5rem" }}>Order Placed!</h1>
      <p style={{ marginTop: "1rem", fontSize: "1.2rem" }}>
        Thank you for shopping with us. You will be redirected to the home page
        in 5 seconds...
      </p>

      <div className="spinner-grow text-info" role="status">
        <span className="visually-hidden">Loading...</span>
        </div>


      <button className="clickbtn"
        onClick={() => navigate("/")}
        style={{
          marginTop: "2rem",
          padding: "0.8rem 2rem",
          backgroundColor: "#00AFEF",
          color: "white",
          border: "none",
          borderRadius: "5px",
          fontSize: "1rem",
          cursor: "pointer",
        }}
      >
        Go to Home Page
      </button>
    </div>
  );
};

export default OrderPlaced;
