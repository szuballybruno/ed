import { createContext, RefObject, useMemo, useRef, useState } from 'react';
import { HelperHooks } from '../../helpers/hooks';
import { EpistoFlex2Props } from '../controls/EpistoFlex';

export type ContentPanePropsType = {
    noPadding?: boolean,
    navbarBg?: any,
    hideNavbar?: boolean,
    isNavbarLowHeight?: boolean,
    useMaxWidth?: boolean,
    showLogo?: boolean,
    isMinimalMode?: boolean,
    noOverflow?: boolean;
    isHeaderFixed?: boolean;
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

export type LeftPanePropsType = {
    isShowing: boolean,
    isCollapsed: boolean;
    isHidden: boolean;
};

export type PageRootContainerContextType = {
    backgroundContainerRef: RefObject<HTMLDivElement>,
    leftPaneElementRef: RefObject<HTMLDivElement>,
    leftPaneProps: LeftPanePropsType;
    contentPaneProps: ContentPanePropsType,
    isBackgroundOverwritten: boolean,
    setLeftPaneProps: (props: LeftPanePropsType) => void;
    setContentPaneProps: (props: ContentPanePropsType) => void;
    setIsBackgroundOverwritten: (isBackgroundOverwritten: boolean) => void;
};

export const RootContainerContext = createContext<PageRootContainerContextType | null>(null);

export const useRootContainerContextValue = () => {

    const leftPaneElementRef = useRef<HTMLDivElement>(null);
    const backgroundContainerRef = useRef<HTMLDivElement>(null);
    const [isBackgroundOverwritten, setIsBackgroundOverwritten] = useState(false);
    const [rawContentPaneProps, setContentPaneProps] = useState<ContentPanePropsType>({});
    const [rawLeftPaneProps, setLeftPaneProps] = useState<LeftPanePropsType>({
        isCollapsed: false,
        isShowing: false,
        isHidden: false
    });

    const contentPaneProps = HelperHooks
        .useMemoize(rawContentPaneProps);

    const leftPaneProps = HelperHooks
        .useMemoize(rawLeftPaneProps);

    const contextValue: PageRootContainerContextType = useMemo(() => ({
        leftPaneElementRef,
        backgroundContainerRef,
        contentPaneProps,
        leftPaneProps,
        isBackgroundOverwritten,
        setContentPaneProps,
        setLeftPaneProps,
        setIsBackgroundOverwritten
    }), [leftPaneElementRef, backgroundContainerRef, leftPaneProps, contentPaneProps, isBackgroundOverwritten]);

    return contextValue;
};