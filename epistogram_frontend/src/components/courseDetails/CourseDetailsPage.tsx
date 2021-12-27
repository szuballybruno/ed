import { Box, Container, Flex } from "@chakra-ui/react";
import { Tab, Tabs, Typography } from "@mui/material";
import React, { useState } from 'react';
import { useParams } from "react-router-dom";
import { getAssetUrl, getQueryParam } from "../../static/frontendHelpers";
import { useNavigation } from "../../services/core/navigatior";
import { showNotification, useShowErrorDialog } from "../../services/core/notifications";
import { ContentWrapper, MainWrapper } from "../system/MainPanels";
import Navbar from "../navbar/Navbar";
import { EpistoButton } from "../universal/EpistoButton";
import { TabPanel } from "./TabPanel";
import { FlexListItem } from "../universal/FlexListItem";
import { FlexListTitleSubtitle } from "../universal/FlexListTitleSubtitle";
import { CourseDetailsRequirementsSection } from "./CourseDetailsRequirementsSection";
import { CourseDetailsSummarySection } from "./CourseDetailsSummarySection";
import { CourseDetailsContentSection } from "./CourseDetailsContentSection";
import { CourseDetailsTeacherSection } from "./CourseDetailsTeacherSection";
import { CourseDetailsRatingSection } from "./CourseDetailsRatingSection";
import { CourseDetailsBriefingInfoItem } from "./CourseDetailsBriefingInfoItem";
import { translatableTexts } from "../../static/translatableTexts";
import { mockCourseDetails } from "../../static/mockData";
import { useStartCourse, useCourseDetails } from "../../services/api/courseApiService";
import { EpistoHeader } from "../EpistoHeader";
import { ProfileImage } from "../ProfileImage";

const CourseDetailsPage = () => {

    const params = useParams<{ courseId: string }>();
    const courseId = parseInt(params.courseId);
    const [currentTab, setCurrentTab] = useState(0);
    const { navigateToPlayer } = useNavigation();
    const showError = useShowErrorDialog();
    const { startCourseAsync } = useStartCourse();
    const currentItemDescriptior = getQueryParam("code");

    const { courseDetails } = useCourseDetails(courseId);

    const playCourseAsync = async () => {

        try {

            if (currentItemDescriptior) {

                navigateToPlayer(currentItemDescriptior);
            }
            else {

                const { text: firstItemDescriptor } = await startCourseAsync(courseId);

                if (firstItemDescriptor) {

                    navigateToPlayer(firstItemDescriptor);
                }
                else {

                    showNotification(translatableTexts.courseDetails.cannotStartCourseNotification, "warning");
                }
            }
        }
        catch (e) {

            showError(e);
        }
    }

    const tabs = [
        {
            title: translatableTexts.courseDetails.tabLabels.overview,
            component: <CourseDetailsSummarySection courseDetails={courseDetails!} />
        },
        {
            title: translatableTexts.courseDetails.tabLabels.requirements,
            component: <CourseDetailsRequirementsSection courseDetails={courseDetails!} />
        },
        {
            title: translatableTexts.courseDetails.tabLabels.content,
            component: <CourseDetailsContentSection courseDetails={courseDetails!} />
        },
        {
            title: translatableTexts.courseDetails.tabLabels.teacher,
            component: <CourseDetailsTeacherSection courseDetails={courseDetails!} />
        },
        {
            title: translatableTexts.courseDetails.tabLabels.ratings,
            component: <CourseDetailsRatingSection />
        }
    ];

    const MockTeacherAvatar = () =>
        <Flex
            w={50}
            h={50}
            className={"circle"}
            border="2px solid var(--epistoTeal)"
            bg="var(--deepBlue)"
            color="white"
            alignItems={"center"}
            justifyContent={"center"}>
            <Typography>
                {mockCourseDetails.teacherNameShort}
            </Typography>
        </Flex>

    return <MainWrapper>

        <Navbar />

        <ContentWrapper
            direction="column"
            overflowY="scroll"
            px="100px">

            {/* Title */}
            <EpistoHeader
                alignSelf="center"
                margin="80px 40px 40px 40px"
                variant="xxl"
                text={courseDetails?.title ?? ""} />

            {/* content */}
            <Flex>

                {/* left pane */}
                <Flex flex={"1 1 0"} direction={"column"} mr={30}>

                    {/* short description */}
                    <Container pr="20px">
                        {courseDetails?.shortDescription}
                    </Container>

                    {/* briefing info items */}
                    <Flex mt="20px" justify="space-evenly">

                        <CourseDetailsBriefingInfoItem
                            icon={getAssetUrl("/course_page_icons/about_category.svg")}
                            title={translatableTexts.courseDetails.briefingInfoItems.category}
                            subTitle={courseDetails?.subCategoryName} />

                        {courseDetails && <CourseDetailsBriefingInfoItem
                            icon={<ProfileImage
                                className="square50"
                                url={courseDetails!.teacherData.teacherAvatarFilePath}
                                firstName={courseDetails!.teacherData.teacherFirstName}
                                lastName={courseDetails!.teacherData.teacherLastName} />}
                            title={translatableTexts!.courseDetails.briefingInfoItems.teacher}
                            subTitle={courseDetails!.teacherData.teacherFullName} />}

                        <CourseDetailsBriefingInfoItem
                            icon={getAssetUrl("/course_page_icons/about_difficulty.svg")}
                            title={translatableTexts.courseDetails.briefingInfoItems.difficulty}
                            subTitle={courseDetails?.difficulty + " / 10 pont"} />

                        <CourseDetailsBriefingInfoItem
                            icon={getAssetUrl("/course_page_icons/about_learning_experience.svg")}
                            title={translatableTexts.courseDetails.briefingInfoItems.learningExperience}
                            subTitle={courseDetails?.benchmark + " / 5 pont"} />
                    </Flex>

                    {/* tabs */}
                    <Box w={"100%"} mt={30} mb={50}>

                        {/* tab button headers */}
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <Tabs
                                value={currentTab}
                                onChange={(_, y) => setCurrentTab(y as number)}>

                                {tabs
                                    .map((x, index) => <Tab
                                        label={x.title}
                                        key={index}
                                        id={`simple-tab-${index}`} />)}
                            </Tabs>
                        </Box>

                        { /* tab contents */}
                        {tabs
                            .map((x, index) => <TabPanel
                                value={currentTab}
                                index={index}>

                                {courseDetails && x.component}
                            </TabPanel>)}
                    </Box>
                </Flex>

                {/* Right pane */}
                <Flex direction={"column"} w={400}>
                    <Flex
                        direction={"column"}
                        alignItems={"center"}
                        margin={10}
                        boxSizing={"border-box"}
                        bg={"white"}
                        h={580}
                        borderWidth={1}
                        borderRadius={10}
                        shadow={"#00000024 0px 0px 5px 0px"}>
                        <Flex w={"100%"} height={230} justifyContent={"center"} p={10}>
                            <img
                                src={courseDetails?.thumbnailURL}
                                style={{
                                    borderRadius: 5,
                                    objectFit: "cover"
                                }}
                                alt={""} />
                        </Flex>

                        {/* Course details list */}

                        {mockCourseDetails.shortCourseDetails.map(course => <FlexListItem
                            w={"100%"}
                            px={15}
                            h={40}
                            thumbnailContent={<img src={course.icon} style={{
                                borderRadius: 5,
                                height: 22,
                                objectFit: "cover"
                            }} alt={""} />}
                            midContent={<Flex flex={1} p={5}>
                                <Typography>{course.detailName}</Typography>
                            </Flex>}
                            endContent={<Flex direction={"row"} mx={4} justifyContent={"space-between"} alignItems={"center"}>
                                <Typography>{course.detailValue}</Typography>
                            </Flex>}
                        />)}

                        {/* start coures */}
                        <EpistoButton
                            style={{ flex: "1", color: "var(--epistoTeal)", maxHeight: 40, marginTop: 15, marginBottom: 15 }}
                            variant="outlined"
                            onClick={playCourseAsync}
                            icon={
                                <img
                                    src={getAssetUrl("/icons/play2.svg")}
                                    alt=""
                                    style={{
                                        width: "25px",
                                        height: "25px",
                                        marginRight: "5px"
                                    }} />
                            }>
                            {translatableTexts.courseDetails.startCourse}
                        </EpistoButton>

                    </Flex>

                    {/* Recommended courses section */}
                    <Flex direction={"column"} w={400}>
                        <Flex
                            direction={"column"}
                            alignItems={"center"}
                            margin={10}
                            boxSizing={"border-box"}
                            bg={"white"}
                            h={500}
                            borderWidth={1}
                            borderRadius={10}
                            shadow={"#00000024 0px 0px 5px 0px"}>
                            <Flex w={"100%"} height={60} justifyContent={"center"} alignItems={"center"} p={10}>
                                <Typography>{translatableTexts.courseDetails.recommendedCoursesTitle}</Typography>
                            </Flex>

                            {mockCourseDetails.recommendedCourses.map(course => [
                                <FlexListItem
                                    w={"100%"}
                                    midContent={
                                        <FlexListTitleSubtitle title={course.title} subTitle={course.subTitle} />
                                    } />
                            ])}

                        </Flex>
                    </Flex>

                </Flex>
            </Flex>

            {/* side tit */}
            <Flex
                _before={{
                    position: "absolute",
                    content: `""`,
                    top: -400,
                    left: 500,
                    width: 1000,
                    height: 1000,
                    borderRadius: "50%",
                    backgroundColor: "#EFF9FFFF",
                }}
                position={"absolute"}
                top={0}
                left={0}
                w={"70%"}
                h={300}
                bg={"#eff9ff"}
                zIndex={-1}
                backgroundClip={"padding-box"} />

        </ContentWrapper>
    </MainWrapper >
};

export default CourseDetailsPage;
