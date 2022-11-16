import { useContext, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { PropsWithChildren } from '../../static/frontendHelpers';
import { RootContainerContext } from './contentPaneRootLogic';

export const LeftPane = ({
    children,
    collapsed,
    hidden
}: {
    collapsed?: boolean,
    hidden?: boolean
} & PropsWithChildren) => {

    const contextValue = useContext(RootContainerContext);

    useEffect(() => {

        if (!contextValue)
            return;

        contextValue
            .setLeftPaneProps({
                ...contextValue.leftPaneProps,
                isShowing: true,
                isCollapsed: collapsed === true,
                isHidden: hidden === true
            });

        /**
         * Important to destroy properly 
         */
        return () => {

            contextValue
                .setLeftPaneProps({
                    ...contextValue.leftPaneProps,
                    isShowing: false,
                });
        };
    }, [collapsed, contextValue, hidden]);

    if (!contextValue)
        return <></>;

    if (!contextValue.leftPaneElementRef)
        return <></>;

    if (!contextValue.leftPaneElementRef.current)
        return <></>;

    return createPortal(children, contextValue.leftPaneElementRef.current);
};
