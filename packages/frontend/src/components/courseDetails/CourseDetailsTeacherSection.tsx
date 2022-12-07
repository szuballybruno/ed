import React from 'react';
import {CourseDetailsDTO} from '@episto/communication';
import {Environment} from '../../static/Environemnt';
import {EpistoFlex2} from '../controls/EpistoFlex';

import {EpistoFont} from '../controls/EpistoFont';
import {EpistoHeader} from '../EpistoHeader';
import {ProfileImage} from '../ProfileImage';

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

    return <EpistoFlex2
        direction={'column'}>

        <EpistoHeader
            text={'Az oktatóról'}
            my='10px' />

        {/* header  */}
        <EpistoFlex2
            bg="white"
            className="mildShadow"
            borderRadius="15px"
            padding="10px"
            justify="space-between"
            align="center">

            {/* basics */}
            <EpistoFlex2 align="center">

                {/* profile picture */}
                <ProfileImage
                    url={courseDetails.teacherData.teacherAvatarFilePath}
                    firstName={courseDetails.teacherData.teacherFirstName}
                    lastName={courseDetails.teacherData.teacherLastName}
                    className="square50" />

                {/* details */}
                <EpistoFlex2 flexDir={'column'}
                    marginLeft="10px">

                    {/* full name */}
                    <EpistoFont
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
                </EpistoFlex2>
            </EpistoFlex2>

            {/* badges */}
            <EpistoFlex2>
                {courseDetails
                    .teacherData
                    .teacherBadges
                    .map((badge, index) => {

                        return <EpistoFlex2
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
                                color='fontLight'>

                                {badge}
                            </EpistoFont>
                        </EpistoFlex2>;
                    })}
            </EpistoFlex2>
        </EpistoFlex2>

        {/* info cards */}
        <EpistoFlex2
            height='70px'
            justifyContent={'space-between'}>

            {infoCards
                .map((infoCard, index) => <EpistoFlex2
                    key={index}
                    width='160px'
                    mx='20px'
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
                </EpistoFlex2>)}
        </EpistoFlex2>

        {/* description */}
        <EpistoFont>
            {courseDetails.teacherData.teacherDescription}
        </EpistoFont>

        {/* more courses
        <EpistoFlex2 height={70} width="100%" alignItems={"center"} justifyContent={"center"}>
            <EpistoButton variant={"outlined"}>
                {courseDetails.teacherData.teacherFullName} további kurzusai
            </EpistoButton>
        </EpistoFlex2>*/}
    </EpistoFlex2>;
};
