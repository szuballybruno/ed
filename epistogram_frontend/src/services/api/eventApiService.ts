import { useContext } from "react";
import { useQuery } from "react-query";
import { AuthenticationStateContext } from "../../components/system/AuthenticationFrame";
import { eventPoolingIntervalInMs } from "../../Environemnt";
import { EventDTO } from "../../models/shared_models/EventDTO";
import { apiRoutes } from "../../models/shared_models/types/apiRoutes";
import { httpGetAsync } from "../core/httpClient";

export const useEventListener = () => {

    const authState = useContext(AuthenticationStateContext);

    const { data } = useQuery(
        ['eventListenerQuery'],
        () => httpGetAsync(apiRoutes.event.getUnfulfilledEvent), {
        retry: false,
        refetchOnWindowFocus: false,
        refetchInterval: eventPoolingIntervalInMs,
        refetchIntervalInBackground: true,
        notifyOnChangeProps: ["data"],
        enabled: authState === "authenticated"
    });

    return {
        event: data as null | EventDTO
    };
}