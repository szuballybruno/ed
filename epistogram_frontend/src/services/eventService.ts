import { useContext } from "react";
import { useQuery } from "react-query";
import { AuthenticationStateContext } from "../components/system/AuthenticationFrame";
import { EventDTO } from "../models/shared_models/EventDTO";
import { apiRoutes } from "../models/shared_models/types/apiRoutes";
import { httpGetAsync } from "./httpClient";

export const useEventListener = () => {

    const authState = useContext(AuthenticationStateContext);

    const { data } = useQuery(
        ['eventListenerQuery'],
        () => httpGetAsync(apiRoutes.event.getUnfulfilledEvent), {
        retry: false,
        refetchOnWindowFocus: false,
        refetchInterval: 30 * 1000, // every 30s //eventPoolingIntervalInMs,
        refetchIntervalInBackground: true,
        notifyOnChangeProps: ["data"],
        enabled: authState === "authenticated"
    });

    console.log("el update: ");
    console.log(data);

    return {
        event: data as null | EventDTO
    };
}