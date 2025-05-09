import { Select, SelectItem, SelectGroup, SelectContent, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ISearchField } from '@/types/search-field.interface';
import { Dispatch, SetStateAction } from 'react';

interface DataSearchSelectProps {
    setTypeOfSearchField: (typeOfSearchField: 'number' | 'string' | 'boolean' | null) => void;
    constantsSearchField: ISearchField[];
    filterFieldSearch: string;
    setFilterFieldSearch: Dispatch<SetStateAction<string>>;
}

export default function DataSearchSelect({
    setTypeOfSearchField,
    constantsSearchField,
    filterFieldSearch,
    setFilterFieldSearch,
}: DataSearchSelectProps) {
    const onSelectSearchFieldChange = (field: string) => {
        const fieldSearch = constantsSearchField.find((column) => column.field === field);
        const typeOfSearchField = fieldSearch?.typeOfSearchField ?? null;
        const searchField = fieldSearch?.field ?? null;
        setTypeOfSearchField(typeOfSearchField);
        setFilterFieldSearch(searchField || '');
    };
    return (
        <Select onValueChange={onSelectSearchFieldChange} defaultValue={filterFieldSearch}>
            <SelectTrigger>
                <SelectValue placeholder="Искать по" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    {constantsSearchField.map((column) => {
                        return (
                            <SelectItem value={column.field} key={column.field} className="capitalize">
                                {column.russianName}
                            </SelectItem>
                        );
                    })}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
}
