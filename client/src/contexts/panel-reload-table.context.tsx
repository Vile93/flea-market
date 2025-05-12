'use client';

import { createContext, useEffect, useState } from 'react';

type PanelReloadTableContextType = {
    reload: (reason?: string) => void;
    reloadData: {
        isReload: boolean;
        reason?: string | null;
    };
};

export const PanelReloadTableContext = createContext<PanelReloadTableContextType | null>(null);

interface PanelReloadTableContextProps {
    children: React.ReactNode;
}

export const PanelReloadTableProvider = ({ children }: PanelReloadTableContextProps) => {
    const [reloadData, setReloadData] = useState<{
        isReload: boolean;
        reason?: string | null;
    }>({
        isReload: false,
        reason: null,
    });
    const reload = (reason?: string) => {
        setReloadData({
            isReload: true,
            reason,
        });
    };
    useEffect(() => {
        if (reloadData.isReload) {
            setReloadData({
                isReload: false,
                reason: null,
            });
        }
    }, [reloadData.isReload]);

    return (
        <PanelReloadTableContext.Provider value={{ reload, reloadData }}>{children}</PanelReloadTableContext.Provider>
    );
};
