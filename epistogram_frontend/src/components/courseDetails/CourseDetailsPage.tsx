import { Box, Container, Flex } from "@chakra-ui/react";
import {  Tab, Tabs, Typography } from "@mui/material";
import React, { useState } from 'react';
import { useParams } from "react-router-dom";
import { getAssetUrl, getQueryParam } from "../../frontendHelpers";
import { useCourseDetails, useStartCourse } from "../../services/courseService";
import { useNavigation } from "../../services/navigatior";
import { showNotification, useShowErrorDialog } from "../../services/notifications";
import { MainWrapper } from "../HOC/MainPanels";
import Navbar from "../navbar/Navbar";
import { EpistoButton } from "../universal/EpistoButton";
import { TabPanel } from "./TabPanel";
import {FlexListItem} from "../universal/FlexListItem";
import {FlexListTitleSubtitle} from "../universal/FlexListTitleSubtitle";
import { CourseDetailsRequirementsSection } from "./CourseDetailsRequirementsSection";
import {CourseDetailsSummarySection} from "./CourseDetailsSummarySection";
import {CourseDetailsContentSection} from "./CourseDetailsContentSection";
import {CourseDetailsTeacherSection} from "./CourseDetailsTeacherSection";
import {CourseDetailsRatingSection} from "./CourseDetailsRatingSection";
import {CourseDetailsBriefingInfoItem} from "./CourseDetailsBriefingInfoItem";
import {translatableTexts} from "../../translatableTexts";
import {mockCourseDetails} from "../../mockData";

const CourseDetailsPage = () => {

    const params = useParams<{ courseId: string }>();
    const courseId = parseInt(params.courseId);
    const [currentTab, setCurrentTab] = useState(0);
    const { navigateToPlayer } = useNavigation();
    const showError = useShowErrorDialog();
    const { startCourseAsync } = useStartCourse();
    const currentItemDescriptior = getQueryParam("code");

    const { courseDetails } = useCourseDetails(courseId);
    const thumbnailURL = courseDetails?.thumbnailURL;
    const title = courseDetails?.title;
    const subCategory = courseDetails?.subCategoryName;

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

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setCurrentTab(newValue);
    };

    const a11yProps = (index: number) => {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }

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

        <Flex
            position={"relative"}
            id="rightPanel"
            p={0}
            flex="1"
            overflowX="hidden"
            overflowY="scroll"
            direction="column">

            {/* Title */}

            <Flex
                w={"100%"}
                pl={110}
                pb={10}
                direction={"row"}
                justifyContent={"flex-start"}
                alignItems={"flex-end"}
                minH={140}
                h={140}>
                <Typography variant={"h4"}>{title}</Typography>
            </Flex>

            <Flex direction={"row"} px={100} w={"100%"} minH={1200} h={"100%"} mb={100}>
                <Flex flex={"1 1 0"} direction={"column"} mr={30}>

                    {/* Overview */}

                    <Container pr={20} pt={20}>
                        {mockCourseDetails.upperOverviewBelowTitle}
                    </Container>

                    {/* Briefing info items */}

                    <Flex direction={"row"} mt={20} w={"100%"} justifyContent={"space-evenly"}>

                        <CourseDetailsBriefingInfoItem
                            icon={getAssetUrl("/course_page_icons/about_category.svg")}
                            title={translatableTexts.courseDetails.briefingInfoItems.category}
                            subTitle={subCategory} />

                        <CourseDetailsBriefingInfoItem
                            iconComponent={<MockTeacherAvatar />}
                            title={translatableTexts.courseDetails.briefingInfoItems.teacher}
                            subTitle={mockCourseDetails.briefingInfoItemValues.teacherName} />

                        <CourseDetailsBriefingInfoItem
                            icon={getAssetUrl("/course_page_icons/about_difficulty.svg")}
                            title={translatableTexts.courseDetails.briefingInfoItems.difficulty}
                            subTitle={mockCourseDetails.briefingInfoItemValues.difficulty} />

                        <CourseDetailsBriefingInfoItem
                            icon={getAssetUrl("/course_page_icons/about_learning_experience.svg")}
                            title={translatableTexts.courseDetails.briefingInfoItems.learningExperience}
                            subTitle={mockCourseDetails.briefingInfoItemValues.learningExperience} />

                    </Flex>

                    {/* Tabs and sections */}

                    <Box w={"100%"} mt={30} mb={50}>

                        {/* Tabs */}

                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <Tabs value={currentTab} onChange={handleChange} aria-label="basic tabs example">
                                <Tab label={translatableTexts.courseDetails.tabLabels.overview} {...a11yProps(0)} />
                                <Tab label={translatableTexts.courseDetails.tabLabels.requirements} {...a11yProps(1)} />
                                <Tab label={translatableTexts.courseDetails.tabLabels.content} {...a11yProps(2)} />
                                <Tab label={translatableTexts.courseDetails.tabLabels.teacher} {...a11yProps(3)} />
                                <Tab label={translatableTexts.courseDetails.tabLabels.ratings} {...a11yProps(3)} />
                            </Tabs>
                        </Box>

                        { /* Sections */ }

                        <TabPanel value={currentTab} index={0}>
                            <CourseDetailsSummarySection
                                whatCanYouLearnFromCourseList={mockCourseDetails.whatCanYouLearnFromCourseList}
                                overviewSectionShortDescription={mockCourseDetails.overviewSectionShortDescription}
                                whatSkillsTheCourseImprovingDescription={mockCourseDetails.whatSkillsTheCourseImprovingDescription}
                            />
                        </TabPanel>
                        <TabPanel value={currentTab} index={1}>
                            <CourseDetailsRequirementsSection />
                        </TabPanel>
                        <TabPanel value={currentTab} index={2}>
                            <CourseDetailsContentSection />
                        </TabPanel>
                        <TabPanel value={currentTab} index={3}>
                            <CourseDetailsTeacherSection />
                        </TabPanel>
                        <TabPanel value={currentTab} index={4}>
                            <CourseDetailsRatingSection />
                        </TabPanel>
                    </Box>


                </Flex>

                {/* Right section */}

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
                            <img src={thumbnailURL} style={{
                                borderRadius: 5,
                                objectFit: "cover"
                            }} alt={""} />
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


            {/* Background shapes */}
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

        </Flex>

    </MainWrapper>
};

export default CourseDetailsPage;
