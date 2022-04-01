import { Image } from "@chakra-ui/image";
import { Flex } from "@chakra-ui/layout";
import React from "react";
import { CourseAdminListItemDTO } from "../../../shared/dtos/admin/CourseAdminListItemDTO";
import { useIntParam } from "../../../static/locationHelpers";
import { EpistoSearch } from "../../controls/EpistoSearch";
import { FlexList } from "../../universal/FlexList";
import { FlexListItem } from "../../universal/FlexListItem";
import { FlexListTitleSubtitle } from "../../universal/FlexListTitleSubtitle";

export const AdminCourseList = (props: {
    onCourseClick: (courseId: number) => void,
    courses: CourseAdminListItemDTO[]
}) => {

    // props
    const { courses, onCourseClick } = props;

    // util
    const courseId = useIntParam("courseId");

    return <Flex
        className="roundBorders"
        direction="column"
        minW="350px"
        flexBasis="350px"
        mr="5px"
        background="var(--transparentWhite90)">

        <EpistoSearch
            background="white"
            boxShadow="inset 0px -2px 10px -5px #33333315"
            borderRadius="7px 0 0 0" />

        {/* List of courses */}
        <FlexList flex={1}
pb="300px"
flexBasis="350px"
mt="5px"
className="roundBorders"
background="var(--transparentWhite70)">
            {courses
                .map((course, index) => {

                    return <FlexListItem
                        key={index}
                        onClick={() => onCourseClick(course.courseId)}
                        align="center"
                        mb="1"
                        thumbnailContent={
                            <Image
                                src={course.thumbnailImageURL}
                                objectFit="cover"
                                className="roundBorders"
                                style={{
                                    height: 72,
                                    width: 128
                                }}
                            />
                        }
                        midContent={
                            <FlexListTitleSubtitle
                                title={course.title}
                                subTitle={""}
                                isSelected={course.courseId === courseId}
                            />
                        }
                    />;
                })}
        </FlexList>
    </Flex>;
};
