import { apiRoutes, EventDTO } from '@episto/communication';
import { useQuery } from 'react-query';
import { useAuthContextState } from '../../components/system/AuthenticationFrame';
import { Environment } from '../../static/Environemnt';
import { useGetCurrentAppRoute } from '../../static/frontendHelpers';
import { httpGetAsync } from '../core/httpClient';

export const useEventListener = () => {

    const currentRoute = useGetCurrentAppRoute();
    const isEnabled = !currentRoute.isUnauthorized;
    const { authState } = useAuthContextState();

    const { data } = useQuery(
        ['eventListenerQuery'],
        () => httpGetAsync(apiRoutes.event.getUnfulfilledEvent), {
        retry: false,
        refetchOnWindowFocus: false,
        refetchInterval: Environment.eventPoolingIntervalInMs,
        refetchIntervalInBackground: true,
        notifyOnChangeProps: ['data'],
        enabled: isEnabled && authState === 'authenticated'
    });

    return {
        event: data as null | EventDTO
    };
};