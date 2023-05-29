import { Id } from '@episto/commontypes';
import { CourseDetailsDTO } from '@episto/communication';
import { ArrowBack } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import { applicationRoutes } from '../../configuration/applicationRoutes';
import { useNavigation } from '../../services/core/navigatior';
import { Environment } from '../../static/Environemnt';
import { translatableTexts } from '../../static/translatableTexts';
import { useAdminCourseContentDialogLogic } from '../administration/users/adminCourseContentDialog/AdminCourseContentDialogLogic';
import { AdminUserCourseContentDialog } from '../administration/users/adminCourseContentDialog/AdminUserCourseContentDialog';
import { EpistoButton } from '../controls/EpistoButton';
import { EpistoFlex2 } from '../controls/EpistoFlex';
import { EpistoFont } from '../controls/EpistoFont';
import { EpistoTabs } from '../controls/EpistoTabs';
import { ContentPane } from '../pageRootContainer/ContentPane';
import { RootContainerBackground } from '../pageRootContainer/RootContainerBackground';
import { FlexListItem } from '../universal/FlexListItem';
import { CourseDetailsContentSection } from './CourseDetailsContentSection';
import { CourseDetailsSidebarInfoType } from './CourseDetailsPage';
import { MobileCourseDetailsSummarySection } from './MobileCourseDetailsSummarySection';
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
    const { navigate2 } = useNavigation();

    useEffect(() => {

        if (courseDetails?.currentItemCode) {
            setCurrentTab(1);
        }

        if (!courseDetails?.currentItemCode) {
            setCurrentTab(0);
        }
    }, [courseDetails]);

    const mobileTabs = [
        {
            title: translatableTexts.courseDetails.tabLabels.overview,
            component: <MobileCourseDetailsSummarySection
                courseDetails={courseDetails} />
        },
        {
            title: translatableTexts.courseDetails.tabLabels.content,
            component: <CourseDetailsContentSection
                courseDetails={courseDetails} />
        }
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
            width='100vw'
            noPadding>

            {/* Title and back button */}
            <EpistoFlex2
                background='var(--transparentWhite90)'
                position='sticky'
                top='0'
                zIndex='10'
                align='center'
                minHeight='80px'>

                <EpistoFlex2
                    justify='center'
                    width='60px'>

                    <ArrowBack
                        onClick={() => {
                            navigate2(applicationRoutes.availableCoursesRoute);
                        }}
                        style={{
                            height: '40px',
                            width: '40px'
                        }} />
                </EpistoFlex2>

                <EpistoFlex2
                    justify='center'
                    flex='1'>

                    <EpistoFont
                        fontSize='font19'>

                        A tanfolyam adatlapja
                    </EpistoFont>
                </EpistoFlex2>

                <EpistoFlex2
                    width='60px' />
            </EpistoFlex2>

            {/* Thumbnail */}
            <EpistoFlex2
                width="100%"
                maxHeight='250px'
                justifyContent={'center'}>

                <img
                    src={courseDetails?.thumbnailURL}
                    style={{
                        borderRadius: 5,
                        objectFit: 'cover'
                    }}
                    alt={''} />
            </EpistoFlex2>

            {/* Category */}
            <EpistoFlex2
                padding='10px 10px 0 10px'>

                <EpistoFont>
                    {courseDetails?.categoryName ?? ''}
                </EpistoFont>
            </EpistoFlex2>

            {/* Title */}
            <EpistoFlex2
                padding='0 10px 10px 10px'>

                <EpistoFont
                    fontSize='font19'
                    fontWeight='heavy'>

                    {courseDetails?.title ?? ''}
                </EpistoFont>
            </EpistoFlex2>

            <EpistoFlex2
                px='10px'
                wrap='wrap'>

                {/* sidebar infos list */}
                {sidebarInfos
                    .map((sidebarInfo, index) => (
                        <FlexListItem
                            key={index}
                            height='30px'
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
                                <EpistoFlex2
                                    direction={'row'}
                                    justifyContent={'space-between'}
                                    alignItems={'center'}>

                                    <EpistoFont>
                                        {sidebarInfo.value}
                                    </EpistoFont>
                                </EpistoFlex2>
                            )} />
                    ))}
            </EpistoFlex2>

            {/* short description */}
            <EpistoFlex2
                padding='10px'
                pr="20px"
                width='100%'>

                <EpistoFont>

                    {courseDetails?.shortDescription}
                </EpistoFont>
            </EpistoFlex2>

            {/* start coures */}
            <EpistoFlex2
                px='10px'>

                <EpistoButton
                    style={{
                        flex: '1',
                        color: 'var(--eduptiveYellowGreen)',
                        height: 40,
                        display: courseDetails?.canStartCourse ? undefined : 'none'
                    }}
                    sx={{
                        '&.MuiButton-root': {
                            background: 'white'
                        }
                    }}
                    variant="action"
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
                padding="20px"
                backdropFilter={'blur(7px)'}>


                {/* tab button headers */}
                <EpistoFlex2
                    justify={'flex-start'}
                    sx={{ borderBottom: 1, borderColor: 'divider' }}>

                    <EpistoTabs
                        tabItems={mobileTabs
                            .map((x, index) => ({
                                key: index,
                                label: x.title
                            }))}
                        selectedTabKey={currentTab}
                        onChange={setCurrentTab} />
                </EpistoFlex2>

                <EpistoFlex2 flex="1">

                    {mobileTabs
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
        </ContentPane >
    </>;
};