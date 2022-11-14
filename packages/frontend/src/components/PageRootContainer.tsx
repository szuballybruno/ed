import { createContext, ReactNode, RefObject, useEffect, useMemo, useRef, useState } from 'react';
import { HelperHooks } from '../helpers/hooks';
import { gradientBackgroundGenerator } from '../services/core/gradientBackgroundGenerator';
import { useIsMobileView } from '../static/frontendHelpers';
import { EpistoFlex2, EpistoFlex2Props } from './controls/EpistoFlex';
import { EpistoGrid } from './controls/EpistoGrid';
import Navbar from './navbar/Navbar';

type LeftSidebarContextType = {
    leftPaneElementRef: RefObject<HTMLDivElement>,
    contentElementRef: RefObject<HTMLDivElement>,
    leftPaneShowing: boolean,
    setLeftPaneShowing: (isShowing: boolean) => void,
    setCollapsed: (isCollapsed: boolean) => void
    isCollapsed: boolean;
    contentPaneProps: ContentPanePropsType,
    setContentPaneProps: (props: ContentPanePropsType) => void
};

type ContentPanePropsType = {
    noPadding?: boolean,
    navbarBg?: any,
    hideNavbar?: boolean,
    isNavbarLowHeight?: boolean,
    noMaxWidth?: boolean,
    showLogo?: boolean,
    isMinimalMode?: boolean,
    noOverflow?: boolean
} & EpistoFlex2Props;

export const ContentPaneRoot = ({
    contentElementRef,
    noPadding,
    showLogo,
    noMaxWidth,
    isNavbarLowHeight,
    navbarBg,
    isMinimalMode,
    hideNavbar,
    noOverflow,
    padding,
    ...css
}: ContentPanePropsType & { contentElementRef }) => {

    return (
        <EpistoFlex2
            id={ContentPaneRoot.name}
            ref={contentElementRef}
            direction="column"
            flex="1"
            overflow="hidden"
            overflowY={noOverflow ? 'hidden' : 'scroll'}
            overflowX="hidden"
            padding={noPadding
                ? undefined
                : padding
                    ? padding
                    : '0 30px 0px 30px'}
            maxWidth={noMaxWidth ? undefined : '1400px'}
        // {...css}
        >

            {!hideNavbar && <Navbar
                isLowHeight={isNavbarLowHeight}
                showLogo={showLogo}
                isMinimalMode={isMinimalMode}
                backgroundContent={navbarBg} />}
        </EpistoFlex2>
    );
};

const LeftPaneHost = ({ contextValue }: { contextValue: LeftSidebarContextType }) => {

    const { leftPaneElementRef, isCollapsed, leftPaneShowing } = contextValue;

    return (
        <EpistoFlex2
            ref={leftPaneElementRef}
            id="rootPortal"
            transition="0.1s"
            bg="blue"
            height="100%"
            overflow="hidden"
            flexBasis={leftPaneShowing
                ? isCollapsed
                    ? '100px'
                    : '320px'
                : '0px'} />
    );
};

export const LeftSidebarElementRefContext = createContext<LeftSidebarContextType | null>(null);

export const PageRootContainer = ({
    children,
}: {
    children: ReactNode,
}) => {

    useEffect(() => {

        document.title = 'EpistoGram';
    }, []);

    const isMobile = useIsMobileView();

    const gradients = gradientBackgroundGenerator(isMobile ? 'rgba(160, 200, 255, 0.1)' : 'rgba(0, 100, 255, 0.1)');

    const { isIPhone } = HelperHooks
        .useIsIPhone();

    const leftPaneElementRef = useRef<HTMLDivElement>(null);
    const contentElementRef = useRef<HTMLDivElement>(null);
    const [leftPaneShowing, setLeftPaneShowing] = useState(false);
    const [isCollapsed, setCollapsed] = useState(false);
    const [contentPaneProps, setContentPaneProps] = useState<ContentPanePropsType>({});

    const contextValue: LeftSidebarContextType = useMemo(() => ({
        leftPaneElementRef,
        contentElementRef,
        leftPaneShowing,
        isCollapsed,
        setLeftPaneShowing,
        setCollapsed,
        contentPaneProps,
        setContentPaneProps
    }), [isCollapsed, leftPaneElementRef, contentElementRef, leftPaneShowing, contentPaneProps]);

    return <EpistoFlex2
        maxH={isIPhone ? '100vh' : undefined}
        maxW={isIPhone ? '100vw' : undefined}
        id="pageRootContainer"
        maxWidth='1920px'
        margin="0 auto"
        position="relative"
        overflow="hidden"
        className="whall">

        {/* background */}
        <EpistoGrid
            bgColor={'white'}
            position="fixed"
            top={'0'}
            left={'0'}
            w="100vw"
            h="100vh"
            zIndex="-1"
            filter="blur(50px)"
            minColumnWidth={'33%'}
            gap='0px'
            gridTemplateColumns="repeat(3, 1fr)"
            auto={'fill'}>

            {gradients
                .map((gradient, index) => {
                    return <EpistoFlex2
                        key={index}
                        padding="20px"
                        filter="blur(8px)"
                        background={gradient}>

                    </EpistoFlex2>;
                })}
        </EpistoGrid>

        {/* left pane host */}
        <LeftPaneHost
            contextValue={contextValue} />

        {/* content */}
        <ContentPaneRoot
            contentElementRef={contentElementRef}
            {...contentPaneProps}>
        </ContentPaneRoot>

        <LeftSidebarElementRefContext.Provider
            value={contextValue}>

            {children}
        </LeftSidebarElementRefContext.Provider>
    </EpistoFlex2>;
};
