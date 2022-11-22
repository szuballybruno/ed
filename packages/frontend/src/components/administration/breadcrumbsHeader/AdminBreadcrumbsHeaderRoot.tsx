import { getKeys } from '@episto/commonlogic';
import { Id } from '@episto/commontypes';
import { ArrowBack } from '@mui/icons-material';
import { useCallback } from 'react';
import { applicationRoutes } from '../../../configuration/applicationRoutes';
import { ApplicationRoute } from '../../../models/types';
import { ArrayBuilder, PropsWithChildren, useIsMatchingCurrentRoute } from '../../../static/frontendHelpers';
import { EpistoButton } from '../../controls/EpistoButton';
import { EpistoFlex2 } from '../../controls/EpistoFlex';
import { MUI } from '../../controls/MUIControls';
import { AdminBreadcrumbLink } from './AdminBreadcrumbLink';
import { AdminBreadcrumbsContext, useAdminBreadcrumbsState } from './AdminBreadcrumbsContext';

export type CompanySelectorDropdownType = {
    id: Id<'Company'> | null,
    name: string
}

export const AdminBreadcrumbsHeaderRoot = ({ children }: PropsWithChildren) => {

    const contextValue = useAdminBreadcrumbsState();
    const { backButtonProps, headerComponent, subRouteLabel } = contextValue;

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

    return <EpistoFlex2
        id={AdminBreadcrumbsHeaderRoot.name}
        flex="1"
        direction={'column'}>

        <EpistoFlex2
            justify="space-between"
            align='center'
            minH="38px">

            <EpistoFlex2
                align='center'>

                {backButtonProps &&
                    <EpistoButton
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
                            isCurrent={!subRoute}
                            route={currentRoute}
                            title={currentRoute.title}
                            iconComponent={currentRoute.icon} />)
                        .addIf(!!subRoute, <AdminBreadcrumbLink
                            key={2}
                            isCurrent
                            title={subRoute?.title ?? ''} />)
                        .getArray()}
                </MUI.Breadcrumbs>
            </EpistoFlex2>


            <EpistoFlex2 align='center'>

                {headerComponent}
            </EpistoFlex2>
        </EpistoFlex2>

        {/* children  */}
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
