import { NavLink } from 'react-router-dom';
import { ApplicationRoute } from '../../../models/types';
import { EpistoDiv } from '../../controls/EpistoDiv';
import { AdminBreadcrumbsContent } from './AdminBreadcrumbsContent';

export const AdminBreadcrumbLink = (props: {
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

                    <AdminBreadcrumbsContent
                        iconComponent={iconComponent}
                        isCurrent={isCurrent}
                        title={title} />
                </NavLink>
            )
            : (
                <AdminBreadcrumbsContent
                    iconComponent={iconComponent}
                    isCurrent={isCurrent}
                    title={title} />
            )}
    </EpistoDiv>;
};