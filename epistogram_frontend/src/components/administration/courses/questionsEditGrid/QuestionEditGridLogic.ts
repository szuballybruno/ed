import { useCallback, useMemo } from 'react';
import { getVirtualId } from '../../../../services/core/idService';
import { AnswerEditDTO } from '../../../../shared/dtos/AnswerEditDTO';
import { QuestionEditDataDTO } from '../../../../shared/dtos/QuestionEditDataDTO';
import { iterate } from '../../../../static/frontendHelpers';
import { useXListMutator } from '../../../lib/XMutator/XMutator';
import { RowSchema } from './QuestionEditGridTypes';

export const useQuestionEditGridLogic = (
    questions: QuestionEditDataDTO[],
    showTiming?: boolean,
    getPlayedSeconds?: () => number) => {

    const {
        mutatedData: mutatedQuestions,
        add: addQuestion,
        mutate: mutateQuestion,
        remove: removeQuestion,
        isAnyMutated,
        mutations,
        resetMutations,
        addOnMutationHandlers
    } = useXListMutator<QuestionEditDataDTO, 'questionVersionId', number>(questions, 'questionVersionId', () => console.log(''));

    console.log(mutations);

    //
    // add question
    const handleAddQuestion = useCallback(() => {

        const answers = iterate(4, (index): AnswerEditDTO => ({
            answerVersionId: getVirtualId(),
            text: '',
            isCorrect: false
        }));

        const question: QuestionEditDataDTO = {
            questionVersionId: getVirtualId(),
            questionText: '',
            questionShowUpTimeSeconds: 0,
            answers
        };

        addQuestion(question.questionVersionId, question);
    }, [addQuestion]);

    //
    // rows
    const questionRows = useMemo((): RowSchema[] => {

        if (mutatedQuestions.length === 0)
            return [];

        return mutatedQuestions
            .flatMap((question): RowSchema[] => {

                const headerRow = {
                    isQuestionHeader: true,
                    rowKey: `${question.questionVersionId}`,
                    questionEditDTO: question,
                    questionShowUpTimeSeconds: question.questionShowUpTimeSeconds,
                    questionText: question.questionText,
                    questionVersionId: question.questionVersionId
                } as RowSchema;

                const answerRows = question
                    .answers
                    .map((answer): Partial<RowSchema> => ({
                        isQuestionHeader: false,
                        rowKey: `${question.questionVersionId}-${answer.answerVersionId}`,
                        questionEditDTO: question,
                        answerEditDTO: answer,
                        answerVersionId: answer.answerVersionId,
                        isCorrect: answer.isCorrect,
                        text: answer.text
                    })) as RowSchema[];

                return [headerRow, ...answerRows];
            });
    }, [mutatedQuestions]);

    //
    // get key
    const getKey = useCallback(x => x.rowKey, []);

    return {
        questionRows,
        showTiming, 
        isAnyMutated,
        mutatedQuestions,
        getKey,
        handleAddQuestion,
        removeQuestion, 
        getPlayedSeconds, 
        mutateQuestion,
        resetMutations
    };
};

export type QuestionEditGridLogicType = ReturnType<typeof useQuestionEditGridLogic>;