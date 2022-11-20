import { apiRoutes } from '@episto/communication';
import { useRef } from 'react';
import { applicationRoutes } from '../../configuration/applicationRoutes';
import { useNavigation } from '../../services/core/navigatior';
import { PropsWithChildren } from '../../static/frontendHelpers';
import { Logger } from '../../static/Logger';
import { XEventManagerReact } from '../../static/XEventManager/XEventManagerReact';
import { QueryEventType } from '../../static/XQuery/XQueryTypes';
import { useCurrentCourseItemCodeContext } from './CurrentCourseItemFrame';
import { useEventManagerContext } from './EventManagerFrame';

export const QuerySubscriptionFrame = ({ children }: PropsWithChildren) => {

    const { navigate2 } = useNavigation();
    const { refetchCurrentCourseItemCode } = useCurrentCourseItemCodeContext();
    const globalEventManager = useEventManagerContext();

    const callbackParamsRef = useRef({
        navigate2,
        refetchCurrentCourseItemCode
    });

    XEventManagerReact
        .useSubscribeEvent(
            globalEventManager,
            'onquery',
            `${QuerySubscriptionFrame.name}-'noPermissionWatcher'`,
            (x: QueryEventType) => {

                const { navigate2 } = callbackParamsRef.current;

                if (x.error?.code === 'no permission') {

                    Logger.logScoped('AUTH', 'No permission to access resource, navigating to home page...');
                    navigate2(applicationRoutes.homeRoute);
                }
            });

    XEventManagerReact
        .useSubscribeEvent(
            globalEventManager,
            'onquery',
            `${QuerySubscriptionFrame.name}-'refetchCurrentCourseItemCode'`,
            (x: QueryEventType) => {

                const { refetchCurrentCourseItemCode } = callbackParamsRef.current;

                if (x.url === apiRoutes.player.getPlayerData && x.state === 'success') {

                    Logger.logScoped('EVENTS', 'Player data successfully retrieved, updating current item code...');
                    refetchCurrentCourseItemCode();
                }
            });

    return (
        <>
            {children}
        </>
    );
};