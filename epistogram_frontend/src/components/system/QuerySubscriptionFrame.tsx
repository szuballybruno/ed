import { useEffect } from 'react';
import { applicationRoutes } from '../../configuration/applicationRoutes';
import { useNavigation } from '../../services/core/navigatior';
import { apiRoutes } from '../../shared/types/apiRoutes';
import { GlobalEventManagerType } from '../../static/EventBus';
import { PropsWithChildren } from '../../static/frontendHelpers';
import { Logger } from '../../static/Logger';
import { QueryEventData } from '../../static/QueryService';
import { useCurrentCourseItemCodeContext } from './CurrentCourseItemFrame';

export const QuerySubscriptionFrame = ({ globalEventManager, children }: { globalEventManager: GlobalEventManagerType } & PropsWithChildren) => {

    const { navigate2 } = useNavigation();
    const { refetchCurrentCourseItemCode } = useCurrentCourseItemCodeContext();

    useEffect(() => {

        console.log('---------- FRAME useEffect ------------');

        globalEventManager
            .scubscribeEvent('onquery', `${QuerySubscriptionFrame.name}-'noPermissionWatcher'`, (x: QueryEventData) => {

                if (x.error?.code === 'no permission') {

                    Logger.logScoped('AUTO NAV', 'No permission to access resource, navigating to home page...');
                    navigate2(applicationRoutes.homeRoute);
                }
            });

        globalEventManager
            .scubscribeEvent('onquery', `${QuerySubscriptionFrame.name}-'refetchCurrentCourseItemCode'`, (x: QueryEventData) => {

                if (x.route === apiRoutes.player.getPlayerData && x.state === 'success') {

                    Logger.logScoped('EVENTS', 'Player data successfully retrieved, updating current item code...');
                    refetchCurrentCourseItemCode();
                }
            });
    }, [globalEventManager, navigate2, refetchCurrentCourseItemCode]);

    return (
        <>
            {children}
        </>
    );
};