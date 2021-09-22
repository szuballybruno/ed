import { Flex } from "@chakra-ui/layout";
import { EditTwoTone, EqualizerTwoTone } from "@mui/icons-material";
import React from "react";
import { applicationRoutes } from "../../../../configuration/applicationRoutes";
import { useAdministratedCourses } from "../../../../services/courseService";
import { useNavigation } from "../../../../services/navigatior";
import { FloatAddButton } from "../../../FloatAddButton";
import { EpistoButton } from "../../../universal/EpistoButton";
import { FlexList } from "../../../universal/FlexList";
import { FlexListItem } from "../../../universal/FlexListItem";
import { FloatSearch } from "../../../universal/FloatSearch";
import { EpistoHeader } from "../../universal/EpistoHeader";

export const CourseAdministration = () => {

    const [searchText, setSearchText] = React.useState("");
    const { courses } = useAdministratedCourses(searchText);

    const { navigate } = useNavigation();

    const navigateToAddUser = () => navigate(applicationRoutes.administrationRoute.coursesRoute.addRoute.route);

    return <Flex direction="column">

        {/* Filter the listed courses */}
        <Flex justify="flex-end">
            <FloatSearch margin="20px" />
        </Flex>

        {/* List of courses */}
        <FlexList padding="10px">
            {courses
                .map(course => {

                    return <FlexListItem
                        align="center"
                        p="5px"
                        height="70px"
                        thumbnailUrl={course.thumbnailImageURL}
                        midContent={<EpistoHeader p="0" text={course.title} />}
                        endContent={<Flex align="center">
                            <EpistoButton variant="colored" style={{ padding: "3px" }}>
                                <EditTwoTone className="square25" />
                            </EpistoButton>
                            <EpistoButton variant="colored" style={{ padding: "3px" }}>
                                <EqualizerTwoTone className="square25" />
                            </EpistoButton>
                        </Flex>}
                    >

                    </FlexListItem>
                })}
        </FlexList>

        <FloatAddButton onClick={navigateToAddUser} />
    </Flex>
}