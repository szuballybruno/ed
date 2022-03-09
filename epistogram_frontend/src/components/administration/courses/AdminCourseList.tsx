import { Image } from "@chakra-ui/image";
import { Flex } from "@chakra-ui/layout";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { applicationRoutes } from "../../../configuration/applicationRoutes";
import { useAdminCourseList, useCreateCourse, useDeleteCourse } from "../../../services/api/courseApiService";
import { useNavigation } from "../../../services/core/navigatior";
import { CourseAdminListItemDTO } from "../../../shared/dtos/CourseAdminListItemDTO";
import { EpistoSearch } from "../../controls/EpistoSearch";
import { FlexList } from "../../universal/FlexList";
import { FlexListItem } from "../../universal/FlexListItem";
import { FlexListTitleSubtitle } from "../../universal/FlexListTitleSubtitle";

export const AdminCourseList = (props: {
    courses: CourseAdminListItemDTO[]
    navigationFunction: (courseId: number) => void
}) => {
    const { courses, navigationFunction } = props

    const params = useParams<{ courseId: string }>();
    const courseId = parseInt(params.courseId);

    return <Flex direction="column">

        <EpistoSearch />

        {/* List of courses */}
        <FlexList flex={1} pb="300px" flexBasis="350px" mt="5px" className="roundBorders" background="var(--transparentWhite70)">
            {courses
                .map(course => {

                    return <FlexListItem
                        onClick={() => {
                            navigationFunction(course.courseId)
                        }}
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
                    />
                })}
        </FlexList>
    </Flex>
}
