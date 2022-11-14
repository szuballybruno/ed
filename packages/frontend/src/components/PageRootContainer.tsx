import { createContext, ReactNode, RefObject, useEffect, useMemo, useRef, useState } from 'react';
import { HelperHooks } from '../helpers/hooks';
import { gradientBackgroundGenerator } from '../services/core/gradientBackgroundGenerator';
import { useIsMobileView } from '../static/frontendHelpers';
import { EpistoFlex2 } from './controls/EpistoFlex';
import { EpistoGrid } from './controls/EpistoGrid';

type LeftSidebarContextType = {
    leftPaneElementRef: RefObject<HTMLDivElement>,
    leftPaneShowing: boolean,
    setLeftPaneShowing: (isShowing: boolean) => void,
    setCollapsed: (isCollapsed: boolean) => void
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

    const ref = useRef<HTMLDivElement>(null);
    const [leftPaneShowing, setLeftPaneShowing] = useState(false);
    const [isCollapsed, setCollapsed] = useState(false);

    const contextValue: LeftSidebarContextType = useMemo(() => ({
        leftPaneElementRef: ref,
        leftPaneShowing,
        setLeftPaneShowing,
        setCollapsed
    }), [ref, leftPaneShowing]);

    console.log(leftPaneShowing);

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
        <EpistoFlex2
            ref={ref}
            id="rootPortal"
            height="100%"
            flexBasis={isCollapsed ? '60px' : '320px'}
            maxW={leftPaneShowing ? '320px' : '0px'} />

        {/* children */}
        <LeftSidebarElementRefContext.Provider
            value={contextValue}>

            {children}
        </LeftSidebarElementRefContext.Provider>
    </EpistoFlex2>;
};
