import React, { useEffect, useState } from "react";
import { Fade, Pagination } from "react-bootstrap";
import "./Paginator.less";
import IPaginatorProps from "./IPaginator";

const Paginator = ({
    elements,
    currentPage,
    elementsPerPage,
    onPageChange,
    resetKey
}: IPaginatorProps) => {
    const [show, setShow] = useState<boolean>(false)
    const [page, setPage] = useState<number>(currentPage || 0)

    const elemsPerPage = elementsPerPage || 10
    const totalPages = Math.ceil(elements.length / elemsPerPage)
    const firstPage = 0
    const lastPage = totalPages - 1
    const nextPage = page + 1
    const previousPage = page - 1


    const hasMultiplePages = totalPages > 1
    const hasNextPage = page < totalPages - 1 && hasMultiplePages
    const hasPreviousPage = page > 0 && hasMultiplePages
    const hasLastPage = page < lastPage
    const hasFirstPage = page > firstPage

    const pageToString = (page: number) => page + 1
    
    const getElementsForPage = () => {
        let pageNumber = page
        
        if (pageNumber < 0) {
            pageNumber = 0
        } 
    
        return elements.slice(pageNumber * elemsPerPage, (pageNumber + 1) * elemsPerPage)
    }

    useEffect(
        () => {
            setShow(true)
            onPageChange(getElementsForPage(), page)
            return () => setShow(false)
        }, []
    )

    useEffect(
        () => onPageChange(getElementsForPage(), page),
        [page, elements]
    )

    useEffect(
        () => setPage(0),
        [resetKey]
    )
    
    return (
        <div className="paginator_root">
        { hasMultiplePages && 
            <Fade in={show}>
                <Pagination className="paginator_pagination-block">
                    { hasFirstPage && 
                    <Pagination.First 
                        onClick={() => setPage(firstPage)}
                    >
                    </Pagination.First>
                    }

                    { hasPreviousPage && 
                    <Pagination.Prev
                        onClick={() => setPage(previousPage)}
                    >
                    </Pagination.Prev>
                    }

                    <Pagination.Ellipsis active>
                        {pageToString(page)}
                    </Pagination.Ellipsis>
                    
                    { hasNextPage && 
                    <Pagination.Next
                        onClick={() => setPage(nextPage)}
                    >
                    </Pagination.Next>
                    }

                    { hasLastPage && 
                    <Pagination.Last
                        onClick={() => setPage(lastPage)}
                    >
                    </Pagination.Last>
                    }
                </Pagination>
            </Fade>
        }
        </div>
    )
}

export default Paginator;