import { createContext, memo, ReactNode, RefObject, useEffect, useMemo, useRef, useState } from 'react';
import { applicationRoutes } from '../configuration/applicationRoutes';
import { HelperHooks } from '../helpers/hooks';
import { CompanyApiService } from '../services/api/CompanyApiService1';
import { gradientBackgroundGenerator } from '../services/core/gradientBackgroundGenerator';
import { useNavigation } from '../services/core/navigatior';
import { Environment } from '../static/Environemnt';
import { useIsMobileView } from '../static/frontendHelpers';
import { ObjectComparer } from '../static/objectComparer';
import { EpistoFlex2, EpistoFlex2Props } from './controls/EpistoFlex';
import { EpistoGrid } from './controls/EpistoGrid';
import { EpistoImage } from './controls/EpistoImage';
import Navbar from './navbar/Navbar';
import { useAuthorizationContext } from './system/AuthorizationContext';

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

type LeftPanePropsType = {
    isShowing: boolean,
    isCollapsed: boolean;
    isHidden: boolean;
};

type PageRootContainerContextType = {
    contentElementRef: RefObject<HTMLDivElement>,
    leftPaneElementRef: RefObject<HTMLDivElement>,
    leftPaneProps: LeftPanePropsType;
    contentPaneProps: ContentPanePropsType,
    setLeftPaneProps: (props: LeftPanePropsType) => void;
    setContentPaneProps: (props: ContentPanePropsType) => void
};

export const ContentPaneRoot = ({ contextValue }: { contextValue: PageRootContainerContextType }) => {

    const {
        noPadding,
        showLogo,
        noMaxWidth,
        isNavbarLowHeight,
        navbarBg,
        isMinimalMode,
        hideNavbar,
        noOverflow,
        padding
    } = contextValue.contentPaneProps;

    return (
        <EpistoFlex2
            id={ContentPaneRoot.name}
            ref={contextValue.contentElementRef}
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
            maxWidth={noMaxWidth ? undefined : '1400px'}>

            {!hideNavbar && <Navbar
                isLowHeight={isNavbarLowHeight}
                showLogo={showLogo}
                isMinimalMode={isMinimalMode}
                backgroundContent={navbarBg} />}
        </EpistoFlex2>
    );
};

const LeftPaneHost = memo(({ contextValue }: { contextValue: PageRootContainerContextType }) => {

    const { leftPaneElementRef, leftPaneProps: { isCollapsed, isHidden, isShowing } } = contextValue;

    const { hasPermission } = useAuthorizationContext();
    const { navigate2 } = useNavigation();
    const { companyDetails } = CompanyApiService
        .useCompanyDetailsByDomain(window.location.origin);

    return (
        <EpistoFlex2
            id="rootPortal"
            bg="blue"
            height="100%"
            pos="relative"
            zIndex={2}
            overflow="hidden"
            display={isHidden ? 'none' : undefined}
            flexBasis={(isShowing && !isHidden)
                ? isCollapsed
                    ? '100px'
                    : '320px'
                : '0px'} >

            <EpistoFlex2
                id="leftPane"
                ref={leftPaneElementRef}
                borderRadius="none"
                bg="white"
                direction="column"
                align="stretch"
                padding={'25px 15px 0 15px'}
                className="whall dividerBorderRight"
                position="relative"
                boxShadow="3px 0px 15px 5px rgba(0,0,0,0.1)">

                {/* logo link */}
                {isCollapsed
                    ? <EpistoFlex2 width="100%"
                        alignItems={'center'}
                        justifyContent="center"
                        mt="10px"
                        mb="20px">
                        <img
                            src={Environment.getAssetUrl('/images/logo_min.svg')}
                            style={{
                                height: '50px',
                                objectFit: 'cover',
                                cursor: 'pointer',
                                padding: 0
                            }}
                            alt=""
                            onClick={() => {

                                navigate2(applicationRoutes.homeRoute);
                            }} />
                    </EpistoFlex2>
                    : <EpistoFlex2
                        width="100%"
                        alignItems={'center'}
                        justifyContent="flex-start"
                        mb="20px">

                        <img
                            src={Environment.getAssetUrl('/images/logo.svg')}
                            style={{
                                height: '50px',
                                objectFit: 'cover',
                                cursor: 'pointer',
                                margin: '10px 10px',
                                padding: 0
                            }}
                            alt=""
                            onClick={() => {

                                if (hasPermission('BYPASS_SURVEY'))
                                    navigate2(applicationRoutes.homeRoute);
                            }} />
                    </EpistoFlex2>}

                {/* --- portal rendered here --- */}
            </EpistoFlex2>

            {!isCollapsed && <EpistoImage
                position='absolute'
                bottom='20px'
                left='0'
                width='100%'
                padding='20px'
                src={companyDetails?.logoUrl + ''} />}
        </EpistoFlex2>
    );
}, (prev, current) => {

    return ObjectComparer
        .isEqual(prev, current);
});

export const LeftSidebarElementRefContext = createContext<PageRootContainerContextType | null>(null);

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
        contentElementRef,
        contentPaneProps,
        leftPaneProps,
        setContentPaneProps,
        setLeftPaneProps
    }), [leftPaneElementRef, contentElementRef, leftPaneProps, contentPaneProps]);

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

        {/* content host */}
        <ContentPaneRoot
            contextValue={contextValue} />

        <LeftSidebarElementRefContext.Provider
            value={contextValue}>

            {children}
        </LeftSidebarElementRefContext.Provider>
    </EpistoFlex2>;
};
