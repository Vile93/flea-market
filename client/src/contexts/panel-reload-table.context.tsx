'use client';

import { createContext, useEffect, useState } from 'react';

type PanelReloadTableContextType = {
    reload: () => void;
    isReload: boolean;
};

export const PanelReloadTableContext = createContext<PanelReloadTableContextType | null>(null);

interface PanelReloadTableContextProps {
    children: React.ReactNode;
}

export const PanelReloadTableProvider = ({ children }: PanelReloadTableContextProps) => {
    const [isReload, setIsReload] = useState(false);
    const reload = () => {
        setIsReload(true);
    };
    useEffect(() => {
        if (isReload) {
            setIsReload(false);
        }
    }, [isReload]);

    return <PanelReloadTableContext.Provider value={{ reload, isReload }}>{children}</PanelReloadTableContext.Provider>;
};
