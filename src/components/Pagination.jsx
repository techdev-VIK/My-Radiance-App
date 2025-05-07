import { useEffect, useState } from "react";


const Pagination = ({products, onPageChange}) => {

    const [currentPage, setCurrentPage] = useState(0);

    const PAGE_SIZE = 9;

    const numberOfPages = Math.ceil(products.length/PAGE_SIZE);


    const start = currentPage * PAGE_SIZE;

    const end  = start + PAGE_SIZE;


    const incrementHandler = () => {
        setCurrentPage(prev => prev + 1)
    }


    const decrementHandler = () => {
        setCurrentPage(prev => prev - 1)
    }



    useEffect(() => {
        onPageChange(start, end)
    }, [currentPage])

    const pageHandler = (page) => {
        setCurrentPage(page)
    }

    return(
        <div className="text-center my-3">
            <button className="btn btn-sm btn-info text-light mx-1" onClick={decrementHandler} disabled={currentPage === 0}>
            <i className="bi bi-chevron-left"></i>
            </button>


            {[...Array(numberOfPages).keys()].map((page) => (
                <button key={page} onClick={() => pageHandler(page)} className={`btn btn-sm mx-1 ${currentPage === page ? "btn-info text-light" : "btn-outline-info"}`}>
                    {page + 1}
                </button>
            ))}

            <button className="btn btn-sm btn-info text-light mx-1" onClick={incrementHandler} disabled={currentPage === numberOfPages - 1}>
            <i className="bi bi-chevron-right"></i>
            </button>
        </div>
    )
}

export default Pagination;