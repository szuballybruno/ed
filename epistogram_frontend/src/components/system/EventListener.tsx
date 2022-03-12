import { ReactNode } from "react";
import { useEventListener } from "../../services/api/eventApiService";
import { EventCodeType } from "../../shared/types/sharedTypes";
import { CoinRewardEventHandler } from "../event_handlers/CoinRewardEventHandler";
import { LagBehindNotificationEventHandler } from "../event_handlers/LagBehindNotificationEventHandler";

export type EventHandlerType = {
    eventCode: EventCodeType,
    handlerComponent: (props: { data: any }) => JSX.Element
}

export const EventListener = (props: {
    children: ReactNode
}) => {

    const { children } = props;
    const { event } = useEventListener();

    const handlerComponents = [
        {
            eventCode: "coin_acquire_session_streak",
            handlerComponent: CoinRewardEventHandler
        },
        {
            eventCode: "lag_behind_notification",
            handlerComponent: LagBehindNotificationEventHandler
        }
    ] as EventHandlerType[];

    return <>

        {handlerComponents
            .map(x => {

                const eventData = event
                    ? x.eventCode === event.type
                        ? event.data
                        : null
                    : null;

                return x.handlerComponent({ data: eventData });
            })}

        {children}
    </>
}