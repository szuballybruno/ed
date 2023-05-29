import { Id } from '@episto/commontypes';
import { CourseItemEditDTO, ModuleEditDTO } from '@episto/communication';
import { useMemo } from 'react';
import { EpistoFlex2 } from '../../../controls/EpistoFlex';
import { LoadingFrame } from '../../../system/LoadingFrame';
import { useQuestionEditGridLogic } from '../questionsEditGrid/QuestionEditGridLogic';
import { AnswerMutationsType, QuestionMutationsType } from '../questionsEditGrid/QuestionEditGridTypes';
import { QuestionsEditGrid } from '../questionsEditGrid/QuestionsEditGrid';

export const useExamEditorLogic = ({
    editData,
    examVersionId,
    questionMutations,
    answerMutations,
    defaultModuleId,
    modules,
    showQuestionModuleSelector
}: {
    editData: CourseItemEditDTO | null,
    examVersionId: Id<'ExamVersion'>,
    questionMutations: QuestionMutationsType,
    answerMutations: AnswerMutationsType,
    defaultModuleId: Id<'Module'> | null,
    modules: ModuleEditDTO[],
    showQuestionModuleSelector: boolean
}) => {

    const courseItemEditData = editData;
    const questions = useMemo(() => courseItemEditData?.questions ?? [], [courseItemEditData]);

    const questionEditorLogic = useQuestionEditGridLogic({
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

    return {
        questionEditorLogic,
        questionMutations: questionEditorLogic.questionMutations,
        answerMutations: questionEditorLogic.answerMutations
    };
};

type ExamEditorLogicType = ReturnType<typeof useExamEditorLogic>;

export const ExamEditor = ({
    logic
}: {
    logic: ExamEditorLogicType
}) => {

    const {
        questionEditorLogic
    } = logic;

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
                logic={questionEditorLogic} />

        </EpistoFlex2>
    </LoadingFrame>;
};
