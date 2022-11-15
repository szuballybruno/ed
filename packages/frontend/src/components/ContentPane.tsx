import { ReactNode, useContext, useEffect } from 'react';
import { EpistoFlex2Props } from './controls/EpistoFlex';
import { LeftSidebarElementRefContext } from './PageRootContainer';

type ContentPanePropsType = {
    noPadding?: boolean,
    navbarBg?: any,
    hideNavbar?: boolean,
    isNavbarLowHeight?: boolean,
    noMaxWidth?: boolean,
    showLogo?: boolean,
    isMinimalMode?: boolean,
    noOverflow?: boolean
    children: ReactNode;
    align?: EpistoFlex2Props['align'];
    justify?: EpistoFlex2Props['justify'];
    padding?: EpistoFlex2Props['padding'];
    margin?: EpistoFlex2Props['margin'];
    maxHeight?: EpistoFlex2Props['maxHeight'];
    minHeight?: EpistoFlex2Props['minHeight'];
    position?: EpistoFlex2Props['position'];
    top?: EpistoFlex2Props['top'];
    minWidth?: EpistoFlex2Props['minWidth'];
    height?: EpistoFlex2Props['height'];
    width?: EpistoFlex2Props['width'];
    overflowY?: EpistoFlex2Props['overflowY'];
};

export const ContentPane = ({
    children,
    ...props
}: ContentPanePropsType) => {

    const context = useContext(LeftSidebarElementRefContext);

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
