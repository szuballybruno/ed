import { apiRoutes } from '@episto/communication';
import { useEffect, useRef } from 'react';
import { applicationRoutes } from '../../configuration/applicationRoutes';
import { useNavigation } from '../../services/core/navigatior';
import { GlobalEventManagerType } from '../../static/EventBus';
import { PropsWithChildren } from '../../static/frontendHelpers';
import { Logger } from '../../static/Logger';
import { QueryEventData } from '../../static/QueryService';
import { useCurrentCourseItemCodeContext } from './CurrentCourseItemFrame';

export const QuerySubscriptionFrame = ({ globalEventManager, children }: { globalEventManager: GlobalEventManagerType } & PropsWithChildren) => {

    const { navigate2 } = useNavigation();
    const { refetchCurrentCourseItemCode } = useCurrentCourseItemCodeContext();

    const callbackParamsRef = useRef({
        navigate2,
        refetchCurrentCourseItemCode
    });

    useEffect(() => {

        globalEventManager
            .scubscribeEvent('onquery', `${QuerySubscriptionFrame.name}-'noPermissionWatcher'`, (x: QueryEventData) => {

                const { navigate2 } = callbackParamsRef.current;

                if (x.error?.code === 'no permission') {

                    Logger.logScoped('AUTH', 'No permission to access resource, navigating to home page...');
                    navigate2(applicationRoutes.homeRoute);
                }
            });

        globalEventManager
            .scubscribeEvent('onquery', `${QuerySubscriptionFrame.name}-'refetchCurrentCourseItemCode'`, (x: QueryEventData) => {

                const { refetchCurrentCourseItemCode } = callbackParamsRef.current;

                if (x.route === apiRoutes.player.getPlayerData && x.state === 'success') {

                    Logger.logScoped('EVENTS', 'Player data successfully retrieved, updating current item code...');
                    refetchCurrentCourseItemCode();
                }
            });
    }, [globalEventManager]);

    return (
        <>
            {children}
        </>
    );
};