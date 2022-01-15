import { Flex } from "@chakra-ui/react";
import React from 'react';
import { useParams } from "react-router-dom";
import { applicationRoutes } from "../../../configuration/applicationRoutes";
import { useEditUserData } from "../../../services/api/userApiService";
import { LearningStatistics } from "../../learningInsights/LearningStatistics";
import { AdminSubpageHeader } from "../AdminSubpageHeader";

export const AdminUserStatisticsSubpage = () => {

    const params = useParams<{ userId: string }>();
    const userId = parseInt(params.userId);
    const { userEditData } = useEditUserData(userId);

    return (
        <Flex flex="1" direction="column" bgColor="white" maxW={"100%"}>

            {/* admin header */}
            <AdminSubpageHeader tabMenuItems={[
                applicationRoutes.administrationRoute.usersRoute.editRoute,
                applicationRoutes.administrationRoute.usersRoute.statsRoute
            ].concat(userEditData?.isTeacher ? applicationRoutes.administrationRoute.usersRoute.teacherInfoRoute : [])}>

                <LearningStatistics userId={userId} />

            </AdminSubpageHeader>
        </Flex>
    );
};
