import { useContext } from 'react';
import { useQuery } from 'react-query';
import { AuthenticationStateContext } from '../../components/system/AuthenticationFrame';
import { Environment } from '../../static/Environemnt';
import { EventDTO } from '@episto/communication';
import { apiRoutes } from '@episto/communication';
import { httpGetAsync } from '../core/httpClient';
import { useGetCurrentAppRoute } from '../../static/frontendHelpers';

export const useEventListener = () => {

    const authState = useContext(AuthenticationStateContext);
    const currentRoute = useGetCurrentAppRoute();
    const isEnabled = !currentRoute.isUnauthorized;

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