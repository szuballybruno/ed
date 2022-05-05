import { useContext } from 'react';
import { useQuery } from 'react-query';
import { AuthenticationStateContext } from '../../components/system/AuthenticationFrame';
import { Environment } from '../../static/Environemnt';
import { EventDTO } from '../../shared/dtos/EventDTO';
import { apiRoutes } from '../../shared/types/apiRoutes';
import { httpGetAsync } from '../core/httpClient';

export const useEventListener = () => {

    const authState = useContext(AuthenticationStateContext);

    const { data } = useQuery(
        ['eventListenerQuery'],
        () => httpGetAsync(apiRoutes.event.getUnfulfilledEvent), {
        retry: false,
        refetchOnWindowFocus: false,
        refetchInterval: Environment.eventPoolingIntervalInMs,
        refetchIntervalInBackground: true,
        notifyOnChangeProps: ['data'],
        enabled: authState === 'authenticated'
    });

    return {
        event: data as null | EventDTO
    };
};