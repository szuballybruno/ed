import { Flex } from '@chakra-ui/layout';
import { useMediaQuery } from '@chakra-ui/react';
import { applicationRoutes } from '../../configuration/applicationRoutes';
import { useOverviewPageDTO } from '../../services/api/miscApiService';
import { useActiveCourses } from '../../services/api/userProgressApiService';
import { useNavigation } from '../../services/core/navigatior';
import { usePaging } from '../../static/frontendHelpers';
import { translatableTexts } from '../../static/translatableTexts';
import { ContentPane } from '../ContentPane';
import { PlaylistItem } from '../courseItemList/PlaylistItem';
import { LeftPane } from '../LeftPane';
import { PageRootContainer } from '../PageRootContainer';
import { useSetBusy } from '../system/LoadingFrame/BusyBarContext';
import { DashboardSection } from '../universal/DashboardSection';
import { FlexListItem } from '../universal/FlexListItem';
import { FlexListTitleSubtitle } from '../universal/FlexListTitleSubtitle';
import { CourseProgressDisplay } from './CourseProgressDisplay';
import { HomePageCourseStats } from './HomePageCourseStats';
import { HomePageUserStats } from './HomePageUserStats';
import { PractiseQuestions } from './PractiseQuestions';
import {EpistoFont} from '../controls/EpistoFont';
import {Environment} from '../../static/Environemnt';
import React, {useState} from 'react';

const HomePage = () => {

    const { pageDTO, status, error } = useOverviewPageDTO();
    const { navigate2 } = useNavigation();

    useSetBusy(useOverviewPageDTO, status);

    const [isSmallerThan1400] = useMediaQuery('(min-width: 1400px)');
    const [coinsAcquired, setCoinsAcquired] = useState(false);

    const { activeCourses } = useActiveCourses();
    const activeCoursesPaging = usePaging({ items: activeCourses });

    return <PageRootContainer>

        <LeftPane>

            {/* current course items and progress */}
            {pageDTO?.currentCourseProgress && <Flex
                className='roundBorders'
                mx="10px"
                direction="column">

                <CourseProgressDisplay
                    value={pageDTO.currentCourseProgress.progressPercentage}
                    label={pageDTO.currentCourseProgress.title}
                    continueItemCode={pageDTO.currentCourseProgress.continueItemCode}
                    mb="5px" />

                <Flex
                    direction="column"
                    mt="5px">

                    {(pageDTO.currentCourseProgress.nextItems ?? [])
                        .map((playlistItem, index) => (
                            <PlaylistItem
                                key={index}
                                playlistItem={playlistItem} />
                        ))}
                </Flex>
            </Flex>}

            {/* no current course  */}
            {!pageDTO?.currentCourseProgress && <FlexListItem
                px="10"
                onClick={() => navigate2(applicationRoutes.availableCoursesRoute)}
                midContent={<Flex>

                    <Flex
                        className="roundBorders"
                        boxShadow="inset -1px -1px 2px 1px rgba(0,0,0,0.10)"
                        p="3px"
                        m="7px 10px 7px 0px"
                        bgColor={'var(--epistoTeal)'} />

                    <FlexListTitleSubtitle
                        isSelected={false}
                        title={translatableTexts.homePage.availableCoursesLinkTitle}
                        subTitle={translatableTexts.homePage.availableCoursesText} />
                </Flex>} />}
        </LeftPane>

        <ContentPane
            noMaxWidth>

            <Flex
                direction="column"
                minWidth={isSmallerThan1400 ? '1060px' : undefined}>

                <Flex wrap="wrap">

                    {/* test your knowledge */}
                    <DashboardSection
                        title={translatableTexts.homePage.practiseTitle}
                        headerContent={coinsAcquired && <Flex
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

                        </Flex>}
                        background="var(--transparentIntenseBlue85)"
                        className="largeSoftShadow roundBorders"
                        color="white"
                        showDivider
                        minHeight="200px"
                        m="0 5px 10px 0"
                        flex="3 3 550px">

                        <PractiseQuestions setCoinsAcquired={setCoinsAcquired}  />
                    </DashboardSection>

                    {/* tip of the day */}
                    <DashboardSection
                        title={translatableTexts.homePage.mostRelevantStatistics}
                        background="var(--transparentWhite70)"
                        borderRadius="6px"
                        showDivider
                        className="largeSoftShadow"
                        minHeight="30px"
                        marginBottom="10px"
                        flex="2 2 350px">

                        <HomePageUserStats />
                    </DashboardSection>
                </Flex>

                {/* stats */}
                <DashboardSection
                    background="var(--transparentWhite70)"
                    className="largeSoftShadow roundBorders"
                    showDivider
                    minHeight="200px"
                    m="0 0 10px 0"
                    flex='1'
                    title={'Kurzus során nyújtott teljesítményed'}>

                    <HomePageCourseStats
                        activeCoursesPaging={activeCoursesPaging} />
                </DashboardSection>
            </Flex>
        </ContentPane>
    </PageRootContainer>;
};

export default HomePage;
