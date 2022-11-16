import { PropsWithChildren, useContext, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { RootContainerContext } from './contentPaneRootLogic';

export const RootContainerBackground = ({
    children
}: PropsWithChildren) => {

    const rootContainerContext = useContext(RootContainerContext);
    const container = rootContainerContext?.backgroundContainerRef?.current;

    useEffect(() => {

        if (!rootContainerContext)
            return;

        rootContainerContext
            .setIsBackgroundOverwritten(true);

        return () => {

            rootContainerContext
                .setIsBackgroundOverwritten(false);
        };
    }, [rootContainerContext]);

    if (!container)
        return <></>;

    return (
        createPortal(children, container)
    );
};