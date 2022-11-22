import { applicationRoutes } from '../../../configuration/applicationRoutes';
import { PretestApiService } from '../../../services/api/pretestApiService';
import { useNavigation } from '../../../services/core/navigatior';
import { useRouteParams_OLD } from '../../../static/locationHelpers';
import { ExamQuestions } from '../../exam/ExamQuestions';
import { LoadingFrame } from '../../system/LoadingFrame';

export const PretestSubpage = () => {

    const courseId = useRouteParams_OLD(applicationRoutes.playerRoute.pretestRoute)
        .getValue(x => x.courseId, 'int');

    const { navigate2 } = useNavigation();

    const { pretestData, pretestDataError, pretestDataState } = PretestApiService.usePretestData(courseId);
    const { finishPretest } = PretestApiService.useFinishPretest();

    const answerSessionId = pretestData?.answerSessionId!;

    const handleFinishPretest = async () => {

        await finishPretest({ answerSessionId });
        navigate2(applicationRoutes.playerRoute.pretestResultsRoute, { courseId });
    };

    return (
        <LoadingFrame
            height="100%"
            error={pretestDataError}>

            {pretestData && <ExamQuestions
                exam={pretestData?.exam}
                answerSessionId={pretestData?.answerSessionId}
                onExamFinished={handleFinishPretest}
                handleAbortExam={handleFinishPretest}
                isExamInProgress={true}
                hideLoading />}
        </LoadingFrame>
    );
};
