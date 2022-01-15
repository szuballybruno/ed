import { Box } from "@chakra-ui/react";
import { useCourseOverviewData } from "../../services/api/miscApiService";

export const CourseOverview = () => {

    const { courseOverviewData } = useCourseOverviewData();

    console.log(courseOverviewData);

    return (
        <Box>
            asd
        </Box>
    )
};