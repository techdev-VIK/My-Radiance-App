import Header from "../../components/Header";

import Footer from "../../components/Footer";


const ShippingAddress = () => {


    return (
        <>
        
        <Header />
        <main className="container mt-5 main-content py-5">
        <h4 className="fw-semibold">Please Select Your Shipping Address: </h4>

        <div className="col-md-8">
            <hr />
        </div>


        <div className="row mt-4">
                  <div className="col-md-4">
                  <div className="card shadow mb-3">
                    <div className="card-title">
                    <h5 className="text-info fw-semibold">Primary Address:</h5>
                    </div>
                      <div className="card-body">
                      <div>{}</div>
                      </div>
                      <div className="d-flex justify-content-between">

                      

                      </div>
                      
                      
                    </div>
                  </div>
                  
                    
                   <div className="col-md-4">
                    <div className="card shadow">
                    <div className="card-title">
                    <h5 className="text-info fw-semibold">Secondary Address:</h5>
                    </div>
                      <div className="card-body">
                      <div>{}</div>
                      </div>

                      <div className="d-flex justify-content-between">

                      
                    </div>
                    </div>
                  </div>
                  </div>
        </main>
        <Footer />

        </>
    )
}


export default ShippingAddress;