import { ArrowBack } from '@mui/icons-material';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { ReactNode, useCallback } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { applicationRoutes } from '../../configuration/applicationRoutes';
import { ApplicationRoute } from '../../models/types';
import { CourseApiService } from '../../services/api/courseApiService';
import { useShopItemBriefData } from '../../services/api/shopApiService';
import { getKeys } from '../../shared/logic/sharedLogic';
import { Id } from '../../shared/types/versionId';
import { ArrayBuilder, useIsMatchingCurrentRoute } from '../../static/frontendHelpers';
import { EpistoButton, EpistoButtonPropsType } from '../controls/EpistoButton';
import { EpistoDiv } from '../controls/EpistoDiv';
import { EpistoFlex2, EpistoFlex2Props } from '../controls/EpistoFlex';
import { EpistoFont } from '../controls/EpistoFont';

const Content = (props: {
    isCurrent: boolean,
    title: string
    iconComponent?: JSX.Element,
}) => {

    const { iconComponent, isCurrent, title } = props;

    return (
        <EpistoFlex2>

            {iconComponent && <EpistoFlex2
                width='27px'
                height="100%"
                m={'2px 10px 2px 2px'}>

                {iconComponent}
            </EpistoFlex2>}

            <EpistoFont
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    fontWeight: isCurrent ? 'bold' : undefined,
                    alignItems: 'center',
                    padding: '0 2px 0 5px'
                }}>

                {title}
            </EpistoFont>
        </EpistoFlex2>
    );
};

export type CompanySelectorDropdownType = {
    id: Id<'Company'> | null,
    name: string
}

export const BreadcrumbLink = (props: {
    title: string,
    isCurrent: boolean,
    iconComponent?: JSX.Element,
    route?: ApplicationRoute,
}) => {

    const { route, title, iconComponent, isCurrent } = props;
    const isLink = !isCurrent && route;

    return <EpistoDiv>

        {isLink
            ? (
                <NavLink
                    to={route.route.getAbsolutePath()}>

                    <Content
                        iconComponent={iconComponent}
                        isCurrent={isCurrent}
                        title={title} />
                </NavLink>
            )
            : (
                <Content
                    iconComponent={iconComponent}
                    isCurrent={isCurrent}
                    title={title} />
            )}
    </EpistoDiv>;
};

export const AdminBreadcrumbsHeader = ({
    subRouteLabel,
    children,
    backButtonProps,
    headerComponent,
    ...css
}: {
    children?: ReactNode,
    subRouteLabel?: string,
    backButtonProps?: EpistoButtonPropsType,
    viewSwitchChecked?: boolean,
    viewSwitchFunction?: (checked: boolean) => void,
    headerComponent?: ReactNode
} & EpistoFlex2Props) => {

    // params
    // TODO move this to the callsite 
    const urlParams = useParams<{
        userId: string,
        courseId: string,
        videoId: string,
        examId: string,
        shopItemId: string
    }>();

    const userId = urlParams.userId
        ? Id.create<'User'>(parseInt(urlParams.userId))
        : null;

    const courseId = urlParams.courseId
        ? Id.create<'Course'>(parseInt(urlParams.courseId))
        : null;

    const shopItemId = urlParams.shopItemId
        ? Id.create<'ShopItem'>(parseInt(urlParams.shopItemId))
        : null;

    // util
    const isMatchingCurrentRoute = useIsMatchingCurrentRoute();

    // http
    const { courseBriefData } = CourseApiService.useCourseBriefData(courseId);
    const { shopItemBriefData } = useShopItemBriefData(shopItemId);

    // calc
    const getCurrentRoute = useCallback(() => {

        const isApplicationRoute = (obj: any) => !!obj.route;

        return getKeys(applicationRoutes.administrationRoute)
            .map(x => applicationRoutes.administrationRoute[x] as ApplicationRoute)
            .filter(x => isApplicationRoute(x))
            .single(route => isMatchingCurrentRoute(route).isMatchingRoute);
    }, [isMatchingCurrentRoute]);

    const currentRoute = getCurrentRoute();

    const subRouteName = subRouteLabel
        ? subRouteLabel
        : (courseBriefData?.title || shopItemBriefData?.name);

    const subRoute = subRouteName
        ? { title: subRouteName! }
        : null;

    return <EpistoFlex2
        id={AdminBreadcrumbsHeader.name}
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
                <Breadcrumbs>

                    {new ArrayBuilder()
                        .addIf(!!currentRoute, <BreadcrumbLink
                            key={1}
                            isCurrent={!subRoute}
                            route={currentRoute}
                            title={currentRoute.title}
                            iconComponent={currentRoute.icon} />)
                        .addIf(!!subRoute, <BreadcrumbLink
                            key={2}
                            isCurrent
                            title={subRoute?.title ?? ''} />)
                        .getArray()}
                </Breadcrumbs>
            </EpistoFlex2>


            <EpistoFlex2 align='center'>

                {headerComponent}
            </EpistoFlex2>
        </EpistoFlex2>

        {/* children  */}
        <EpistoFlex2
            direction="row"
            mt="10px"
            flex="1"
            {...css}>

            {children}
        </EpistoFlex2>
    </EpistoFlex2 >;
};
