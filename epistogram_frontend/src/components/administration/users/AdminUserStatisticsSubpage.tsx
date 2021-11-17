import { Flex } from "@chakra-ui/react";
import React from 'react';
import { applicationRoutes } from "../../../configuration/applicationRoutes";
import { LearningStatistics } from "../../learningStatistics/LearningStatistics";
import { AdminSubpageHeader } from "../AdminSubpageHeader";

export const AdminUserStatisticsSubpage = () => {

    return (
        <Flex flex="1" direction="column" bgColor="white" maxW={"100%"}>

            {/* admin header */}
            <AdminSubpageHeader tabMenuItems={[
                applicationRoutes.administrationRoute.usersRoute.editRoute,
                applicationRoutes.administrationRoute.usersRoute.statsRoute,
                applicationRoutes.administrationRoute.usersRoute.tasksRoute
            ]}>

                <LearningStatistics />

            </AdminSubpageHeader>
        </Flex>
    );
};
