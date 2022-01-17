import { Flex } from "@chakra-ui/react";
import { EpistoHeader } from "../EpistoHeader";
import React from "react";
import { Typography } from "@mui/material";
import { getAssetUrl } from "../../static/frontendHelpers";
import { EpistoButton } from "../controls/EpistoButton";
import { CourseDetailsDTO } from "../../models/shared_models/CourseDetailsDTO";
import { ProfileImage } from "../ProfileImage";

export const CourseDetailsTeacherSection = (props: {
    courseDetails: CourseDetailsDTO
}) => {

    const { courseDetails } = props;

    const infoCards = [
        {
            icon: getAssetUrl("/course_page_icons/teacher_courses.svg"),
            title: `${courseDetails.teacherData.teacherCourseCount} kurzus`
        },
        {
            icon: getAssetUrl("/course_page_icons/teacher_videos.svg"),
            title: `${courseDetails.teacherData.teacherVideoCount} videó`
        },
        {
            icon: getAssetUrl("/course_page_icons/teacher_enrolled.svg"),
            title: `${courseDetails.teacherData.teacherStudentCount} hallgató`
        },
        {
            icon: getAssetUrl("/course_page_icons/teacher_review.svg"),
            title: `${courseDetails.teacherData.teacherRating} értékelés`
        }
    ];

    return <Flex
        direction={"column"}>

        <EpistoHeader
            text={"Az oktatóról"}
            my={10} />

        {/* header  */}
        <Flex
            bg="white"
            className="mildShadow"
            borderRadius="15px"
            padding="10px"
            justify="space-between"
            align="center">

            {/* basics */}
            <Flex align="center">

                {/* profile picture */}
                <ProfileImage
                    url={courseDetails.teacherData.teacherAvatarFilePath}
                    firstName={courseDetails.teacherData.teacherFirstName}
                    lastName={courseDetails.teacherData.teacherLastName}
                    className="square50" />

                {/* details */}
                <Flex flexDir={"column"} marginLeft="10px">

                    {/* full name */}
                    <Typography style={{
                        fontWeight: "bold",
                        fontSize: "0.9em"
                    }}>
                        {courseDetails.teacherData.teacherFullName}
                    </Typography>

                    {/* teacher skills  */}
                    <Typography
                        style={{
                            fontSize: "0.8em"
                        }}>

                        {courseDetails.teacherData.teacherSkills}
                    </Typography>
                </Flex>
            </Flex>

            {/* badges */}
            <Flex>
                {courseDetails
                    .teacherData
                    .teacherBadges
                    .map(badge => {

                        return <Flex
                            direction="column"
                            align="center"
                            p="10px"
                            bg="gold"
                            className="mildShadow"
                            borderRadius="10px">

                            <img
                                className="square35"
                                style={{
                                    filter: "invert(1)"
                                }}
                                src={getAssetUrl("/course_page_icons/teacher_award.svg")} />

                            <Typography className="fontLight">
                                {badge}
                            </Typography>
                        </Flex>
                    })}
            </Flex>
        </Flex>

        {/* info cards */}
        <Flex
            height={70}
            justifyContent={"space-between"}>

            {infoCards
                .map(infoCard => <Flex
                    width={160}
                    mx={20}
                    alignItems={"center"}>

                    {/* icon */}
                    <img
                        style={{
                            width: 30
                        }}
                        src={infoCard.icon}
                        alt={""} />

                    {/* text */}
                    <Typography
                        style={{
                            marginLeft: 5
                        }}>

                        {infoCard.title}
                    </Typography>
                </Flex>)}
        </Flex>

        {/* description */}
        <Typography>
            {courseDetails.teacherData.teacherDescription}
        </Typography>

        {/* more courses 
        <Flex height={70} width="100%" alignItems={"center"} justifyContent={"center"}>
            <EpistoButton variant={"outlined"}>
                {courseDetails.teacherData.teacherFullName} további kurzusai
            </EpistoButton>
        </Flex>*/}
    </Flex>
}
