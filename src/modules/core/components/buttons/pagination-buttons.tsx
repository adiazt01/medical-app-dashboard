import { Pagination, PaginationContent, PaginationItem, PaginationLink } from "@/components/ui/pagination";

interface IPaginationButtons {
    page: number;
    setPage: (page: number) => void;
    totalPages: number;
}

export function PaginationButtons({
    page,
    setPage,
    totalPages,
}: IPaginationButtons) {
    return (
        <Pagination>
            <PaginationContent>
                {Array.from({ length: totalPages }, (_, index) => (
                    <PaginationItem key={index}>
                        <PaginationLink onClick={() => setPage(index + 1)} isActive={index + 1 === page}>
                            {index + 1}
                        </PaginationLink>
                    </PaginationItem>
                ))}
            </PaginationContent>
        </Pagination>
    )
}