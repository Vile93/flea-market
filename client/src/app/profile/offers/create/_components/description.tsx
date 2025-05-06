import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export function Description() {
    return (
        <div className="flex flex-col gap-2">
            <Label className="text-lg" htmlFor="description">
                Описание
            </Label>
            <Textarea id="description" />
        </div>
    );
}
