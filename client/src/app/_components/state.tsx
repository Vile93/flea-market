import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export function State() {
    return (
        <Card className={`bg-transparent`}>
            <CardContent>
                <div className="flex gap-4">
                    <Button className="cursor-pointer bg-transparent text-black dark:text-white hover:bg-gray-100 dark:hover:bg-transparent">
                        новое
                    </Button>
                    <Button className="cursor-pointer bg-transparent text-black dark:text-white hover:bg-gray-100 dark:hover:bg-transparent">
                        б/у
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
