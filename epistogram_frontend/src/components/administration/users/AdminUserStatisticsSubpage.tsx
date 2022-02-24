import { Flex } from "@chakra-ui/react";
import React from 'react';
import { useParams } from "react-router-dom";
import { applicationRoutes } from "../../../configuration/applicationRoutes";
import { useEditUserData } from "../../../services/api/userApiService";
import { LearningStatistics } from "../../learningInsights/LearningStatistics";
import { AdminBreadcrumbsHeader } from "../AdminBreadcrumbsHeader";
import { AdminSubpageHeader } from "../AdminSubpageHeader";
import { AdminUserList } from "./AdminUserList";

export const AdminUserStatisticsSubpage = () => {

    const params = useParams<{ userId: string }>();
    const userId = parseInt(params.userId);
    const { userEditData } = useEditUserData(userId);

    return <AdminBreadcrumbsHeader subRouteLabel={`${userEditData?.lastName} ${userEditData?.firstName}`}>

        <AdminUserList />

        {/* admin header */}
        <AdminSubpageHeader tabMenuItems={[
            applicationRoutes.administrationRoute.usersRoute.editRoute,
            applicationRoutes.administrationRoute.usersRoute.statsRoute
        ].concat(userEditData?.isTeacher ? applicationRoutes.administrationRoute.usersRoute.teacherInfoRoute : [])}>


            <LearningStatistics userId={userId} />

        </AdminSubpageHeader>
    </AdminBreadcrumbsHeader>
};
