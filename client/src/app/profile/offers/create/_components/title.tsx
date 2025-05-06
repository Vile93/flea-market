import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export function Title() {
    return (
        <div className="flex flex-col gap-2">
            <Label className="text-lg" htmlFor="title">
                Заголовок
            </Label>
            <Input id="title" />
        </div>
    );
}
