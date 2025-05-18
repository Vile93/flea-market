import { Input } from '@/components/ui/input';
import { Search as SearchIcon } from 'lucide-react';
import { ChangeEvent } from 'react';

interface SearchProps extends React.HTMLAttributes<HTMLDivElement> {
    search: string;
    setSearch: React.Dispatch<React.SetStateAction<string>>;
}

export function Search({ className, search, setSearch, ...props }: SearchProps) {
    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };
    return (
        <div className={`relative ${className ?? ''}`} {...props}>
            <Input className="pr-12 py-6!" placeholder="Поиск объявлений" value={search} onChange={onChange} />
            <SearchIcon className="absolute right-2 top-3" />
        </div>
    );
}
