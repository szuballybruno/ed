import { applicationRoutes } from "../../../configuration/applicationRoutes"
import { AdminSubpageHeader } from "../AdminSubpageHeader"

export const AdminHomeDetails = () => {
    return <AdminSubpageHeader tabMenuItems={[{
        route: applicationRoutes.administrationRoute.homeRoute.overviewRoute.route,
        title: applicationRoutes.administrationRoute.homeRoute.overviewRoute.title
    }, {
        route: applicationRoutes.administrationRoute.homeRoute.detailsRoute.route,
        title: applicationRoutes.administrationRoute.homeRoute.detailsRoute.title
    }]}>

    </AdminSubpageHeader>
}