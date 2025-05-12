import { Input } from '@/components/ui/input';
import { Search as SearchIcon } from 'lucide-react';

interface SearchProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Search({ className, ...props }: SearchProps) {
    return (
        <div className={`relative ${className ?? ''}`} {...props}>
            <Input className="pr-12 py-6!" placeholder="Поиск объявлений" />
            <SearchIcon className="absolute right-2 top-3" />
        </div>
    );
}
