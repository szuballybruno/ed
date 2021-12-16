import { Flex } from "@chakra-ui/react";
import React from 'react';
import { applicationRoutes } from "../../../configuration/applicationRoutes";
//import { mockTasks } from "../../../mockData";
//import { Tasks } from "../../Tasks";
import { AdminSubpageHeader } from "../AdminSubpageHeader";

const AdminUserTasksSubpage = () => {

    return (
        <Flex flex="1" direction="column" bgColor="white" maxW={"100%"}>

            {/* admin header */}
            <AdminSubpageHeader
                tabMenuItems={[
                    applicationRoutes.administrationRoute.usersRoute.editRoute,
                    applicationRoutes.administrationRoute.usersRoute.statsRoute,
                    applicationRoutes.administrationRoute.usersRoute.tasksRoute,
                    applicationRoutes.administrationRoute.usersRoute.teacherInfoRoute
                ]}>

                {/*<Tasks currentTasks={mockTasks} />*/}

            </AdminSubpageHeader>
        </Flex>
    );
};

export default AdminUserTasksSubpage;
