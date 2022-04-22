import { Flex } from '@chakra-ui/react';
import React from 'react';
import { CourseDetailsDTO } from '../../shared/dtos/CourseDetailsDTO';
import { Environment } from '../../static/Environemnt';

import { EpistoFont } from '../controls/EpistoFont';
import { EpistoHeader } from '../EpistoHeader';
import { ProfileImage } from '../ProfileImage';

export const CourseDetailsTeacherSection = (props: {
    courseDetails: CourseDetailsDTO
}) => {

    const { courseDetails } = props;

    const infoCards = [
        {
            icon: Environment.getAssetUrl('/course_page_icons/teacher_courses.svg'),
            title: `${courseDetails.teacherData.teacherCourseCount} kurzus`
        },
        {
            icon: Environment.getAssetUrl('/course_page_icons/teacher_videos.svg'),
            title: `${courseDetails.teacherData.teacherVideoCount} videó`
        },
        {
            icon: Environment.getAssetUrl('/course_page_icons/teacher_enrolled.svg'),
            title: `${courseDetails.teacherData.teacherStudentCount} hallgató`
        },
        {
            icon: Environment.getAssetUrl('/course_page_icons/teacher_review.svg'),
            title: `${courseDetails.teacherData.teacherRating} értékelés`
        }
    ];

    return <Flex
        direction={'column'}>

        <EpistoHeader
            text={'Az oktatóról'}
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
                <Flex flexDir={'column'}
                    marginLeft="10px">

                    {/* full name */}
                    <EpistoFont
                        fontSize={'fontNormal14'}
                        style={{
                            fontWeight: 'bold'
                        }}>

                        {courseDetails.teacherData.teacherFullName}
                    </EpistoFont>

                    {/* teacher skills  */}
                    <EpistoFont
                        fontSize="fontSmall">

                        {courseDetails.teacherData.teacherSkills}
                    </EpistoFont>
                </Flex>
            </Flex>

            {/* badges */}
            <Flex>
                {courseDetails
                    .teacherData
                    .teacherBadges
                    .map((badge, index) => {

                        return <Flex
                            key={index}
                            direction="column"
                            align="center"
                            p="10px"
                            bg="gold"
                            className="mildShadow"
                            borderRadius="10px">

                            <img
                                className="square35"
                                style={{
                                    filter: 'invert(1)'
                                }}
                                src={Environment.getAssetUrl('/course_page_icons/teacher_award.svg')} />

                            <EpistoFont
                                classes={['fontLight']}>

                                {badge}
                            </EpistoFont>
                        </Flex>;
                    })}
            </Flex>
        </Flex>

        {/* info cards */}
        <Flex
            height={70}
            justifyContent={'space-between'}>

            {infoCards
                .map((infoCard, index) => <Flex
                    key={index}
                    width={160}
                    mx={20}
                    alignItems={'center'}>

                    {/* icon */}
                    <img
                        style={{
                            width: 30
                        }}
                        src={infoCard.icon}
                        alt={''} />

                    {/* text */}
                    <EpistoFont
                        style={{
                            marginLeft: 5
                        }}>

                        {infoCard.title}
                    </EpistoFont>
                </Flex>)}
        </Flex>

        {/* description */}
        <EpistoFont>
            {courseDetails.teacherData.teacherDescription}
        </EpistoFont>

        {/* more courses 
        <Flex height={70} width="100%" alignItems={"center"} justifyContent={"center"}>
            <EpistoButton variant={"outlined"}>
                {courseDetails.teacherData.teacherFullName} további kurzusai
            </EpistoButton>
        </Flex>*/}
    </Flex>;
};
