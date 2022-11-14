import { useContext, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { applicationRoutes } from '../configuration/applicationRoutes';
import { CompanyApiService } from '../services/api/CompanyApiService1';
import { useNavigation } from '../services/core/navigatior';
import { Environment } from '../static/Environemnt';
import { PropsWithChildren } from '../static/frontendHelpers';
import { EpistoFlex2 } from './controls/EpistoFlex';
import { EpistoImage } from './controls/EpistoImage';
import { FlexFloat } from './controls/FlexFloat';
import { LeftSidebarElementRefContext } from './PageRootContainer';
import { useAuthorizationContext } from './system/AuthorizationContext';

export const LeftPane = ({
    padding,
    basis,
    children,
    collapsed
}: {
    padding?: string,
    basis?: string,
    collapsed?: boolean
} & PropsWithChildren) => {

    const homeRoute = applicationRoutes.rootHomeRoute;
    const { hasPermission } = useAuthorizationContext();
    const { navigate2 } = useNavigation();
    const { companyDetails } = CompanyApiService
        .useCompanyDetailsByDomain(window.location.origin);

    const contextValue = useContext(LeftSidebarElementRefContext);

    useEffect(() => {

        if (!contextValue)
            return;

        contextValue
            .setLeftPaneShowing(true);

        contextValue
            .setCollapsed(!!collapsed);

        /**
         * Important to destroy properly 
         */
        return () => {

            contextValue
                .setLeftPaneShowing(false);
        };
    }, [collapsed, contextValue]);

    if (!contextValue)
        return <></>;

    if (!contextValue.leftPaneElementRef)
        return <></>;

    if (!contextValue.leftPaneElementRef.current)
        return <></>;

    const LeftPaneComponent = (
        <FlexFloat
            borderRadius="none"
            id="leftPane"
            bg="white"
            zIndex={2}
            direction="column"
            align="stretch"
            padding={padding ? padding : '25px 15px 0 15px'}
            basis={basis ?? undefined}
            className="whall dividerBorderRight"
            position="relative"
            boxShadow="3px 0px 15px 5px rgba(0,0,0,0.1)">

            {/* logo link */}
            {collapsed
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
                                navigate2(homeRoute);
                        }} />
                </EpistoFlex2>}

            {children}

            {!collapsed && <EpistoImage
                position='absolute'
                bottom='20px'
                left='0'
                width='100%'
                padding='20px'
                src={companyDetails?.logoUrl + ''} />}
        </FlexFloat>
    );

    return createPortal(LeftPaneComponent, contextValue.leftPaneElementRef.current);
};
