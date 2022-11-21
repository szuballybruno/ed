import { useContext, useState } from 'react';
import { applicationRoutes } from '../../configuration/applicationRoutes';
import { Responsivity } from '../../helpers/responsivity';
import { useOverviewPageDTO } from '../../services/api/miscApiService';
import { useActiveCourses } from '../../services/api/userProgressApiService';
import { useNavigation } from '../../services/core/navigatior';
import { Assets } from '../../static/Assets';
import { EpistoIcons } from '../../static/EpistoIcons';
import { usePaging } from '../../static/frontendHelpers';
import { translatableTexts } from '../../static/translatableTexts';
import { EpistoButton } from '../controls/EpistoButton';
import { EpistoFlex2 } from '../controls/EpistoFlex';
import { EpistoFont } from '../controls/EpistoFont';
import { ContentPane } from '../pageRootContainer/ContentPane';
import { LeftPane } from '../pageRootContainer/LeftPane';
import { PlaylistItem } from '../playlist/PlaylistItem';
import { CurrentUserContext, useRefetchUserAsync } from '../system/AuthenticationFrame';
import { useCurrentCourseItemCodeContext } from '../system/CurrentCourseItemFrame';
import { useSetBusy } from '../system/LoadingFrame/BusyBarContext';
import { DashboardSection } from '../universal/DashboardSection';
import { FlexListItem } from '../universal/FlexListItem';
import { FlexListTitleSubtitle } from '../universal/FlexListTitleSubtitle';
import { CourseProgressDisplay } from './CourseProgressDisplay';
import { Greetings } from './Greetings';
import { HomePageCourseStats } from './HomePageCourseStats';
import { HomePageUserStats } from './HomePageUserStats';
import { MobileRecommendedItemQuota } from './MobileRecommendedItemQuota';
import { MobileWelcomeHeader } from './MobileWelcomeHeader';
import { PractiseQuestions } from './PractiseQuestions';

const ActiveCourseSelectorHeader = ({ activeCoursesPaging }: { activeCoursesPaging: any }) => {

    return (
        <EpistoFlex2
            flex='1'
            h="30px"
            align="center"
            justify="flex-end">

            <EpistoButton onClick={() => activeCoursesPaging.previous()}>
                <EpistoIcons.ArrowBack />
            </EpistoButton>

            {activeCoursesPaging
                .items
                .map((x, index) => <EpistoIcons.Dot
                    key={index}
                    style={{
                        width: '10px',
                        height: '8px',
                        color: index === activeCoursesPaging.currentIndex ? 'black' : 'gray'
                    }} />)}

            <EpistoButton onClick={() => activeCoursesPaging.next()}>
                <EpistoIcons.ArrowForward />
            </EpistoButton>

        </EpistoFlex2>
    );
};

const CoinsAcquiredHeaderContent = ({ coinsAcquired }: { coinsAcquired }) => {

    if (!coinsAcquired)
        return null;

    return (
        <EpistoFlex2
            borderRadius="5px"
            p="7px"
            align="center">

            <EpistoFont>
                +1 EpistoCoinnal gazdagodtál!
            </EpistoFont>

            <img
                src={Assets.epistoCoinImage}
                className="square25"
                style={{ margin: '0px 0px 4px 4px' }} />

        </EpistoFlex2>
    );
};

const HomePage = () => {

    const { pageDTO, status, error } = useOverviewPageDTO();
    const { currentCourseProgress } = pageDTO ?? { currentCourseProgress: null };
    const { navigate2 } = useNavigation();

    useSetBusy(useOverviewPageDTO, status, error);

    const user = useContext(CurrentUserContext);
    const { refetchAuthHandshake } = useRefetchUserAsync();

    const isSmallerThan1320 = Responsivity
        .useIsSmallerThan('1320px');

    const { isMobile } = Responsivity
        .useIsMobileView();
    const [coinsAcquired, setCoinsAcquired] = useState(false);

    const { activeCourses } = useActiveCourses();
    const activeCoursesPaging = usePaging({ items: activeCourses });
    const { currentCourseItemCode } = useCurrentCourseItemCodeContext();
    const isAnyCourseInProgess = !!currentCourseItemCode;

    console.log(currentCourseItemCode);

    return <>

        {/* sidebar / left pane */}
        <LeftPane
            hidden={isMobile}>

            {/* current course items and progress */}
            {currentCourseProgress && <EpistoFlex2
                className='roundBorders'
                mx="10px"
                direction="column">

                <CourseProgressDisplay
                    dto={currentCourseProgress}
                    mb="5px" />

                <EpistoFlex2
                    direction="column"
                    mt="5px">

                    {(currentCourseProgress.nextItems ?? [])
                        .map((playlistItem, index) => (
                            <PlaylistItem
                                key={index}
                                playlistItem={playlistItem} />
                        ))}
                </EpistoFlex2>
            </EpistoFlex2>}

            {/* no current course  */}
            {!pageDTO?.currentCourseProgress && <FlexListItem
                px="10"
                onClick={() => navigate2(applicationRoutes.availableCoursesRoute)}
                midContent={<EpistoFlex2>

                    <EpistoFlex2
                        className="roundBorders"
                        boxShadow="inset -1px -1px 2px 1px rgba(0,0,0,0.10)"
                        p="3px"
                        m="7px 10px 7px 0px"
                        bgColor={'var(--epistoTeal)'} />

                    <FlexListTitleSubtitle
                        isSelected={false}
                        title={translatableTexts.homePage.availableCoursesLinkTitle}
                        subTitle={translatableTexts.homePage.availableCoursesText} />
                </EpistoFlex2>} />}
        </LeftPane>

        {/* content */}
        <ContentPane
            minWidth={!isSmallerThan1320 && !isMobile ? '1060px' : undefined}>

            {/* mobile panels */}
            {isMobile && (
                <>
                    <MobileWelcomeHeader
                        user={user} />

                    <MobileRecommendedItemQuota
                        activeCoursesPaging={activeCoursesPaging} />
                </>
            )}

            {/* main content */}
            <EpistoFlex2
                id="mainContentFlex"
                wrap="wrap">

                {/* practise questions */}
                <DashboardSection
                    title={translatableTexts.homePage.practiseTitle}
                    headerContent={<CoinsAcquiredHeaderContent
                        coinsAcquired={coinsAcquired} />}
                    background={isMobile ? '#1d6784' : '#1d6784'} //#7CC0C2
                    className="largeSoftShadow roundBorders"
                    color="white"
                    showDivider
                    isMobile={isMobile}
                    minHeight="350px"
                    maxWidth={!isSmallerThan1320 ? '900px' : undefined}
                    m={isMobile ? '10px 0' : '0 5px 10px 0'}
                    flex={(isMobile || isSmallerThan1320) ? '1' : '3'}>

                    {isAnyCourseInProgess
                        ? <PractiseQuestions setCoinsAcquired={setCoinsAcquired} />
                        : <Greetings />}
                </DashboardSection>

                {/* most relevant stat */}
                <DashboardSection
                    isMobile={isMobile}
                    title={translatableTexts.homePage.mostRelevantStatistics}
                    background={isMobile ? 'transparent' : 'var(--transparentWhite70)'}
                    borderRadius="6px"
                    showDivider
                    boxShadow={isMobile ? 'none' : undefined}
                    className={'largeSoftShadow'}
                    marginBottom="10px"
                    flex={(isMobile || isSmallerThan1320) ? '1' : '2'}>

                    <HomePageUserStats isSmallDesktop={isSmallerThan1320} />
                </DashboardSection>
            </EpistoFlex2>

            {/* stats */}
            {!isMobile && <DashboardSection
                title={activeCoursesPaging.currentItem?.title
                    ? `Kurzus során nyújtott teljesítményed: ${activeCoursesPaging.currentItem.title}`
                    : 'Kurzus során nyújtott teljesítményed'}
                headerContent={<ActiveCourseSelectorHeader
                    activeCoursesPaging={activeCoursesPaging} />}
                background="var(--transparentWhite70)">

                <HomePageCourseStats
                    isSmallDesktop={isSmallerThan1320}
                    activeCoursesPaging={activeCoursesPaging} />
            </DashboardSection>}
        </ContentPane>
    </ >;
};

export default HomePage;
