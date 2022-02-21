import { usePretestData } from "../../../services/api/pretestApiService";
import { useNavigation } from "../../../services/core/navigatior";
import { useIntParam } from "../../../static/locationHelpers";
import { ExamQuestions } from "../../exam/ExamQuestions";
import { LoadingFrame } from "../../system/LoadingFrame";

export const PretestSubpage = () => {

    const courseId = useIntParam("courseId")!;
    const { navigateToWatchPretestResults } = useNavigation();

    const { pretestData, pretestDataError, pretestDataState } = usePretestData(courseId);

    const goToFirstWatchItem = () => {

        navigateToWatchPretestResults(courseId);
    }

    return (
        <LoadingFrame
            height="100%"
            error={pretestDataError}>

            {pretestData && <ExamQuestions
                exam={pretestData?.exam}
                answerSessionId={pretestData?.answerSessionId}
                onExamFinished={goToFirstWatchItem}
                hideLoading />}
        </LoadingFrame>
    )
}