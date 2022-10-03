import { GlobalEventManagerType } from '../../static/EventBus';
import { PropsWithChildren } from '../../static/frontendHelpers';
import { ServiceContainerContext, useServiceContainer } from '../../static/serviceContainer';

export const ServiceContainerFrame = ({ children, globalEventManager }: { globalEventManager: GlobalEventManagerType } & PropsWithChildren) => {

    const contextValue = useServiceContainer(globalEventManager);

    return (
        <ServiceContainerContext.Provider value={contextValue}>
            {children}
        </ServiceContainerContext.Provider>
    );
};