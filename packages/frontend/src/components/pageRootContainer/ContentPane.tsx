import { PropsWithChildren, useContext, useEffect } from 'react';
import { ContentPanePropsType, RootContainerContext } from './contentPaneRootLogic';

export const ContentPane = ({
    children,
    ...props
}: ContentPanePropsType & PropsWithChildren) => {

    const context = useContext(RootContainerContext);

    useEffect(() => {

        if (!context)
            return;

        context
            .setContentPaneProps(props);
    }, [context, props]);

    return (
        <>
            {children}
        </>
    );
};
