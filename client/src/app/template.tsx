import { Header } from './_components/header';

export default function RootTemplate({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <Header />
            <div className="container mx-auto px-2">{children}</div>
        </>
    );
}
