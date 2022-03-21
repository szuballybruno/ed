import { Flex, Image } from "@chakra-ui/react";
import { CourseModeType } from "../../../shared/types/sharedTypes";
import { useSetCourseMode } from "../../../services/api/courseApiService";
import { usePretestResults } from "../../../services/api/pretestApiService";
import { useNavigation } from "../../../services/core/navigatior";
import { useShowErrorDialog } from "../../../services/core/notifications";
import { useIntParam } from "../../../static/locationHelpers";
import { EpistoButton } from "../../controls/EpistoButton";
import { EpistoFont } from "../../controls/EpistoFont";
import { LoadingFrame } from "../../system/LoadingFrame";
import StatisticsCard from "../../statisticsCard/StatisticsCard";
import { EpistoGrid } from "../../controls/EpistoGrid";
import { getAssetUrl } from "../../../static/frontendHelpers";

export const PretestResultsSubpage = () => {

    const courseId = useIntParam("courseId")!;
    const { navigateToPlayer } = useNavigation();

    const { pretestResults, pretestResultsError, pretestResultsState } = usePretestResults(courseId);
    const correctAnswerRate = pretestResults?.correctAnswerRate ?? 0;
    const isBeginner = correctAnswerRate < 50;

    const { setCourseModeAsync, setCourseModeState } = useSetCourseMode();
    const showError = useShowErrorDialog();

    const setModeAndNavigateAsync = async (mode: CourseModeType) => {

        try {

            await setCourseModeAsync({ courseId, mode });
            navigateToPlayer(pretestResults!.firstItemCode);
        }
        catch (e) {

            showError(e);
        }
    }

    return (
        <LoadingFrame
            height="100%"
            error={pretestResultsError}
            direction="column">

            <Flex
                flex="1"
                direction="column"
                p="20px"
                className="roundBorders largeSoftShadow"
                mx="50px"
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

                <EpistoGrid
                    gap={"10"}
                    padding="10px"
                    minColumnWidth={"280px"}
                    auto={"fill"}
                    gridAutoRows="150px" >

                    <StatisticsCard
                        iconPath={getAssetUrl("/images/pretest1.png")}
                        value={correctAnswerRate.toString()}
                        suffix="%"
                        title="Elért eredmény a felmérő teszten" />

                    <StatisticsCard
                        iconPath={getAssetUrl("/images/pretest2.png")}
                        value="6"
                        suffix="db"
                        title="Megtekintésre ajánlott napi videó" />

                    <StatisticsCard
                        iconPath={getAssetUrl("/images/pretest3.png")}
                        value="Kezdő"
                        suffix=""
                        title="Üzemmód ajánlott" />

                    <StatisticsCard
                        iconPath={getAssetUrl("/images/pretest4.png")}
                        value="Automata"
                        suffix=""
                        title="Megtekintésre ajánlott napi videó" />

                </EpistoGrid>

                <Flex justify="center" align="center" my="10px">

                    <Image
                        h="30px"
                        w="30px"
                        mr="5px"
                        src={getAssetUrl("/images/tempomatdatechange.png")}
                    />

                    <EpistoFont fontSize={"fontLarge"}>

                        A tanfolyam várható befejezésének dátuma:
                    </EpistoFont>

                    <EpistoFont
                        fontSize={"fontLarge"}
                        style={{
                            marginLeft: "5px",
                            fontWeight: 600
                        }}>

                        2022.04.03.
                    </EpistoFont>
                </Flex>
                <Flex
                    px="10px"
                    justify="center"
                    align="center">

                    <EpistoFont
                        fontSize="fontSmallPlus"
                        style={{
                            maxWidth: 600
                        }}>

                        Mivel kevesebb, mint 50%-ot értél el a felmérő teszten, számodra a Kezdő üzemmódot ajánlanánk. Ebben az esetben folyamatosan haladhatsz a videókkal, de nem tudsz szabadon elindítani újat, csak az éppen aktuálisan következőt (ekkor felnyílik a lakat ikon). A videókban csak addig a pontig tudsz előre tekerni, ameddig már egyszer eljutottál.
                        Bármikor átválthatsz azonban Haladó módra, ahol ezek a korlátozások megszűnnek!
                    </EpistoFont>
                </Flex>
                {
                    pretestResults && <Flex
                        my="15px"
                        justify="center"
                        align="center">

                        <EpistoButton
                            onClick={() => setModeAndNavigateAsync("beginner")}
                            variant={isBeginner ? "colored" : "plain"}>

                            Kezdő üzemmóddal indulok
                        </EpistoButton>

                        <EpistoButton
                            style={{
                                marginLeft: 10
                            }}
                            onClick={() => setModeAndNavigateAsync("advanced")}
                            variant={isBeginner ? "plain" : "colored"}>

                            Inkább haladó üzemmóddal kezdek
                        </EpistoButton>
                    </Flex>
                }
            </Flex>

        </LoadingFrame >
    )
}