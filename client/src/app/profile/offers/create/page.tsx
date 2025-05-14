import { getOfferCategoriesAndLocations } from '@/api/server.api';
import { Nav } from '@/app/profile/offers/_components/nav';
import { CreateForm } from '@/app/profile/offers/create/_components/create-form';
import { Title } from '@/components/title';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

export default async function CreateOffer() {
    const data = await getOfferCategoriesAndLocations();
    return (
        <>
            <Card className="mt-16 mb-4">
                <CardHeader>
                    <div className="flex justify-between">
                        <Title name="Создать объявление" />
                        <Nav />
                    </div>
                </CardHeader>
                <CardContent>
                    <CreateForm categories={data.categories} locations={data.locations} />
                </CardContent>
            </Card>
        </>
    );
}
