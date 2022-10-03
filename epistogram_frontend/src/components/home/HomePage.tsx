import { useMediaQuery } from '@chakra-ui/react';
import { useContext, useState } from 'react';
import { applicationRoutes } from '../../configuration/applicationRoutes';
import { useOverviewPageDTO } from '../../services/api/miscApiService';
import { useActiveCourses } from '../../services/api/userProgressApiService';
import { useNavigation } from '../../services/core/navigatior';
import { Environment } from '../../static/Environemnt';
import { EpistoIcons } from '../../static/EpistoIcons';
import { useIsMobileView, usePaging } from '../../static/frontendHelpers';
import { translatableTexts } from '../../static/translatableTexts';
import { ContentPane } from '../ContentPane';
import { EpistoButton } from '../controls/EpistoButton';
import { EpistoFlex2 } from '../controls/EpistoFlex';
import { EpistoFont } from '../controls/EpistoFont';
import { PlaylistItem } from '../courseItemList/PlaylistItem';
import { LeftPane } from '../LeftPane';
import { PageRootContainer } from '../PageRootContainer';
import { CurrentUserContext } from '../system/AuthenticationFrame';
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
                src={Environment.getAssetUrl('images/epistoCoin.png')}
                className="square25"
                style={{ margin: '0px 0px 4px 4px' }} />

        </EpistoFlex2>
    );
};

const HomePage = () => {

    const { pageDTO, status, error } = useOverviewPageDTO();
    const { navigate2 } = useNavigation();

    useSetBusy(useOverviewPageDTO, status, error);

    const user = useContext(CurrentUserContext);

    const [isSmallerThan1400] = useMediaQuery('(min-width: 1400px)');
    const isMobile = useIsMobileView();
    const [coinsAcquired, setCoinsAcquired] = useState(false);

    const { activeCourses } = useActiveCourses();
    const activeCoursesPaging = usePaging({ items: activeCourses });
    const { currentCourseItemCode } = useCurrentCourseItemCodeContext();
    const isAnyCourseInProgess = !!currentCourseItemCode;

    return <PageRootContainer>

        {/* sidebar / left pane */}
        {!isMobile && <LeftPane>

            {/* current course items and progress */}
            {pageDTO?.currentCourseProgress && <EpistoFlex2
                className='roundBorders'
                mx="10px"
                direction="column">

                <CourseProgressDisplay
                    value={pageDTO.currentCourseProgress.progressPercentage}
                    label={pageDTO.currentCourseProgress.title}
                    continueItemCode={pageDTO.currentCourseProgress.continueItemCode}
                    mb="5px" />

                <EpistoFlex2
                    direction="column"
                    mt="5px">

                    {(pageDTO.currentCourseProgress.nextItems ?? [])
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
        </LeftPane>}

        {/* content */}
        <ContentPane
            px='20px'
            pb={isMobile ? '80px' : undefined}
            direction="column"
            minWidth={isSmallerThan1400 && !isMobile ? '1060px' : undefined}
            noMaxWidth>

            {isMobile && <MobileWelcomeHeader user={user} />}

            {isMobile && <MobileRecommendedItemQuota activeCoursesPaging={activeCoursesPaging} />}

            {/* main content */}
            <EpistoFlex2
                id="mainContentFlex"
                wrap="wrap">

                {/* practise questions */}
                <DashboardSection
                    title={translatableTexts.homePage.practiseTitle}
                    headerContent={<CoinsAcquiredHeaderContent
                        coinsAcquired={coinsAcquired} />}
                    background={isMobile ? '#7CC0C2' : 'var(--transparentIntenseBlue85)'}
                    className="largeSoftShadow roundBorders"
                    color="white"
                    showDivider
                    isMobile={isMobile}
                    minHeight="200px"
                    m={isMobile ? '10px 0' : '0 5px 10px 0'}
                    flex={isMobile ? '1' : '3 3 550px'}>

                    {isAnyCourseInProgess
                        ? <PractiseQuestions setCoinsAcquired={setCoinsAcquired} />
                        : <Greetings />}
                </DashboardSection>

                {/* tip of the day */}
                <DashboardSection
                    isMobile={isMobile}
                    title={translatableTexts.homePage.mostRelevantStatistics}
                    background={isMobile ? 'transparent' : 'var(--transparentWhite70)'}
                    borderRadius="6px"
                    showDivider
                    boxShadow={isMobile ? 'none' : undefined}
                    className={'largeSoftShadow'}
                    minHeight="30px"
                    marginBottom="10px"
                    p={isMobile ? '0' : ''}
                    flex={isMobile ? '1' : '2 2 350px'}>

                    <HomePageUserStats />
                </DashboardSection>
            </EpistoFlex2>

            {/* stats */}
            {!isMobile && <DashboardSection
                title={`Kurzus során nyújtott teljesítményed: ${activeCoursesPaging.currentItem?.title}`}
                bg="red"
                headerContent={<ActiveCourseSelectorHeader
                    activeCoursesPaging={activeCoursesPaging} />}
                background="var(--transparentWhite70)">

                <HomePageCourseStats
                    activeCoursesPaging={activeCoursesPaging} />
            </DashboardSection>}
        </ContentPane>
    </PageRootContainer >;
};

export default HomePage;
