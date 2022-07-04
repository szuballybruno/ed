import { Flex } from '@chakra-ui/react';
import { useCallback, useMemo } from 'react';
import { CourseItemApiService } from '../../../../services/api/CourseItemApiService';
import { translatableTexts } from '../../../../static/translatableTexts';
import { EpistoButton } from '../../../controls/EpistoButton';
import { LoadingFrame } from '../../../system/LoadingFrame';
import { useQuestionEditGridLogic } from '../questionsEditGrid/QuestionEditGridLogic';
import { AnswerMutationsType, QuestionMutationsType } from '../questionsEditGrid/QuestionEditGridTypes';
import { QuestionsEditGrid } from '../questionsEditGrid/QuestionsEditGrid';

export const ExamEditor = ({
    examVersionId,
    endabled,
    callback,
    questionMutations,
    answerMutations
}: {
    examVersionId: number,
    endabled: boolean,
    callback: (mutations: QuestionMutationsType) => void,
    questionMutations: QuestionMutationsType,
    answerMutations: AnswerMutationsType
}) => {

    // http
    const { courseItemEditData, courseItemEditDataState } = CourseItemApiService
        .useCourseItemEditData(null, examVersionId, endabled);

    const questions = useMemo(() => courseItemEditData?.questions ?? [], [courseItemEditData]);

    const logic = useQuestionEditGridLogic(questions, questionMutations, answerMutations, null, examVersionId);

    const finish = useCallback(() => {

        callback(logic.questionMutations);
    }, [callback, logic.questionMutations]);

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

        <Flex
            flex='1'
            direction='column'>

            {/* questions list  */}
            <QuestionsEditGrid
                logic={logic} />

            {/* buttons */}
            <Flex
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
                    onClick={finish}
                    variant="colored">

                    {translatableTexts.misc.ok}
                </EpistoButton>
            </Flex>
        </Flex>
    </LoadingFrame>;
};
