import { useQuery } from "react-query"
import { eventPoolingIntervalInMs } from "../Environemnt";
import { apiRoutes } from "../models/shared_models/types/apiRoutes";
import { httpGetAsync } from "./httpClient";

export const useEventListener = () => {

    const { data } = useQuery(
        ['eventListenerQuery'],
        () => httpGetAsync(apiRoutes.event.getUnfulfilledEvent), {
        retry: false,
        refetchOnWindowFocus: false,
        refetchInterval: eventPoolingIntervalInMs,
        refetchIntervalInBackground: true,
        notifyOnChangeProps: ["data"]
    });

    console.log(data);

    return { data };
}