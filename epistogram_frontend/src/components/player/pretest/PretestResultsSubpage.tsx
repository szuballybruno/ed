import { Flex } from "@chakra-ui/react";
import { CourseModeType } from "../../../shared/types/sharedTypes";
import { useSetCourseMode } from "../../../services/api/courseApiService";
import { usePretestResults } from "../../../services/api/pretestApiService";
import { useNavigation } from "../../../services/core/navigatior";
import { useShowErrorDialog } from "../../../services/core/notifications";
import { useIntParam } from "../../../static/locationHelpers";
import { EpistoButton } from "../../controls/EpistoButton";
import { EpistoFont } from "../../controls/EpistoFont";
import { LoadingFrame } from "../../system/LoadingFrame";

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
            loadingState={[pretestResultsState, setCourseModeState]}
            error={pretestResultsError}
            direction="column">

            <EpistoFont fontSize="fontMid">
                Your test success rate:
            </EpistoFont>

            <EpistoFont
                style={{
                    margin: "5px",
                    color: "var(--mildGreen)"
                }}
                fontSize="fontLarge">

                {correctAnswerRate}
            </EpistoFont>

            {pretestResults && <Flex>
                <EpistoButton
                    onClick={() => setModeAndNavigateAsync("beginner")}
                    variant={isBeginner ? "colored" : "outlined"}>

                    Select beginner mode
                </EpistoButton>

                <EpistoButton
                    onClick={() => setModeAndNavigateAsync("advanced")}
                    variant={isBeginner ? "outlined" : "colored"}>

                    Select advanced mode
                </EpistoButton>
            </Flex>}
        </LoadingFrame>
    )
}