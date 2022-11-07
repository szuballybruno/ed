import { HasPermissionFnType } from '../components/system/AuthorizationContext';
import { ApplicationRoute } from '../models/types';

export const RouteHelpers = {

    isRouteAuthoirzedToVisit: (route: ApplicationRoute, hasPermission: HasPermissionFnType) => {

        return route.isAuthoirziedToVisit
            ? route.isAuthoirziedToVisit(hasPermission)
            : true;
    }
};