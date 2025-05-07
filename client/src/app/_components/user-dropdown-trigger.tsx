import { Button } from '@/components/ui/button';
import { DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { User } from 'lucide-react';

export function UserDropdownTrigger() {
    return (
        <DropdownMenuTrigger asChild>
            <Button className="cursor-pointer" variant="outline" size="icon">
                <User className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:text-white" />
            </Button>
        </DropdownMenuTrigger>
    );
}
