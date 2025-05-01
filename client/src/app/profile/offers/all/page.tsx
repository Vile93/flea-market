import { Header } from '@/app/_components/header';
import { Nav } from '@/app/profile/offers/_components/nav';
import { Offer } from '@/app/profile/offers/all/_components/offer';
import { Title } from '@/components/title';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

export default function UserOffers() {
    return (
        <>
            <Header />
            <Card className="mt-16 mb-4">
                <CardHeader>
                    <div className="flex gap-2 justify-between">
                        <Title name="Мои объявления" />
                        <Nav />
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col gap-2">
                        <Offer />
                        <Offer />
                        <Offer />
                        <Offer />
                    </div>
                </CardContent>
            </Card>
        </>
    );
}
