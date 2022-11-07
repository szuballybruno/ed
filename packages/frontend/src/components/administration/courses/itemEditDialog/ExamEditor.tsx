import { useCallback, useMemo } from 'react';
import { CourseItemApiService } from '../../../../services/api/CourseItemApiService';
import { ModuleEditDTO } from '../../../../shared/dtos/ModuleEditDTO';
import { Id } from '../../../../shared/types/versionId';
import { translatableTexts } from '../../../../static/translatableTexts';
import { EpistoButton } from '../../../controls/EpistoButton';
import { EpistoFlex2 } from '../../../controls/EpistoFlex';
import { LoadingFrame } from '../../../system/LoadingFrame';
import { useQuestionEditGridLogic } from '../questionsEditGrid/QuestionEditGridLogic';
import { AnswerMutationsType, QuestionMutationsType } from '../questionsEditGrid/QuestionEditGridTypes';
import { QuestionsEditGrid } from '../questionsEditGrid/QuestionsEditGrid';

export const ExamEditor = ({
    examVersionId,
    endabled,
    callback,
    questionMutations,
    answerMutations,
    defaultModuleId,
    modules,
    showQuestionModuleSelector
}: {
    examVersionId: Id<'ExamVersion'>,
    endabled: boolean,
    callback: (questionMutations: QuestionMutationsType, answerMutations: AnswerMutationsType) => void,
    questionMutations: QuestionMutationsType,
    answerMutations: AnswerMutationsType,
    defaultModuleId: Id<'Module'> | null,
    modules: ModuleEditDTO[],
    showQuestionModuleSelector: boolean
}) => {

    // http
    const { courseItemEditData, courseItemEditDataState } = CourseItemApiService
        .useCourseItemEditData(null, examVersionId, endabled);

    const questions = useMemo(() => courseItemEditData?.questions ?? [], [courseItemEditData]);

    const logic = useQuestionEditGridLogic({
        questions,
        questionMutations,
        answerMutations,
        videoVersionId: null,
        examVersionId,
        defaultModuleId,
        modules,
        showTiming: true,
        showQuestionModuleSelector
    });

    const handleFinishItemEdit = useCallback(() => {

        callback(logic.questionMutations, logic.answerMutations);
    }, [callback, logic]);

    return <LoadingFrame
        loadingState={'success'}
        flex='1'
        direction='column'
        className="roundBorders largeSoftShadow"
        justify='flex-start'
        overflowY='scroll'
        style={{
            padding: '10px',
            background: 'var(--transparentWhite90)'
        }}>

        <EpistoFlex2
            flex='1'
            direction='column'>

            {/* questions list  */}
            <QuestionsEditGrid
                logic={logic} />

            {/* buttons */}
            <EpistoFlex2
                width="100%"
                marginTop="10px"
                justify="flex-end">

                {/* reset */}
                <EpistoButton
                    isDisabled={!logic.isQuestionsMutated}
                    onClick={logic.resetMutations}
                    variant="outlined">

                    {translatableTexts.misc.reset}
                </EpistoButton>

                {/* ok */}
                <EpistoButton
                    margin={{ left: 'px10' }}
                    isDisabled={!logic.isQuestionsMutated}
                    onClick={handleFinishItemEdit}
                    variant="colored">

                    {translatableTexts.misc.ok}
                </EpistoButton>
            </EpistoFlex2>
        </EpistoFlex2>
    </LoadingFrame>;
};
