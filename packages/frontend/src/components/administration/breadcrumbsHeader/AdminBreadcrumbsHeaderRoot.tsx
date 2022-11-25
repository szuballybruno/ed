import { Id } from '@episto/commontypes';
import { getKeys } from '@episto/xcore';
import { ArrowBack } from '@mui/icons-material';
import { useCallback } from 'react';
import { applicationRoutes } from '../../../configuration/applicationRoutes';
import { ApplicationRoute } from '../../../models/types';
import { ArrayBuilder, PropsWithChildren, useIsMatchingCurrentRoute } from '../../../static/frontendHelpers';
import { EpistoButton } from '../../controls/EpistoButton';
import { EpistoFlex2 } from '../../controls/EpistoFlex';
import { MUI } from '../../controls/MUIControls';
import { useAuthorizationContext } from '../../system/AuthorizationContext';
import { CompanySelectorDropdown } from '../users/CompanySelectorDropdown';
import { AdminBreadcrumbLink } from './AdminBreadcrumbLink';
import { AdminBreadcrumbsContext, useAdminBreadcrumbsState } from './AdminBreadcrumbsContext';

export type CompanySelectorDropdownType = {
    id: Id<'Company'> | null,
    name: string
}

export const useAdminBreadcrumbsRootLogic = () => {

    const contextValue = useAdminBreadcrumbsState();
    const { backButtonProps, subRouteLabel, headerContentRef, activeCompany, companySelectorLogic, activeCompanyId } = contextValue;
    const { hasPermission } = useAuthorizationContext();

    // util
    const isMatchingCurrentRoute = useIsMatchingCurrentRoute();

    // calc
    const getCurrentRoute = useCallback(() => {

        const isApplicationRoute = (obj: any) => !!obj.route;

        return getKeys(applicationRoutes.administrationRoute)
            .map(x => applicationRoutes.administrationRoute[x] as ApplicationRoute)
            .filter(x => isApplicationRoute(x))
            .single(route => isMatchingCurrentRoute(route).isMatchingRoute);
    }, [isMatchingCurrentRoute]);

    const currentRoute = getCurrentRoute();

    const subRoute = subRouteLabel
        ? { title: subRouteLabel }
        : null;

    return {
        companySelectorLogic,
        subRoute,
        currentRoute,
        hasPermission,
        headerContentRef,
        contextValue,
        backButtonProps,
        activeCompany,
        activeCompanyId
    };
};

export type AdminBreadcrumbsRootLogicType = ReturnType<typeof useAdminBreadcrumbsRootLogic>;

export const AdminBreadcrumbsHeaderRoot = ({ children, logic }: PropsWithChildren & { logic: AdminBreadcrumbsRootLogicType }) => {

    const {
        companySelectorLogic,
        currentRoute,
        subRoute,
        hasPermission,
        headerContentRef,
        contextValue,
        backButtonProps,
        activeCompanyId
    } = logic;

    return <EpistoFlex2
        id={AdminBreadcrumbsHeaderRoot.name}
        flex="1"
        direction={'column'}>

        {/* header part */}
        <EpistoFlex2
            id={'BreadcrumbsHeader'}
            justify="space-between"
            align='center'
            minH="38px">

            {/* breadcrumbs */}
            <EpistoFlex2
                id={'HeaderLeftSide'}
                align='center'>

                {backButtonProps &&
                    <EpistoButton
                        id={'BackButton'}
                        style={{
                            color: 'var(--mildDeepBlue)',
                            cursor: 'pointer',
                            padding: '6px 16px',
                            borderRadius: '5px',
                            fontWeight: 'bold',
                            display: 'flex',
                            justifyContent: 'center',
                            margin: '0 20px 0 0',
                            height: '41px',
                            minHeight: '0px'
                        }}
                        variant='plain'
                        {...backButtonProps} >

                        <ArrowBack
                            style={{
                                margin: '0 5px 2px 0'
                            }} />

                        {backButtonProps.children}
                    </EpistoButton>}

                {/* breadcrumbs */}
                <MUI.Breadcrumbs>

                    {new ArrayBuilder()
                        .addIf(!!currentRoute, <AdminBreadcrumbLink
                            key={1}
                            activeCompanyId={activeCompanyId}
                            isCurrent={!subRoute}
                            route={currentRoute}
                            title={currentRoute.title}
                            iconComponent={currentRoute.icon} />)
                        .addIf(!!subRoute, <AdminBreadcrumbLink
                            activeCompanyId={activeCompanyId}
                            key={2}
                            isCurrent
                            title={subRoute?.title ?? ''} />)
                        .getArray()}
                </MUI.Breadcrumbs>
            </EpistoFlex2>

            {/* spacer */}
            <EpistoFlex2
                flex='1'></EpistoFlex2>

            {/* header component host element */}
            <EpistoFlex2
                id={'HeaderComponentHostElement'}
                ref={headerContentRef}
                align='center'>

                {/* -- headerComponent portal render -- */}
            </EpistoFlex2>

            {/* company selector */}
            {hasPermission('CAN_VIEW_HIDDEN_MENUS') && <CompanySelectorDropdown
                logic={companySelectorLogic} />}
        </EpistoFlex2>

        {/* content  */}
        <AdminBreadcrumbsContext.Provider
            value={contextValue}>

            <EpistoFlex2
                direction="row"
                mt="10px"
                flex="1">

                {children}
            </EpistoFlex2>
        </AdminBreadcrumbsContext.Provider>
    </EpistoFlex2 >;
};
