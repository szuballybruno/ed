import { Flex, Grid, Image } from '@chakra-ui/react';
import { CourseApiService } from '../../../services/api/courseApiService';
import { PretestApiService } from '../../../services/api/pretestApiService';
import { useNavigation } from '../../../services/core/navigatior';
import { useShowErrorDialog } from '../../../services/core/notifications';
import { CourseModeType } from '../../../shared/types/sharedTypes';
import { Id } from '../../../shared/types/versionId';
import { Environment } from '../../../static/Environemnt';
import { useIntParam } from '../../../static/locationHelpers';
import { EpistoButton } from '../../controls/EpistoButton';
import { EpistoFont } from '../../controls/EpistoFont';
import StatisticsCard from '../../statisticsCard/StatisticsCard';
import { LoadingFrame } from '../../system/LoadingFrame';

export const PretestDateInfo = (props: {
    description: string,
    date: Date
}) => {
    return <Flex justify="center"
        align="center"
        flex='1'
        mx='30px'
        my="10px">

        <Image
            h="30px"
            w="30px"
            mr="10px"
            src={Environment.getAssetUrl('/images/tempomatdatechange.png')}
        />

        <Flex
            flex='1'
            marginRight='20px'>

            <EpistoFont fontSize={'fontLarge'}>

                {props.description}
            </EpistoFont>
        </Flex>


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
    </Flex>;
};

export const PretestResultsSubpage = () => {

    const courseId = Id
        .create<'Course'>(useIntParam('courseId')!);

    const { navigateToPlayer } = useNavigation();

    const { pretestResults, pretestResultsError, pretestResultsState } = PretestApiService.usePretestResults(courseId);
    const correctAnswerRate = pretestResults?.correctAnswerRate ?? 0;
    const isBeginner = correctAnswerRate < 50;

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
            error={pretestResultsError}
            direction="column">

            <Flex
                flex="1"
                direction="column"
                minHeight='calc(100vh - 100px)'
                p="20px"
                align='center'
                justify='space-between'
                className="roundBorders largeSoftShadow"
                background="var(--transparentWhite70)">

                <Flex
                    align="center"
                    justify="center"
                    h="50px">

                    <EpistoFont
                        fontSize="fontLargePlus"
                        style={{
                        }}>

                        Előzetes felmérés kiértékelése
                    </EpistoFont>
                </Flex>


                <Grid
                    gap={'10'}
                    padding="10px"
                    marginTop='50px'
                    gridAutoRows="150px"
                    justifyContent='center'
                    gridTemplateColumns='repeat(4, 280px)'
                    minH='150px'>

                    <StatisticsCard
                        iconPath={Environment.getAssetUrl('/images/pretest1.png')}
                        value={correctAnswerRate.toString()}
                        suffix="%"
                        title="Elért eredmény a felmérő teszten" />

                    <StatisticsCard
                        iconPath={Environment.getAssetUrl('/images/pretest2.png')}
                        value={pretestResults?.recommendedVideosPerDay}
                        suffix="db"
                        title="Megtekintésre ajánlott napi videó" />

                    <StatisticsCard
                        iconPath={Environment.getAssetUrl('/images/pretest3.png')}
                        value={isBeginner
                            ? 'Kezdő'
                            : 'Haladó'}
                        suffix=""
                        title="Üzemmód ajánlott" />

                    <StatisticsCard
                        iconPath={Environment.getAssetUrl('/images/pretest4.png')}
                        value={pretestResults?.requiredCompletionDate
                            ? 'Szigorú'
                            : 'Automata'}
                        suffix=""
                        title="módban indul a tempomat" />

                </Grid>

                <Flex
                    flex='1'
                    direction='column'
                    align='center'
                    pt='50px'
                    maxW='1120px'
                    justify='flex-start'>

                    <Flex
                        flex='1'
                        width='100%'
                        maxH='100px'
                        direction='column'>

                        {pretestResults?.requiredCompletionDate && <PretestDateInfo
                            description='Munkáltatód által megszabott befejezési határidő: '
                            date={pretestResults.requiredCompletionDate} />}

                        <PretestDateInfo
                            date={pretestResults?.estimatedCompletionDate!}
                            description='A kurzus várható befejezése: ' />
                    </Flex>



                    <Flex
                        px="10px"
                        pt='50px'
                        justify="center"
                        align="center">

                        <EpistoFont
                            fontSize2='normal'>

                            Mivel kevesebb, mint 50%-ot értél el a felmérő teszten, számodra a Kezdő üzemmódot ajánlanánk. Ebben az esetben folyamatosan haladhatsz a videókkal, de nem tudsz szabadon elindítani újat, csak az éppen aktuálisan következőt (ekkor felnyílik a lakat ikon). A videókban csak addig a pontig tudsz előre tekerni, ameddig már egyszer eljutottál.
                            Bármikor átválthatsz azonban Haladó módra, ahol ezek a korlátozások megszűnnek!
                        </EpistoFont>
                    </Flex>
                </Flex>

                {
                    pretestResults && <Flex
                        my="15px"
                        justify="center"
                        align="center">

                        <EpistoButton
                            onClick={() => setModeAndNavigateAsync('beginner')}
                            variant={isBeginner ? 'colored' : 'plain'}>

                            Kezdő üzemmóddal indulok
                        </EpistoButton>

                        <EpistoButton
                            style={{
                                marginLeft: 10
                            }}
                            onClick={() => setModeAndNavigateAsync('advanced')}
                            variant={isBeginner ? 'plain' : 'colored'}>

                            Inkább haladó üzemmóddal kezdek
                        </EpistoButton>
                    </Flex>
                }
            </Flex>

        </LoadingFrame >
    );
};