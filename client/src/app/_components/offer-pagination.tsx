import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination';

interface OfferPaginationProps {
    totalPages: number;
    currPage: number;
    setCurrPage: React.Dispatch<React.SetStateAction<number>>;
    setIsRefetch: React.Dispatch<React.SetStateAction<boolean>>;
}

export function OfferPagination({ totalPages, currPage, setCurrPage, setIsRefetch }: OfferPaginationProps) {
    const onPrevPage = () => {
        setCurrPage(currPage - 1);
        setIsRefetch(true);
    };
    const onNextPage = () => {
        setCurrPage(currPage + 1);
        setIsRefetch(true);
    };
    return (
        <>
            <Pagination className="justify-end my-4">
                <PaginationContent>
                    {currPage - 1 > 0 ? (
                        <PaginationItem onClick={onPrevPage}>
                            <PaginationPrevious />
                        </PaginationItem>
                    ) : null}
                    {currPage - 1 > 0 ? (
                        <PaginationItem>
                            <PaginationLink onClick={onPrevPage}>{currPage - 1}</PaginationLink>
                        </PaginationItem>
                    ) : null}
                    <PaginationItem>
                        <PaginationLink isActive>{currPage}</PaginationLink>
                    </PaginationItem>
                    {currPage + 1 <= totalPages ? (
                        <PaginationItem onClick={onNextPage}>
                            <PaginationLink>{currPage + 1}</PaginationLink>
                        </PaginationItem>
                    ) : null}
                    {currPage + 1 < totalPages ? (
                        <PaginationItem className="cursor-default">
                            <PaginationEllipsis />
                        </PaginationItem>
                    ) : null}
                    {currPage + 1 <= totalPages ? (
                        <PaginationItem onClick={onNextPage}>
                            <PaginationNext />
                        </PaginationItem>
                    ) : null}
                </PaginationContent>
            </Pagination>
        </>
    );
}
