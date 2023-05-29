import { Id } from '@episto/commontypes';
import { CourseDetailsDTO } from '@episto/communication';
import { useEffect, useState } from 'react';
import { Responsivity } from '../../helpers/responsivity';
import { Environment } from '../../static/Environemnt';
import { ArrayBuilder } from '../../static/frontendHelpers';
import { translatableTexts } from '../../static/translatableTexts';
import { EpistoHeader } from '../EpistoHeader';
import { ProfileImage } from '../ProfileImage';
import { useAdminCourseContentDialogLogic } from '../administration/users/adminCourseContentDialog/AdminCourseContentDialogLogic';
import { AdminUserCourseContentDialog } from '../administration/users/adminCourseContentDialog/AdminUserCourseContentDialog';
import { EpistoButton } from '../controls/EpistoButton';
import { EpistoFlex2 } from '../controls/EpistoFlex';
import { EpistoFont } from '../controls/EpistoFont';
import { EpistoGrid } from '../controls/EpistoGrid';
import { EpistoTabs } from '../controls/EpistoTabs';
import { ContentPane } from '../pageRootContainer/ContentPane';
import { RootContainerBackground } from '../pageRootContainer/RootContainerBackground';
import { useCheckFeatureEnabled } from '../system/CheckFeatureFrame';
import { FlexListItem } from '../universal/FlexListItem';
import { CourseDetailsBriefingInfoItem } from './CourseDetailsBriefingInfoItem';
import { CourseDetailsContentSection } from './CourseDetailsContentSection';
import { CourseDetailsSidebarInfoType } from './CourseDetailsPage';
import { CourseDetailsRequirementsSection } from './CourseDetailsRequirementsSection';
import { CourseDetailsSummarySection } from './CourseDetailsSummarySection';
import { CourseDetailsTeacherSection } from './CourseDetailsTeacherSection';
import { TabPanel } from './TabPanel';

type SectionType =
    'COURSE_DETAILS_PAGE_SUMMARY_SECTION'
    | 'COURSE_DETAILS_PAGE_REQUIREMENTS_SECTION'
    | 'COURSE_DETAILS_PAGE_CONTENT_SECTION'
    | 'COURSE_DETAILS_PAGE_TEACHER_SECTION'

export const DesktopCourseDetailsPage = ({
    userId,
    courseDetails,
    currentColor,
    handlePlayCourse,
    sidebarInfos
}: {
    userId: Id<'User'>
    courseDetails: CourseDetailsDTO,
    currentColor: string,
    handlePlayCourse: () => void,
    sidebarInfos: CourseDetailsSidebarInfoType[]
}) => {

    const { adminCourseContentDialogLogic } = useAdminCourseContentDialogLogic();
    const [currentTab, setCurrentTab] = useState<SectionType | undefined>();
    const isCourseStarted = courseDetails?.currentItemCode;
    const isSmallerThan1320 = Responsivity.useIsSmallerThan('1320px');

    const { isFeatureEnabled: isCourseDetailsSummarySectionEnabled } = useCheckFeatureEnabled({
        courseId: courseDetails.courseId,
        featureCode: 'COURSE_DETAILS_PAGE_SUMMARY_SECTION'
    });
    const { isFeatureEnabled: isCourseDetailsRequirementsSectionEnabled } = useCheckFeatureEnabled({
        courseId: courseDetails.courseId,
        featureCode: 'COURSE_DETAILS_PAGE_REQUIREMENTS_SECTION'
    });
    const { isFeatureEnabled: isCourseDetailsContentSectionEnabled } = useCheckFeatureEnabled({
        courseId: courseDetails.courseId,
        featureCode: 'COURSE_DETAILS_PAGE_CONTENT_SECTION'
    });
    const { isFeatureEnabled: isCourseDetailsTeacherSectionEnabled } = useCheckFeatureEnabled({
        courseId: courseDetails.courseId,
        featureCode: 'COURSE_DETAILS_PAGE_TEACHER_SECTION'
    });

    const { isFeatureEnabled: isCourseDetailsCategoryTileEnabled } = useCheckFeatureEnabled({
        courseId: courseDetails.courseId,
        featureCode: 'COURSE_DETAILS_PAGE_CATEGORY_TILE'
    });
    const { isFeatureEnabled: isCourseDetailsTeacherTileEnabled } = useCheckFeatureEnabled({
        courseId: courseDetails.courseId,
        featureCode: 'COURSE_DETAILS_PAGE_TEACHER_TILE'
    });
    const { isFeatureEnabled: isCourseDetailsDifficultyTileEnabled } = useCheckFeatureEnabled({
        courseId: courseDetails.courseId,
        featureCode: 'COURSE_DETAILS_PAGE_DIFFICULTY_TILE'
    });
    const { isFeatureEnabled: isCourseDetailsLearningExperienceTileEnabled } = useCheckFeatureEnabled({
        courseId: courseDetails.courseId,
        featureCode: 'COURSE_DETAILS_PAGE_LEARNING_EXPERIENCE_TILE'
    });


    const desktopTabs = new ArrayBuilder()
        .addIf(isCourseDetailsSummarySectionEnabled,
            {
                key: 'COURSE_DETAILS_PAGE_SUMMARY_SECTION',
                title: translatableTexts.courseDetails.tabLabels.overview,
                component: <CourseDetailsSummarySection
                    courseDetails={courseDetails} />
            }
        )
        .addIf(isCourseDetailsRequirementsSectionEnabled,
            {
                key: 'COURSE_DETAILS_PAGE_REQUIREMENTS_SECTION',
                title: translatableTexts.courseDetails.tabLabels.requirements,
                component: <CourseDetailsRequirementsSection
                    courseDetails={courseDetails} />
            })
        .addIf(isCourseDetailsContentSectionEnabled,
            {
                key: 'COURSE_DETAILS_PAGE_CONTENT_SECTION',
                title: translatableTexts.courseDetails.tabLabels.content,
                component: <CourseDetailsContentSection
                    courseDetails={courseDetails} />
            })
        .addIf(isCourseDetailsTeacherSectionEnabled,
            {
                key: 'COURSE_DETAILS_PAGE_TEACHER_SECTION',
                title: translatableTexts.courseDetails.tabLabels.teacher,
                component: <CourseDetailsTeacherSection
                    courseDetails={courseDetails} />
            })
        .getArray();

    useEffect(() => {

        if (isCourseStarted && isCourseDetailsContentSectionEnabled && currentTab === undefined) {
            return setCurrentTab('COURSE_DETAILS_PAGE_CONTENT_SECTION');
        }

        if (!isCourseStarted && isCourseDetailsSummarySectionEnabled && currentTab === undefined) {
            return setCurrentTab('COURSE_DETAILS_PAGE_SUMMARY_SECTION');
        }

        if (isCourseDetailsRequirementsSectionEnabled && currentTab === undefined)
            return setCurrentTab('COURSE_DETAILS_PAGE_REQUIREMENTS_SECTION');

        if (isCourseDetailsTeacherSectionEnabled && currentTab === undefined)
            return setCurrentTab('COURSE_DETAILS_PAGE_TEACHER_SECTION');

        //setCurrentTab(0);
        //return setCurrentTab(desktopTabs.first());
    }, [courseDetails, currentTab, desktopTabs, isCourseDetailsContentSectionEnabled, isCourseDetailsRequirementsSectionEnabled, isCourseDetailsSummarySectionEnabled, isCourseDetailsTeacherSectionEnabled, isCourseStarted]);



    return (
        <>
            <RootContainerBackground>
                <EpistoFlex2
                    className="whall"
                    bg={`linear-gradient(160deg, ${currentColor}, white)`} />
            </RootContainerBackground>

            <AdminUserCourseContentDialog
                dialogLogic={adminCourseContentDialogLogic} />

            <ContentPane
                overflowY="scroll"
            /* padding="0 100px 0 100px" */>

                {/* Title */}
                <EpistoHeader
                    alignSelf="left"
                    margin="0px 40px 40px 0px"
                    variant="xxl"
                    text={courseDetails?.title ?? ''} />

                {/* content */}
                <EpistoFlex2>

                    {/* left pane */}
                    <EpistoFlex2
                        id='CourseDetails-LeftPane'
                        flex="1"
                        direction={'column'}
                        mr='30px'>

                        {/* short description */}
                        <EpistoFlex2
                            pr="20px"
                            width='100%'>

                            <EpistoFont>

                                {courseDetails?.shortDescription}
                            </EpistoFont>
                        </EpistoFlex2>

                        {/* briefing info items */}
                        <EpistoGrid
                            mt="20px"
                            auto='fill'
                            minColumnWidth='100px'
                            gridTemplateColumns={isSmallerThan1320 ? 'repeat(2, minmax(0, 1fr))' : 'repeat(4, minmax(0, 1fr))'}
                            gap='10px'>

                            {isCourseDetailsCategoryTileEnabled && <CourseDetailsBriefingInfoItem
                                icon={Environment.getAssetUrl('/course_page_icons/about_category.svg')}
                                title={translatableTexts.courseDetails.briefingInfoItems.category}
                                subTitle={courseDetails?.subCategoryName} />}

                            {(courseDetails && isCourseDetailsTeacherTileEnabled) && <CourseDetailsBriefingInfoItem
                                icon={<ProfileImage
                                    className="square50"
                                    url={courseDetails!.teacherData.teacherAvatarFilePath}
                                    firstName={courseDetails!.teacherData.teacherFirstName}
                                    lastName={courseDetails!.teacherData.teacherLastName} />}
                                title={translatableTexts!.courseDetails.briefingInfoItems.teacher}
                                subTitle={courseDetails!.teacherData.teacherFullName} />}

                            {isCourseDetailsDifficultyTileEnabled && <CourseDetailsBriefingInfoItem
                                icon={Environment.getAssetUrl('/course_page_icons/about_difficulty.svg')}
                                title={translatableTexts.courseDetails.briefingInfoItems.difficulty}
                                subTitle={courseDetails?.difficulty + ' / 10 pont'} />}

                            {isCourseDetailsLearningExperienceTileEnabled && <CourseDetailsBriefingInfoItem
                                icon={Environment.getAssetUrl('/course_page_icons/about_learning_experience.svg')}
                                title={translatableTexts.courseDetails.briefingInfoItems.learningExperience}
                                subTitle={courseDetails?.benchmark + ' / 5 pont'} />}
                        </EpistoGrid>

                        {/* tabs */}
                        {currentTab && <EpistoFlex2
                            direction="column"
                            flex="1"
                            mt='30px'
                            mb='50px'
                            background="var(--transparentWhite70)"
                            className="roundBorders mildShadow"
                            padding="20px"
                            backdropFilter={'blur(7px)'}>


                            {/* tab button headers */}
                            <EpistoFlex2
                                justify={'flex-start'}
                                sx={{ borderBottom: 1, borderColor: 'divider' }}>

                                <EpistoTabs
                                    tabItems={desktopTabs
                                        .map((x, index) => ({
                                            key: x.key,
                                            label: x.title
                                        }))}
                                    selectedTabKey={currentTab}
                                    onChange={setCurrentTab} />
                            </EpistoFlex2>

                            <EpistoFlex2 flex="1">

                                {desktopTabs
                                    .map((x, index) => <TabPanel
                                        style={{
                                            width: '100%'
                                        }}
                                        value={currentTab}
                                        key={index}
                                        index={x.key}>

                                        {courseDetails && x.component}
                                    </TabPanel>)}
                            </EpistoFlex2>
                        </EpistoFlex2>}
                    </EpistoFlex2>

                    {/* Right pane */}
                    <EpistoFlex2
                        direction={'column'}
                        minWidth="400px"
                        flexBasis="400px">

                        <EpistoFlex2
                            direction={'column'}
                            alignItems={'center'}
                            margin='10px'
                            boxSizing={'border-box'}
                            bg={'white'}
                            height='580px'
                            borderWidth='1px'
                            borderRadius='10px'
                            shadow={'#00000024 0px 0px 5px 0px'}>

                            <EpistoFlex2
                                width="100%"
                                height='230px'
                                justifyContent={'center'}
                                padding='10px'>

                                <img
                                    src={courseDetails?.thumbnailURL}
                                    style={{
                                        borderRadius: 5,
                                        objectFit: 'cover'
                                    }}
                                    alt={''} />
                            </EpistoFlex2>

                            {/* sidebar infos list */}
                            {sidebarInfos
                                .map((sidebarInfo, index) => (
                                    <FlexListItem
                                        key={index}
                                        width="100%"
                                        px='15px'
                                        height='40px'
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
                                            <EpistoFlex2 flex={1}
                                                padding='5px'>
                                                <EpistoFont>
                                                    {sidebarInfo.name}
                                                </EpistoFont>
                                            </EpistoFlex2>
                                        )}
                                        endContent={(
                                            <EpistoFlex2
                                                direction={'row'}
                                                mx='4px'
                                                justifyContent={'space-between'}
                                                alignItems={'center'}>

                                                <EpistoFont>
                                                    {sidebarInfo.value}
                                                </EpistoFont>
                                            </EpistoFlex2>
                                        )} />
                                ))}

                            <EpistoFlex2>

                                {/* start coures */}
                                <EpistoButton
                                    style={{
                                        flex: '1',
                                        color: 'var(--eduptiveYellowGreen)',
                                        maxHeight: 40,
                                        marginTop: 15,
                                        marginBottom: 15,
                                        display: courseDetails?.canStartCourse ? undefined : 'none'
                                    }}
                                    variant="plain"
                                    onClick={handlePlayCourse}
                                    icon={(
                                        <img
                                            src={Environment.getAssetUrl('/icons/play2.svg')}
                                            alt=""
                                            style={{
                                                width: '25px',
                                                height: '25px',
                                                marginRight: '5px'
                                            }} />
                                    )}>
                                    {courseDetails?.currentItemCode
                                        ? translatableTexts.courseDetails.continueCourse
                                        : translatableTexts.courseDetails.startCourse}
                                </EpistoButton>

                                {/* stats */}
                                {courseDetails?.currentItemCode && <EpistoButton
                                    style={{
                                        maxHeight: 40,
                                        marginTop: 15,
                                        marginBottom: 15,
                                        marginLeft: 10,
                                        display: courseDetails?.canStartCourse ? undefined : 'none'
                                    }}
                                    variant="plain"
                                    onClick={() => {

                                        if (!courseDetails.courseId)
                                            return;

                                        adminCourseContentDialogLogic
                                            .openDialog({
                                                courseId: courseDetails.courseId,
                                                userId: userId
                                            });
                                    }}>

                                    {translatableTexts.learningOverview.myStatisticsTitle}
                                </EpistoButton>}

                            </EpistoFlex2>

                        </EpistoFlex2>
                    </EpistoFlex2>
                </EpistoFlex2>
            </ContentPane>
        </>
    );
};