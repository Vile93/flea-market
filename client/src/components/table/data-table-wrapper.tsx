import { DataTable } from '@/components/table/data-table';
import { ISearchField } from '@/types/search-field.interface';
import {
    ColumnDef,
    getFilteredRowModel,
    PaginationState,
    SortingState,
    useReactTable,
    VisibilityState,
} from '@tanstack/react-table';

import { getCoreRowModel, getPaginationRowModel, getSortedRowModel } from '@tanstack/react-table';
import { useContext, useEffect, useMemo, useState } from 'react';
import { Dispatch, SetStateAction } from 'react';
import { DataTablePagination } from '@/components/table/data-table-pagination';
import DataTableFilter from '@/components/table/data-table-filter';
import { IQueryPanelTable } from '@/types/query.interface';
import { useFetch } from '@/hooks/use-fetch.hook';
import { Spinner } from '@/components/loader';
import { PANEL_TABLE_PAGINATION } from '@/constants/panel.constant';
import { PanelReloadTableContext } from '@/contexts/panel-reload-table.context';
import { PANEL_RELOAD_TABLE_REASON } from '@/constants/panel-reload-table-reason.constant';

interface DataTableWrapperProps<TData, TValue, Y> {
    fetcher: ReturnType<typeof useFetch<{ data: Y[]; totalCount: number }, IQueryPanelTable>>;
    data: TData[];
    columns: ColumnDef<TData, TValue>[];
    totalCount: number;
    constantsSearchField: ISearchField[];
    addModal?: React.ReactElement<{ setIsOpenAddModal: Dispatch<SetStateAction<boolean>> }>;
    isDisabledAddButton?: boolean;
}

export default function DataTableWrapper<TData, TValue, Y>({
    fetcher,
    data,
    columns,
    totalCount,
    constantsSearchField,
    addModal,
    isDisabledAddButton,
}: DataTableWrapperProps<TData, TValue, Y>) {
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

    const [pageInfo, setPageInfo] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: PANEL_TABLE_PAGINATION.START_TAKE,
    });
    const panelReloadTableContext = useContext(PanelReloadTableContext);
    const [sorting, setSorting] = useState<SortingState>([]);
    const [filterFieldSearch, setFilterFieldSearch] = useState<string>('');
    const [filterValueSearch, setFilterValueSearch] = useState<string>('');
    const [typeOfSearchField, setTypeOfSearchField] = useState<'number' | 'string' | 'boolean' | null>(null);
    const [isStartedSearch, setIsStartedSearch] = useState<boolean>(false);
    const pageCount = useMemo(() => {
        if (fetcher.statusCode && fetcher.statusCode >= 400 && fetcher.isCompleted) {
            return 1;
        }
        if (typeof fetcher.data?.totalCount === 'number') {
            return Math.ceil(fetcher.data.totalCount / pageInfo.pageSize || 1);
        }
        return Math.ceil(totalCount / pageInfo.pageSize) || 1;
    }, [fetcher.data?.totalCount, fetcher.statusCode, fetcher.isCompleted, pageInfo.pageSize, totalCount]);
    const [isIgnorePageChange, setIsIgnorePageChange] = useState<boolean>(false);
    const [isReloadFetch, setIsReloadFetch] = useState<boolean>(false);
    const newArgsForData: IQueryPanelTable = useMemo(() => {
        const isValue = !!filterFieldSearch && !!filterValueSearch;
        const isOrder = !!sorting[0]?.id;
        return {
            take: pageInfo.pageSize,
            skip: pageInfo.pageIndex * pageInfo.pageSize,
            orderField: isOrder ? sorting[0]?.id : null,
            orderDirection: isOrder ? (sorting[0]?.desc ? 'desc' : 'asc') : null,
            searchField: isValue ? filterFieldSearch : null,
            searchValue: isValue ? filterValueSearch : null,
            typeOfSearchField: isValue ? typeOfSearchField : null,
        };
    }, [pageInfo, sorting, filterFieldSearch, filterValueSearch, typeOfSearchField]);
    const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFilterValueSearch(event.target.value);
    };
    const table = useReactTable({
        data,
        columns,
        pageCount,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            sorting,
            columnVisibility,
            pagination: {
                pageIndex: 0,
                pageSize: pageInfo.pageSize,
            },
        },
    });
    useEffect(() => {
        if (panelReloadTableContext?.reloadData.isReload) {
            setIsReloadFetch(true);
            if (data.length === 1 && panelReloadTableContext.reloadData.reason === PANEL_RELOAD_TABLE_REASON.DELETE) {
                setPageInfo({ ...pageInfo, pageIndex: pageInfo.pageIndex - 1 > 0 ? pageInfo.pageIndex - 1 : 0 });
                setIsIgnorePageChange(true);
            }
        }
    }, [panelReloadTableContext?.reloadData.isReload]);
    useEffect(() => {
        if (fetcher.newArgs) {
            fetcher.fetchData(true);
        }
    }, [fetcher.newArgs]);
    useEffect(() => {
        if (isReloadFetch) {
            fetcher.setNewArgs([newArgsForData]);
        }
    }, [isReloadFetch]);
    useEffect(() => {
        if (isReloadFetch) {
            setIsReloadFetch(false);
        }
    }, [isReloadFetch]);
    useEffect(() => {
        if (!isIgnorePageChange) {
            console.log('no ignore');
            if ((!fetcher.newArgs && pageInfo.pageIndex !== 0) || fetcher.newArgs) {
                fetcher.setNewArgs([newArgsForData]);
            }
        }
    }, [pageInfo.pageIndex]);
    useEffect(() => {
        if ((!fetcher.newArgs && pageInfo.pageSize !== PANEL_TABLE_PAGINATION.START_TAKE) || fetcher.newArgs) {
            fetcher.setNewArgs([{ ...newArgsForData, skip: 0 }]);
            setPageInfo({ ...pageInfo, pageIndex: 0 });
            setIsIgnorePageChange(true);
        }
    }, [pageInfo.pageSize]);
    useEffect(() => {
        if (isIgnorePageChange) {
            setIsIgnorePageChange(false);
        }
    }, [isIgnorePageChange]);
    useEffect(() => {
        if (pageInfo.pageIndex + 1 > pageCount) {
            setPageInfo({ ...pageInfo, pageIndex: pageCount - 1 > 0 ? pageCount - 1 : 0 });
        }
    }, [pageCount]);
    useEffect(() => {
        if (sorting[0]?.id) {
            fetcher.setNewArgs([newArgsForData]);
        }
    }, [sorting]);
    useEffect(() => {
        if (isStartedSearch) {
            fetcher.setNewArgs([newArgsForData]);
            setIsStartedSearch(false);
        }
    }, [isStartedSearch]);

    console.log(pageInfo, 'pageInfo');
    if (fetcher.isLoading) {
        return <Spinner size={'large'} />;
    }
    return (
        <>
            <DataTableFilter
                addModal={addModal}
                table={table}
                filterValueSearch={filterValueSearch}
                onInputChange={onInputChange}
                setIsStartedSearch={setIsStartedSearch}
                filterFieldSearch={filterFieldSearch}
                setFilterFieldSearch={setFilterFieldSearch}
                setTypeOfSearchField={setTypeOfSearchField}
                constantsSearchField={constantsSearchField}
                isDisabledAddButton={isDisabledAddButton}
            />
            <DataTable table={table} columns={columns} />
            <DataTablePagination pageCount={pageCount} pageInfo={pageInfo} setPageInfo={setPageInfo} />
        </>
    );
}
