import { Id } from '@episto/commontypes';
import { CourseDetailsDTO } from '@episto/communication';
import { useEffect, useState } from 'react';
import { Environment } from '../../static/Environemnt';
import { translatableTexts } from '../../static/translatableTexts';
import { useAdminCourseContentDialogLogic } from '../administration/users/adminCourseContentDialog/AdminCourseContentDialogLogic';
import { AdminUserCourseContentDialog } from '../administration/users/adminCourseContentDialog/AdminUserCourseContentDialog';
import { EpistoButton } from '../controls/EpistoButton';
import { EpistoFlex2 } from '../controls/EpistoFlex';
import { EpistoFont } from '../controls/EpistoFont';
import { EpistoTabs } from '../controls/EpistoTabs';
import { EpistoHeader } from '../EpistoHeader';
import { ContentPane } from '../pageRootContainer/ContentPane';
import { RootContainerBackground } from '../pageRootContainer/RootContainerBackground';
import { ProfileImage } from '../ProfileImage';
import { FlexListItem } from '../universal/FlexListItem';
import { CourseDetailsBriefingInfoItem } from './CourseDetailsBriefingInfoItem';
import { CourseDetailsContentSection } from './CourseDetailsContentSection';
import { CourseDetailsSidebarInfoType } from './CourseDetailsPage';
import { CourseDetailsRequirementsSection } from './CourseDetailsRequirementsSection';
import { CourseDetailsSummarySection } from './CourseDetailsSummarySection';
import { CourseDetailsTeacherSection } from './CourseDetailsTeacherSection';
import { TabPanel } from './TabPanel';

export const MobileCourseDetailsPage = (props: {
    userId: Id<'User'>
    courseDetails: CourseDetailsDTO,
    currentColor: string,
    handlePlayCourse: () => void,
    sidebarInfos: CourseDetailsSidebarInfoType[]
}) => {

    const { userId, courseDetails, currentColor, handlePlayCourse, sidebarInfos } = props;
    const { adminCourseContentDialogLogic } = useAdminCourseContentDialogLogic();
    const [currentTab, setCurrentTab] = useState(0);

    useEffect(() => {

        if (courseDetails?.currentItemCode) {
            setCurrentTab(2);
        }

        if (!courseDetails?.currentItemCode) {
            setCurrentTab(0);
        }
    }, [courseDetails]);

    const desktopTabs = [
        {
            title: translatableTexts.courseDetails.tabLabels.overview,
            component: <CourseDetailsSummarySection
                courseDetails={courseDetails} />
        },
        {
            title: translatableTexts.courseDetails.tabLabels.requirements,
            component: <CourseDetailsRequirementsSection
                courseDetails={courseDetails} />
        },
        {
            title: translatableTexts.courseDetails.tabLabels.content,
            component: <CourseDetailsContentSection
                courseDetails={courseDetails} />
        },
        {
            title: translatableTexts.courseDetails.tabLabels.teacher,
            component: <CourseDetailsTeacherSection
                courseDetails={courseDetails} />
        }/* ,
        {
            title: translatableTexts.courseDetails.tabLabels.ratings,
            component: <CourseDetailsRatingSection />
        } */
    ];

    return <>

        <RootContainerBackground>
            <EpistoFlex2
                className="whall"
                bg={`linear-gradient(160deg, ${currentColor}, white)`} />
        </RootContainerBackground>

        <AdminUserCourseContentDialog
            dialogLogic={adminCourseContentDialogLogic} />

        <ContentPane
            overflowY="scroll"
            padding="0 100px 0 100px">

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
                    <EpistoFlex2 mt="20px"
                        justify="space-evenly">

                        <CourseDetailsBriefingInfoItem
                            icon={Environment.getAssetUrl('/course_page_icons/about_category.svg')}
                            title={translatableTexts.courseDetails.briefingInfoItems.category}
                            subTitle={courseDetails?.subCategoryName}
                            mr='10px' />

                        {courseDetails && <CourseDetailsBriefingInfoItem
                            icon={<ProfileImage
                                className="square50"
                                url={courseDetails!.teacherData.teacherAvatarFilePath}
                                firstName={courseDetails!.teacherData.teacherFirstName}
                                lastName={courseDetails!.teacherData.teacherLastName} />}
                            title={translatableTexts!.courseDetails.briefingInfoItems.teacher}
                            subTitle={courseDetails!.teacherData.teacherFullName}
                            mr='10px' />}

                        <CourseDetailsBriefingInfoItem
                            icon={Environment.getAssetUrl('/course_page_icons/about_difficulty.svg')}
                            title={translatableTexts.courseDetails.briefingInfoItems.difficulty}
                            subTitle={courseDetails?.difficulty + ' / 10 pont'}
                            mr='10px' />

                        <CourseDetailsBriefingInfoItem
                            icon={Environment.getAssetUrl('/course_page_icons/about_learning_experience.svg')}
                            title={translatableTexts.courseDetails.briefingInfoItems.learningExperience}
                            subTitle={courseDetails?.benchmark + ' / 5 pont'} />
                    </EpistoFlex2>

                    {/* tabs */}
                    <EpistoFlex2
                        direction="column"
                        flex="1"
                        width="100%"
                        mt='30px'
                        mb='50px'
                        background="var(--transparentWhite70)"
                        className="roundBorders mildShadow"
                        p="20px"
                        backdropFilter={'blur(7px)'}>


                        {/* tab button headers */}
                        <EpistoFlex2
                            justify={'flex-start'}
                            sx={{ borderBottom: 1, borderColor: 'divider' }}>

                            <EpistoTabs
                                tabItems={desktopTabs
                                    .map((x, index) => ({
                                        key: index,
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
                                    index={index}>

                                    {courseDetails && x.component}
                                </TabPanel>)}
                        </EpistoFlex2>
                    </EpistoFlex2>
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
                            p='10px'>

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
                                            p='5px'>
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
                                variant="outlined"
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
    </>;
};