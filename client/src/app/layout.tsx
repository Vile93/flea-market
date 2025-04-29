import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { Header } from '@/app/_components/header';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Zorka',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ru">
            <body className={`${inter.className} antialiased`}>
                <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
                    <Header />
                    <main className="container mx-auto px-2">{children}</main>
                </ThemeProvider>
            </body>
        </html>
    );
}
