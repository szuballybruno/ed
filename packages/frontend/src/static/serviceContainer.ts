import { createContext, useContext } from 'react';
import { useMiscApiService, MiscApiService } from '../services/api/miscApiService';
import { GlobalEventManagerType } from './EventBus';

/**
 * New solution is brewin'
 */
export const useServiceContainer = (globalEventManager: GlobalEventManagerType) => ({
    miscApiService: useMiscApiService(globalEventManager) as MiscApiService
});

type ServiceContainerContextType = ReturnType<typeof useServiceContainer>;

export const ServiceContainerContext = createContext<ServiceContainerContextType>({} as any);

export const useServiceContainerContext = () => useContext(ServiceContainerContext);