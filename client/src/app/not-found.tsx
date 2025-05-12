import NotFound from '@/components/not-found';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Страница не найдена',
    description: 'Страница не найдена',
};

export default function NotFoundPage() {
    return (
        <>
            <NotFound />
        </>
    );
}
