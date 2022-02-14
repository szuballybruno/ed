import { LoadingFrame } from "../../system/LoadingFrame";

export const PretestResultsSubpage = () => {

    const courseId = useIntParam("courseId")!;
    const { navigateToPlayer } = useNavigation();

    const { pretestData, pretestDataError, pretestDataState } = usePretestData(courseId);

    const goToFirstWatchItem = () => {

        navigateToPlayer(pretestData!.firstItemCode);
    }

    return (
        <LoadingFrame
            height="100%"
            loadingState={pretestDataState}
            error={pretestDataError}>

            {pretestData && <ExamQuestions
                exam={pretestData?.exam}
                answerSessionId={pretestData?.answerSessionId}
                onExamFinished={goToFirstWatchItem} />}
        </LoadingFrame>
    )
}