import { useEffect, useState } from "react";


const Pagination = ({products, onPageChange}) => {

    const [currentPage, setCurrentPage] = useState(0);

    const PAGE_SIZE = 9;

    const numberOfPages = Math.ceil(products.length/PAGE_SIZE);


    const start = currentPage * PAGE_SIZE;

    const end  = start + PAGE_SIZE;


    useEffect(() => {
        onPageChange(start, end)
    }, [currentPage])

    const pageHandler = (page) => {
        setCurrentPage(page)
    }

    return(
        <div className="text-center my-3">
            <button className="btn btn-sm btn-outline-info mx-1">
                ◀️
            </button>


            {[...Array(numberOfPages).keys()].map((page) => (
                <button key={page} onClick={() => pageHandler(page)} className={`btn btn-sm mx-1 ${currentPage === page ? "btn-info text-light" : "btn-outline-info"}`}>
                    {page}
                </button>
            ))}

            <button className="btn btn-sm btn-outline-info mx-1">
                ▶️
            </button>
        </div>
    )
}

export default Pagination;