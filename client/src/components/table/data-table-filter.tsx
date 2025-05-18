import DataSearchSelect from '@/components/table/data-search-select';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table } from '@tanstack/react-table';
import { ISearchField } from '@/types/search-field.interface';
import React, { SetStateAction, useState } from 'react';
import { Dispatch } from 'react';
import DataTableVisibility from '@/components/table/data-table-visibility';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface DataTableFilterProps<TData> {
    table: Table<TData>;
    filterFieldSearch: string;
    setFilterFieldSearch: Dispatch<SetStateAction<string>>;
    setTypeOfSearchField: Dispatch<SetStateAction<'number' | 'string' | 'boolean' | null>>;
    constantsSearchField: ISearchField[];
    setIsStartedSearch: Dispatch<SetStateAction<boolean>>;
    onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    filterValueSearch: string;
    addModal?: React.ReactElement<{ setIsOpenAddModal: Dispatch<SetStateAction<boolean>> }>;
    isDisabledAddButton?: boolean;
}

export default function DataTableFilter<TData>({
    table,
    filterFieldSearch,
    setFilterFieldSearch,
    setTypeOfSearchField,
    constantsSearchField,
    setIsStartedSearch,
    onInputChange,
    filterValueSearch,
    addModal,
    isDisabledAddButton,
}: DataTableFilterProps<TData>) {
    const [isOpenAddModal, setIsOpenAddModal] = useState(false);
    return (
        <>
            <div className="flex flex-wrap justify-between gap-2 items-center py-4">
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        setIsStartedSearch(true);
                    }}
                >
                    <div className="flex flex-wrap gap-2">
                        <div>
                            <Input
                                placeholder={'Поиск...'}
                                onChange={onInputChange}
                                value={filterValueSearch}
                                className="max-w-sm"
                            />
                        </div>
                        <div>
                            <DataSearchSelect
                                filterFieldSearch={filterFieldSearch}
                                setFilterFieldSearch={setFilterFieldSearch}
                                setTypeOfSearchField={setTypeOfSearchField}
                                constantsSearchField={constantsSearchField}
                            />
                        </div>
                        <Button className="cursor-pointer" onClick={() => setIsStartedSearch(true)} type="button">
                            Найти
                        </Button>
                    </div>
                </form>

                <div className="flex gap-2">
                    {!isDisabledAddButton ? (
                        <Button className="cursor-pointer" onClick={() => setIsOpenAddModal(true)}>
                            Добавить
                        </Button>
                    ) : null}
                    <DataTableVisibility table={table} />
                </div>
                {addModal ? (
                    <Dialog open={isOpenAddModal} onOpenChange={setIsOpenAddModal}>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle className="text-xl">Добавить</DialogTitle>
                            </DialogHeader>
                            <DialogDescription>
                                <div className="mt-4">{React.cloneElement(addModal, { setIsOpenAddModal })}</div>
                            </DialogDescription>
                        </DialogContent>
                    </Dialog>
                ) : null}
            </div>
        </>
    );
}
