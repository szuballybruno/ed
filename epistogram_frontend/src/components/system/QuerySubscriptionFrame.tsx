import { useEffect } from 'react';
import { PropsWithChildren } from '../../static/frontendHelpers';
import { QueryService } from '../../static/QueryService';

export const QuerySubscriptionFrame = ({ children }: PropsWithChildren) => {

    const { scubscribeEvent } = QueryService.useScubscribeEvent();

    useEffect(() => {

        scubscribeEvent(x => {

            if (x.error?.code === 'forbidden')
                console.log('Forbidden!');
        });
    }, [scubscribeEvent]);

    return (
        <>
            {children}
        </>
    );
};