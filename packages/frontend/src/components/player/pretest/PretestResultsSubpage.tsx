import { Grid } from '@chakra-ui/react';
import { CourseModeType, Id } from '@episto/commontypes';
import { Responsivity } from '../../../helpers/responsivity';
import { CourseApiService } from '../../../services/api/courseApiService';
import { PretestApiService } from '../../../services/api/pretestApiService';
import { useNavigation } from '../../../services/core/navigatior';
import { useShowErrorDialog } from '../../../services/core/notifications';
import { Environment } from '../../../static/Environemnt';
import { useIntParam } from '../../../static/locationHelpers';
import { translatableTexts } from '../../../static/translatableTexts';
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
            height="30px"
            width="30px"
            mr="10px"
            src={Environment.getAssetUrl('/images/tempomatdatechange.png')}
        />

        <EpistoFlex2
            flex='1'
            marginRight='20px'>

            <EpistoFont
                fontSize={'fontLarge'}>

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
    const isBeginnerMode = correctAnswerRate < 50;

    const { isMobile } = Responsivity
        .useIsMobileView();

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
                padding="20px"
                align='center'
                justify='center'
                className="roundBorders largeSoftShadow"
                background="var(--transparentWhite70)">

                <EpistoFlex2
                    position='absolute'
                    top='20px'
                    align="center"
                    justify="center"
                    height="50px">

                    <EpistoFont
                        fontSize="font19"
                        style={{
                        }}>

                        Előzetes felmérés kiértékelése
                    </EpistoFont>
                </EpistoFlex2>

                {/* result statistics */}
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
                        minWidth={isMobile ? 'calc(100vw - 20px)' : undefined}
                        pl='10px'
                        iconPath={Environment.getAssetUrl('/images/pretest1.png')}
                        value={correctAnswerRate.toString()}
                        suffix="%"
                        title="Elért eredmény a felmérő teszten" />

                    <StatisticsCard
                        isMobile={isMobile}
                        minWidth={isMobile ? 'calc(100vw - 20px)' : undefined}
                        pl='10px'
                        iconPath={Environment.getAssetUrl('/images/pretest2.png')}
                        value={pretestResults?.recommendedVideosPerDay}
                        suffix="db"
                        title="Megtekintésre ajánlott napi videó" />

                    <StatisticsCard
                        isMobile={isMobile}
                        minWidth={isMobile ? 'calc(100vw - 20px)' : undefined}
                        pl='10px'
                        iconPath={Environment.getAssetUrl('/images/pretest3.png')}
                        value={isBeginnerMode
                            ? 'Kezdő'
                            : 'Haladó'}
                        suffix=""
                        title="Üzemmód ajánlott" />

                    <StatisticsCard
                        isMobile={isMobile}
                        minWidth={isMobile ? 'calc(100vw - 20px)' : undefined}
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

                        <EpistoFont>

                            {correctAnswerRate < 50
                                ? translatableTexts.exam.pretest.resultBeginnerModeDescription
                                : translatableTexts.exam.pretest.resultAdvancedModeDescription}
                        </EpistoFont>
                    </EpistoFlex2>

                    {pretestResults && (
                        <EpistoFlex2
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
                                variant={isBeginnerMode ? 'colored' : 'plain'}>

                                Kezdő üzemmóddal indulok
                            </EpistoButton>

                            <EpistoButton
                                style={{
                                    width: isMobile ? '100%' : undefined,
                                    marginTop: isMobile ? '10px' : undefined,
                                    marginLeft: 10
                                }}
                                onClick={() => setModeAndNavigateAsync('advanced')}
                                variant={isBeginnerMode ? 'plain' : 'colored'}>

                                Inkább haladó üzemmóddal kezdek
                            </EpistoButton>
                        </EpistoFlex2>
                    )}

                </EpistoFlex2>
            </EpistoFlex2>
        </LoadingFrame >
    );
};
