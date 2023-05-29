import { memo } from 'react';
import { applicationRoutes } from '../../configuration/applicationRoutes';
import { Responsivity } from '../../helpers/responsivity';
import { CompanyApiService } from '../../services/api/CompanyApiService';
import { useNavigation } from '../../services/core/navigatior';
import { Environment } from '../../static/Environemnt';
import { ObjectComparer } from '../../static/objectComparer';
import { EpistoFlex2 } from '../controls/EpistoFlex';
import { EpistoImage } from '../controls/EpistoImage';
import { useAuthorizationContext } from '../system/AuthorizationContext';
import { PageRootContainerContextType } from './contentPaneRootLogic';

export const LeftPaneHost = memo(({
    contextValue
}: {
    contextValue: PageRootContainerContextType
}) => {

    const { leftPaneElementRef, leftPaneProps } = contextValue;
    const { isCollapsed, isShowing } = leftPaneProps;

    const { hasPermission } = useAuthorizationContext();
    const { navigate2 } = useNavigation();
    const { companyDetails } = CompanyApiService
        .useCompanyDetailsByDomain();

    const { isMobile } = Responsivity
        .useIsMobileView();

    const isHidden = leftPaneProps.isHidden || isMobile;

    return (
        <EpistoFlex2
            id={LeftPaneHost.name}
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
                    ? <EpistoFlex2
                        width="100%"
                        alignItems={'center'}
                        justifyContent="center"
                        mt="10px"
                        mb="45px">
                        <img
                            src={Environment.getAssetUrl('/images/logo_min.png')}
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
                        height='80px'
                        pl='9px'
                        alignItems={'center'}
                        justifyContent="flex-start">

                        <img
                            src={Environment.getAssetUrl('/images/logo.png')}
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