import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function NotFound() {
    return (
        <section>
            <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
                <div className="mx-auto max-w-screen-sm text-center">
                    <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary-600 text-primary-500">
                        404
                    </h1>
                    <p className="mb-4 text-3xl tracking-tight font-bold md:text-4xl">Чего-то не хватает.</p>
                    <p className="mb-4 text-lg font-light">
                        Извините, страница не найдена. Но на главной странице вас ждёт много интересного!
                    </p>
                    <Link href="/">
                        <Button className="cursor-pointer">Вернуться домой</Button>
                    </Link>
                </div>
            </div>
        </section>
    );
}
