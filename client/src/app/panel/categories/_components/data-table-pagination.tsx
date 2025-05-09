import { SelectItem } from '@/components/ui/select';

import { SelectContent } from '@/components/ui/select';

import { Select, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ChevronLeft, ChevronRight, ChevronsRight } from 'lucide-react';
import { ChevronsLeft } from 'lucide-react';

import { Button } from '@/components/ui/button';

interface DataTablePaginationProps {
    pageCount: number;
    pageInfo: { pageIndex: number; pageSize: number };
    setPageInfo: (pageInfo: { pageIndex: number; pageSize: number }) => void;
}

export function DataTablePagination({ pageCount, pageInfo, setPageInfo }: DataTablePaginationProps) {
    return (
        <div className="flex items-center justify-between px-2 mt-4">
            <div className="flex items-center flex-wrap gap-2 space-x-6 lg:space-x-8">
                <div className="flex items-center space-x-2">
                    <p className="text-sm font-medium">Строк на странице</p>
                    <Select
                        value={`${pageInfo.pageSize}`}
                        onValueChange={(value) => {
                            setPageInfo({ ...pageInfo, pageSize: Number(value) });
                        }}
                    >
                        <SelectTrigger className="h-8 w-[70px]">
                            <SelectValue placeholder={pageInfo.pageSize} />
                        </SelectTrigger>
                        <SelectContent side="top">
                            {[10, 20, 30, 40, 50].map((pageSize) => (
                                <SelectItem key={pageSize} value={`${pageSize}`}>
                                    {pageSize}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <div className="flex items-center justify-center text-sm font-medium">
                    Страница {pageInfo.pageIndex + 1} из {pageCount}
                </div>
                <div className="flex items-center space-x-2">
                    <Button
                        variant="outline"
                        className="hidden h-8 w-8 p-0 lg:flex"
                        onClick={() => setPageInfo({ ...pageInfo, pageIndex: 0 })}
                        disabled={pageInfo.pageIndex === 0}
                    >
                        <span className="sr-only">Первая страница</span>
                        <ChevronsLeft />
                    </Button>
                    <Button
                        variant="outline"
                        className="h-8 w-8 p-0"
                        onClick={() => setPageInfo({ ...pageInfo, pageIndex: pageInfo.pageIndex - 1 })}
                        disabled={pageInfo.pageIndex === 0}
                    >
                        <span className="sr-only">Предыдущая страница</span>
                        <ChevronLeft />
                    </Button>
                    <Button
                        variant="outline"
                        className="h-8 w-8 p-0"
                        onClick={() => setPageInfo({ ...pageInfo, pageIndex: pageInfo.pageIndex + 1 })}
                        disabled={pageInfo.pageIndex === pageCount - 1}
                    >
                        <span className="sr-only">Следующая страница</span>
                        <ChevronRight />
                    </Button>
                    <Button
                        variant="outline"
                        className="hidden h-8 w-8 p-0 lg:flex"
                        onClick={() => setPageInfo({ ...pageInfo, pageIndex: pageCount - 1 })}
                        disabled={pageInfo.pageIndex === pageCount - 1}
                    >
                        <span className="sr-only">Последняя страница</span>
                        <ChevronsRight />
                    </Button>
                </div>
            </div>
        </div>
    );
}
