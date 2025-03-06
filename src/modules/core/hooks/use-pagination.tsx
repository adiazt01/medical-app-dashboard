import { useState } from "react"

export const usePagination = (initialPage = 1, initialLimit = 4) => {
    const [page, setPage] = useState(initialPage)
    const [limit, setLimit] = useState(initialLimit)
    const [totalPages, setTotalPages] = useState(0)

    const handlePageChange = (page: number) => {
        setPage(page)
    }

    return {
        page,
        setPage,
        limit,
        setLimit,
        totalPages,
        setTotalPages,
        handlePageChange,
    }
}