import { Flex } from "@chakra-ui/react";
import React from 'react';
import { AdminSubpageHeader } from '../../AdminSubpageHeader';

const CourseStatistics = () => {

    return (
        <Flex flex="1" direction="column" bgColor="white" maxW={"100%"}>

            {/* admin header */}
            <AdminSubpageHeader />

            Course Stats
        </Flex>
    );
};

export default CourseStatistics;
