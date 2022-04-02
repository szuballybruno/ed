import { Box, Container, Flex } from '@chakra-ui/react';
import { Tab, Tabs } from '@mui/material';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCourseDetails } from '../../services/api/courseApiService';
import { useNavigation } from '../../services/core/navigatior';
import { useShowErrorDialog } from '../../services/core/notifications';
import { formatTimespan, getAssetUrl, getQueryParam } from '../../static/frontendHelpers';
import { useIntParam } from '../../static/locationHelpers';
import { translatableTexts } from '../../static/translatableTexts';
import { ContentPane } from '../ContentPane';
import { EpistoButton } from '../controls/EpistoButton';
import { EpistoFont } from '../controls/EpistoFont';
import { EpistoHeader } from '../EpistoHeader';
import { PageRootContainer } from '../PageRootContainer';
import { ProfileImage } from '../ProfileImage';
import { FlexListItem } from '../universal/FlexListItem';
import { CourseDetailsBriefingInfoItem } from './CourseDetailsBriefingInfoItem';
import { CourseDetailsContentSection } from './CourseDetailsContentSection';
import { CourseDetailsRequirementsSection } from './CourseDetailsRequirementsSection';
import { CourseDetailsSummarySection } from './CourseDetailsSummarySection';
import { CourseDetailsTeacherSection } from './CourseDetailsTeacherSection';
import { TabPanel } from './TabPanel';

const CourseDetailsPage = () => {

    const courseId = useIntParam('courseId')!;
    const [currentTab, setCurrentTab] = useState(0);
    const { playCourse } = useNavigation();
    const showError = useShowErrorDialog();

    const { courseDetails } = useCourseDetails(courseId);

    const handlePlayCourse = async () => {

        playCourse(courseId, courseDetails!.stageName, courseDetails!.currentItemCode);
    };

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
        }/* ,
        {
            title: translatableTexts.courseDetails.tabLabels.ratings,
            component: <CourseDetailsRatingSection />
        } */
    ];

    const sidebarInfos = courseDetails
        ? [
            {
                icon: getAssetUrl('/course_page_icons/right_panel_course_lenght.svg'),
                name: 'Kurzus hossza',
                value: formatTimespan(courseDetails!.totalVideoSumLengthSeconds)
            },
            {
                icon: getAssetUrl('/course_page_icons/right_panel_sections.svg'),
                name: 'Témakörök száma',
                value: courseDetails!.totalModuleCount
            },
            {
                icon: getAssetUrl('/course_page_icons/right_panel_videos.svg'),
                name: 'Videók száma',
                value: courseDetails!.totalVideoCount
            },
            {
                icon: getAssetUrl('/course_page_icons/right_panel_questions.svg'),
                name: 'Tudást felmérő kérdések',
                value: courseDetails!.totalVideoQuestionCount
            },
            {
                icon: getAssetUrl('/course_page_icons/right_panel_language.svg'),
                name: 'Nyelv',
                value: courseDetails!.language
            },
            {
                icon: getAssetUrl('/course_page_icons/right_panel_enrolled.svg'),
                name: 'Hányan végezték el eddig',
                value: courseDetails!.previouslyCompletedCount
            },
            {
                icon: getAssetUrl('/course_page_icons/right_panel_updated.svg'),
                name: 'Frissítve',
                value: new Date(courseDetails!.modificationDate)
.toLocaleDateString()
            }
        ]
        : [];

    return <PageRootContainer>

        <ContentPane
            direction="column"
            overflowY="scroll"
            p="0 100px 0 100px">

            {/* Title */}
            <EpistoHeader
                alignSelf="left"
                margin="0px 40px 40px 0px"
                variant="xxl"
                text={courseDetails?.title ?? ''} />

            {/* content */}
            <Flex>

                {/* left pane */}
                <Flex flex="1"
                    direction={'column'}
                    mr={30}>

                    {/* short description */}
                    <Container pr="20px">
                        {courseDetails?.shortDescription}
                    </Container>

                    {/* briefing info items */}
                    <Flex mt="20px"
                        justify="space-evenly">

                        <CourseDetailsBriefingInfoItem
                            icon={getAssetUrl('/course_page_icons/about_category.svg')}
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
                            icon={getAssetUrl('/course_page_icons/about_difficulty.svg')}
                            title={translatableTexts.courseDetails.briefingInfoItems.difficulty}
                            subTitle={courseDetails?.difficulty + ' / 10 pont'} />

                        <CourseDetailsBriefingInfoItem
                            icon={getAssetUrl('/course_page_icons/about_learning_experience.svg')}
                            title={translatableTexts.courseDetails.briefingInfoItems.learningExperience}
                            subTitle={courseDetails?.benchmark + ' / 5 pont'} />
                    </Flex>

                    {/* tabs */}
                    <Flex
                        direction="column"
                        flex="1"
                        width="100%"
                        mt={30}
                        mb={50}
                        background="var(--transparentWhite70)"
                        className="roundBorders mildShadow"
                        p="20px"
                        backdropFilter={'blur(7px)'}>


                        {/* tab button headers */}
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <Tabs
                                className="roundBorders"
                                TabIndicatorProps={{
                                    style: {
                                        display: 'none',
                                    },
                                }}
                                sx={{
                                    '&.MuiTabs-root': {
                                        //background: "var(--transparentIntenseBlue85)",
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        height: 45,
                                        minHeight: 0
                                    }
                                }}
                                value={currentTab}
                                onChange={(_, y) => setCurrentTab(y as number)}>

                                {tabs
                                    .map((x, index) => <Tab
                                        key={index}
                                        sx={{
                                            '&.MuiTab-root': {
                                                color: '#444',
                                                cursor: 'pointer',
                                                backgroundColor: 'transparent',
                                                padding: '6px 16px',
                                                border: 'none',
                                                borderRadius: '5px',
                                                display: 'flex',
                                                justifyContent: 'center',
                                                height: '41px',
                                                minHeight: '0px'
                                            },
                                            '&.MuiTouchRipple-root': {
                                                lineHeight: '0px'
                                            },
                                            '&.Mui-selected': {
                                                color: '#444',
                                                fontWeight: 'bold',
                                                background: 'var(--transparentIntenseTeal)'
                                            }
                                        }}
                                        label={x.title}
                                        id={`simple-tab-${index}`} />)}
                            </Tabs>
                        </Box>

                        <Flex flex="1">
                            { /* tab contents */}
                            {tabs
                                .map((x, index) => <TabPanel
                                    style={{
                                        width: '100%'
                                    }}
                                    value={currentTab}
                                    key={index}
                                    index={index}>

                                    {courseDetails && x.component}
                                </TabPanel>)}
                        </Flex>
                    </Flex>
                </Flex>

                {/* Right pane */}
                <Flex direction={'column'}
                    minWidth="400px"
                    flexBasis="400px">
                    <Flex
                        direction={'column'}
                        alignItems={'center'}
                        margin={10}
                        boxSizing={'border-box'}
                        bg={'white'}
                        height={580}
                        borderWidth={1}
                        borderRadius={10}
                        shadow={'#00000024 0px 0px 5px 0px'}>
                        <Flex width="100%"
                            height={230}
                            justifyContent={'center'}
                            p={10}>
                            <img
                                src={courseDetails?.thumbnailURL}
                                style={{
                                    borderRadius: 5,
                                    objectFit: 'cover'
                                }}
                                alt={''} />
                        </Flex>

                        {/* sidebar infos list */}
                        {sidebarInfos
                            .map((sidebarInfo, index) => (
                                <FlexListItem
                                    key={index}
                                    width="100%"
                                    px={15}
                                    height={40}
                                    thumbnailContent={(
                                        <img
                                            src={sidebarInfo.icon}
                                            style={{
                                                borderRadius: 5,
                                                height: 22,
                                                objectFit: 'cover'
                                            }}
                                            alt={''} />
                                    )}
                                    midContent={(
                                        <Flex flex={1}
                                            p={5}>
                                            <EpistoFont>
                                                {sidebarInfo.name}
                                            </EpistoFont>
                                        </Flex>
                                    )}
                                    endContent={(
                                        <Flex
                                            direction={'row'}
                                            mx={4}
                                            justifyContent={'space-between'}
                                            alignItems={'center'}>

                                            <EpistoFont>
                                                {sidebarInfo.value}
                                            </EpistoFont>
                                        </Flex>
                                    )} />
                            ))}

                        {/* start coures */}
                        <EpistoButton
                            style={{
                                flex: '1',
                                color: 'var(--epistoTeal)',
                                maxHeight: 40,
                                marginTop: 15,
                                marginBottom: 15,
                                display: courseDetails?.canStartCourse ? undefined : 'none'
                            }}
                            variant="outlined"
                            onClick={handlePlayCourse}
                            icon={(
                                <img
                                    src={getAssetUrl('/icons/play2.svg')}
                                    alt=""
                                    style={{
                                        width: '25px',
                                        height: '25px',
                                        marginRight: '5px'
                                    }} />
                            )}>
                            {translatableTexts.courseDetails.startCourse}
                        </EpistoButton>

                    </Flex>

                </Flex>
            </Flex>

            {/* side tit */}
            <Flex
                _before={{
                    position: 'absolute',
                    content: '""',
                    top: -400,
                    left: 500,
                    width: 1000,
                    height: 1000,
                    borderRadius: '50%',
                    backgroundColor: '#EFF9FFFF',
                }}
                position={'absolute'}
                top={0}
                left={0}
                width={'70%'}
                height={300}
                bg={'#eff9ff'}
                zIndex={-1}
                backgroundClip={'padding-box'} />

        </ContentPane>
    </PageRootContainer>;
};

export default CourseDetailsPage;
