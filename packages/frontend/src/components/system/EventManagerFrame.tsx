import { createContext, useContext, useMemo } from 'react';
import { PropsWithChildren } from '../../static/frontendHelpers';
import { XEventManager } from '../../static/XEventManager/XEventManager';

type EventKeys = 'onquery' | 'onAuthHandshake' | 'onActivityGap';

const EventManagerContext = createContext<GlobalEventManagerType>({} as any);

export type GlobalEventManagerType = XEventManager<EventKeys>;

export const useEventManagerContext = () => useContext(EventManagerContext);

export const EventManagerFrame = ({ children }: PropsWithChildren) => {

    const globalEventManager = useMemo(() => new XEventManager<EventKeys>(), []);

    return (
        <EventManagerContext.Provider
            value={globalEventManager}>

            {children}
        </EventManagerContext.Provider>
    );
};