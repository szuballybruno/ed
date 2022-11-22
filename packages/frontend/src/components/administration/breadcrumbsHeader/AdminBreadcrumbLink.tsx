import { AdminActiveCompanyIdType, AdminActiveCompanyRouteParamType, ApplicationRoute } from '../../../models/types';
import { Navigator } from '../../../services/core/navigatior';
import { EpistoDiv } from '../../controls/EpistoDiv';
import { EpistoFlex2 } from '../../controls/EpistoFlex';
import { AdminBreadcrumbsContent } from './AdminBreadcrumbsContent';

export const AdminBreadcrumbLink = (props: {
    title: string,
    isCurrent: boolean,
    iconComponent?: JSX.Element,
    route?: ApplicationRoute,
    activeCompanyId: AdminActiveCompanyIdType
}) => {

    const { route, title, iconComponent, isCurrent, activeCompanyId } = props;
    const isLink = !isCurrent && route;
    const { navigate3 } = Navigator.useNavigation();

    return <EpistoDiv>

        {isLink
            ? (
                <EpistoFlex2
                    cursor="pointer"
                    onClick={() => navigate3(route as ApplicationRoute<AdminActiveCompanyRouteParamType>, { params: { activeCompanyId } })}>

                    <AdminBreadcrumbsContent
                        iconComponent={iconComponent}
                        isCurrent={isCurrent}
                        title={title} />
                </EpistoFlex2>
            )
            : (
                <AdminBreadcrumbsContent
                    iconComponent={iconComponent}
                    isCurrent={isCurrent}
                    title={title} />
            )}
    </EpistoDiv>;
};