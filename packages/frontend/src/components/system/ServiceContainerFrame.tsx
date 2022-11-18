import { PropsWithChildren } from '../../static/frontendHelpers';
import { ServiceContainerContext, useServiceContainer } from '../../static/serviceContainer';
import { useEventManagerContext } from './EventManagerFrame';

export const ServiceContainerFrame = ({ children }: PropsWithChildren) => {

    const globalEventManager = useEventManagerContext();
    const contextValue = useServiceContainer(globalEventManager);

    return (
        <ServiceContainerContext.Provider value={contextValue}>
            {children}
        </ServiceContainerContext.Provider>
    );
};