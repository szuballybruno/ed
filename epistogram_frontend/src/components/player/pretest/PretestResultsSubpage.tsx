import { Grid } from '@chakra-ui/react';
import { CourseApiService } from '../../../services/api/courseApiService';
import { PretestApiService } from '../../../services/api/pretestApiService';
import { useNavigation } from '../../../services/core/navigatior';
import { useShowErrorDialog } from '../../../services/core/notifications';
import { CourseModeType } from '../../../shared/types/sharedTypes';
import { Id } from '../../../shared/types/versionId';
import { Environment } from '../../../static/Environemnt';
import { useIsMobileView } from '../../../static/frontendHelpers';
import { useIntParam } from '../../../static/locationHelpers';
import { EpistoButton } from '../../controls/EpistoButton';
import { EpistoFlex2 } from '../../controls/EpistoFlex';
import { EpistoFont } from '../../controls/EpistoFont';
import { EpistoImage } from '../../controls/EpistoImage';
import StatisticsCard from '../../statisticsCard/StatisticsCard';
import { LoadingFrame } from '../../system/LoadingFrame';

export const PretestDateInfo = (props: {
    description: string,
    date: Date
}) => {
    return <EpistoFlex2 justify="center"
        align="center"
        flex='1'
        mx='30px'
        my="10px">

        <EpistoImage
            h="30px"
            w="30px"
            mr="10px"
            src={Environment.getAssetUrl('/images/tempomatdatechange.png')}
        />

        <EpistoFlex2
            flex='1'
            marginRight='20px'>

            <EpistoFont fontSize={'fontLarge'}>

                {props.description}
            </EpistoFont>
        </EpistoFlex2>


        <EpistoFont
            fontSize={'fontLarge'}
            style={{
                marginLeft: '5px',
                fontWeight: 600
            }}>

            {new Date(props.date)
                .toLocaleDateString('hu-hu', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit'
                })}
        </EpistoFont>
    </EpistoFlex2>;
};

export const PretestResultsSubpage = () => {

    const courseId = Id
        .create<'Course'>(useIntParam('courseId')!);

    const { navigateToPlayer } = useNavigation();

    const { pretestResults, pretestResultsError, pretestResultsState } = PretestApiService.usePretestResults(courseId);
    const correctAnswerRate = pretestResults?.correctAnswerRate ?? 0;
    const isBeginner = correctAnswerRate < 50;
    const isMobile = useIsMobileView();

    const { setCourseModeAsync, setCourseModeState } = CourseApiService.useSetCourseMode();
    const showError = useShowErrorDialog();

    const setModeAndNavigateAsync = async (mode: CourseModeType) => {

        try {

            await setCourseModeAsync({ courseId, mode });
            navigateToPlayer(pretestResults?.firstItemCode!);
        }
        catch (e) {

            showError(e);
        }
    };

    return (
        <LoadingFrame
            height="100%"
            overflowY={isMobile ? 'scroll' : undefined}
            overflowX='hidden'
            error={pretestResultsError}
            direction="column">

            <EpistoFlex2
                flex="1"
                direction="column"
                minHeight={isMobile ? undefined : 'calc(100vh - 100px)'}
                p="20px"
                align='center'
                justify='center'
                className="roundBorders largeSoftShadow"
                background="var(--transparentWhite70)">

                <EpistoFlex2
                    position='absolute'
                    top='20px'
                    align="center"
                    justify="center"
                    h="50px">

                    <EpistoFont
                        fontSize="fontLargePlus"
                        style={{
                        }}>

                        Előzetes felmérés kiértékelése
                    </EpistoFont>
                </EpistoFlex2>


                <Grid
                    gap={'10px'}
                    padding="10px"
                    marginTop='50px'
                    gridAutoRows={isMobile ? '80px' : '150px'}
                    justifyContent='center'
                    gridTemplateColumns={isMobile ? 'auto' : 'repeat(4, 280px)'}
                    minH='150px'>

                    <StatisticsCard
                        isMobile={isMobile}
                        minWidth='calc(100vw - 20px)'
                        pl='10px'
                        iconPath={Environment.getAssetUrl('/images/pretest1.png')}
                        value={correctAnswerRate.toString()}
                        suffix="%"
                        title="Elért eredmény a felmérő teszten" />

                    <StatisticsCard
                        isMobile={isMobile}
                        minWidth='calc(100vw - 20px)'
                        pl='10px'
                        iconPath={Environment.getAssetUrl('/images/pretest2.png')}
                        value={pretestResults?.recommendedVideosPerDay}
                        suffix="db"
                        title="Megtekintésre ajánlott napi videó" />

                    <StatisticsCard
                        isMobile={isMobile}
                        minWidth='calc(100vw - 20px)'
                        pl='10px'
                        iconPath={Environment.getAssetUrl('/images/pretest3.png')}
                        value={isBeginner
                            ? 'Kezdő'
                            : 'Haladó'}
                        suffix=""
                        title="Üzemmód ajánlott" />

                    <StatisticsCard
                        isMobile={isMobile}
                        minWidth='calc(100vw - 20px)'
                        pl='10px'
                        title={pretestResults?.requiredCompletionDate
                            ? 'Munkáltatód által megszabott befejezési határidő'
                            : 'A kurzus várható befejezési ideje'}
                        value={pretestResults?.requiredCompletionDate
                            ? new Date(pretestResults.requiredCompletionDate)
                                .toLocaleString('hu-hu', {
                                    month: '2-digit',
                                    day: '2-digit'
                                })
                            : pretestResults?.estimatedCompletionDate
                                ? new Date(pretestResults.estimatedCompletionDate)
                                    .toLocaleString('hu-hu', {
                                        month: '2-digit',
                                        day: '2-digit'
                                    })
                                : null}
                        suffix={''}
                        iconPath={Environment.getAssetUrl('/images/weeklyquota.png')}
                        isOpenByDefault={false} />

                    {/*   <StatisticsCard
                        iconPath={Environment.getAssetUrl('/images/pretest4.png')}
                        value={pretestResults?.requiredCompletionDate
                            ? 'Szigorú'
                            : 'Automata'}
                        suffix=""
                        title="módban indul a tempomat" /> */}

                </Grid>

                <EpistoFlex2
                    direction='column'
                    align='center'
                    width={isMobile ? '100%' : undefined}
                    maxW='1120px'
                    justify='flex-start'>

                    <EpistoFlex2
                        px="10px"
                        pb={isMobile ? '10px' : '40px'}
                        pt={isMobile ? '20px' : '50px'}
                        justify="center"
                        align="center">

                        <EpistoFont
                            fontSize2='normal'>

                            Mivel kevesebb, mint 50%-ot értél el a felmérő teszten, számodra a Kezdő üzemmódot ajánlanánk. Ebben az esetben folyamatosan haladhatsz a videókkal, de nem tudsz szabadon elindítani újat, csak az éppen aktuálisan következőt (ekkor felnyílik a lakat ikon). A videókban csak addig a pontig tudsz előre tekerni, ameddig már egyszer eljutottál.
                            Bármikor átválthatsz azonban Haladó módra, ahol ezek a korlátozások megszűnnek!
                        </EpistoFont>
                    </EpistoFlex2>

                    {
                        pretestResults && <EpistoFlex2
                            width={isMobile ? '100%' : undefined}
                            direction={isMobile ? 'column' : 'row'}
                            my={isMobile ? '0' : '15px'}
                            justify="center"
                            align="center">

                            <EpistoButton
                                style={{
                                    width: isMobile ? '100%' : undefined
                                }}
                                onClick={() => setModeAndNavigateAsync('beginner')}
                                variant={isBeginner ? 'colored' : 'plain'}>

                                Kezdő üzemmóddal indulok
                            </EpistoButton>

                            <EpistoButton
                                style={{
                                    width: isMobile ? '100%' : undefined,
                                    marginTop: isMobile ? '10px' : undefined,
                                    marginLeft: 10
                                }}
                                onClick={() => setModeAndNavigateAsync('advanced')}
                                variant={isBeginner ? 'plain' : 'colored'}>

                                Inkább haladó üzemmóddal kezdek
                            </EpistoButton>
                        </EpistoFlex2>
                    }

                </EpistoFlex2>
            </EpistoFlex2>
        </LoadingFrame >
    );
};
