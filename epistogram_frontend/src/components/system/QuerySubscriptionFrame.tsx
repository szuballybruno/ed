import { useEffect } from 'react';
import { applicationRoutes } from '../../configuration/applicationRoutes';
import { useNavigation } from '../../services/core/navigatior';
import { eventBus } from '../../static/EventBus';
import { PropsWithChildren } from '../../static/frontendHelpers';
import { Logger } from '../../static/Logger';
import { QueryEventData } from '../../static/QueryService';

export const QuerySubscriptionFrame = ({ children }: PropsWithChildren) => {

    const { navigate2 } = useNavigation();

    useEffect(() => {

        eventBus
            .scubscribeEvent('onquery', 'noPermissionWatcher', (x: QueryEventData) => {

                if (x.error?.code === 'no permission') {

                    Logger.logScoped('AUTO NAV', 'No permission to access resource, navigating to home page...');
                    navigate2(applicationRoutes.homeRoute);
                }
            });
    }, [navigate2]);

    return (
        <>
            {children}
        </>
    );
};