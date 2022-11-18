import { createContext, useContext } from 'react';
import { LeaderboardApiServiceType, useLeaderboardApiService } from '../services/api/LeaderboardApiService';
import { useMiscApiService, MiscApiService } from '../services/api/miscApiService';
import { GlobalEventManagerType } from '../components/system/EventManagerFrame';

/**
 * New solution is brewin'
 */
export const useServiceContainer = (globalEventManager: GlobalEventManagerType) => ({
    miscApiService: useMiscApiService(globalEventManager) as MiscApiService,
    leaderboardService: useLeaderboardApiService(globalEventManager) as LeaderboardApiServiceType
});

type ServiceContainerContextType = ReturnType<typeof useServiceContainer>;

export const ServiceContainerContext = createContext<ServiceContainerContextType>({} as any);

export const useServiceContainerContext = () => useContext(ServiceContainerContext);