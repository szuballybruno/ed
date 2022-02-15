import { usePretestResults } from "../../../services/api/pretestApiService";
import { useNavigation } from "../../../services/core/navigatior";
import { useIntParam } from "../../../static/frontendHelpers";
import { LoadingFrame } from "../../system/LoadingFrame";

export const PretestResultsSubpage = () => {

    const courseId = useIntParam("courseId")!;
    const { navigateToPlayer } = useNavigation();

    const { pretestResults, pretestResultsError, pretestResultsState } = usePretestResults(courseId);

    return (
        <LoadingFrame
            height="100%"
            loadingState={pretestResultsState}
            error={pretestResultsError}>

            {pretestResults?.correctAnswerRate}
        </LoadingFrame>
    )
}