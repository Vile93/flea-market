import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

export function Price() {
    return (
        <Card className={`bg-transparent my-2`}>
            <CardContent>
                <div className="flex gap-2">
                    <div className="relative">
                        <div className="absolute top-2 text-sm left-4 text-md select-none pointer-events-none">От</div>
                        <Input className="pl-10" type="number" />
                    </div>
                    <div className="relative">
                        <div className="absolute top-2 text-sm left-4 text-md select-none pointer-events-none">До</div>
                        <Input className="pl-10" type="number" />
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
