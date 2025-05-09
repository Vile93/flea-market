import React from 'react';
import { headers } from 'next/headers';
import { PANEL_TITLES } from '@/constants/panel.constant';
import { PanelReloadTableProvider } from '@/contexts/panel-reload-table.context';

export default async function PanelLayout({ children }: { children: React.ReactNode }) {
    const headersList = await headers();
    const pathname = headersList.get('x-pathname');
    return (
        <PanelReloadTableProvider>
            <h1 className="text-2xl font-bold">{PANEL_TITLES.find((title) => title.path === pathname)?.title}</h1>
            <div className="my-4">{children}</div>
        </PanelReloadTableProvider>
    );
}
