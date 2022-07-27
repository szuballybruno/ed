import { applicationRoutes } from '../../../configuration/applicationRoutes';
import { usePretestData } from '../../../services/api/pretestApiService';
import { useNavigation } from '../../../services/core/navigatior';
import { useRouteParams } from '../../../static/locationHelpers';
import { ExamQuestions } from '../../exam/ExamQuestions';
import { LoadingFrame } from '../../system/LoadingFrame';

export const PretestSubpage = () => {

    const courseId = useRouteParams(applicationRoutes.playerRoute.pretestRoute)
        .getValue(x => x.courseId, 'int');

    const { navigate2 } = useNavigation();

    const { pretestData, pretestDataError, pretestDataState } = usePretestData(courseId);

    const goToPretestResults = () => {

        navigate2(applicationRoutes.playerRoute.pretestResultsRoute, { courseId });
    };

    return (
        <LoadingFrame
            height="100%"
            error={pretestDataError}>

            {pretestData && <ExamQuestions
                exam={pretestData?.exam}
                answerSessionId={pretestData?.answerSessionId}
                onExamFinished={goToPretestResults}
                handleAbortExam={goToPretestResults}
                hideLoading />}
        </LoadingFrame>
    );
};