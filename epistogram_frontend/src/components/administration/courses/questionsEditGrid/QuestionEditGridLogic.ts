import { useCallback, useEffect, useMemo } from 'react';
import { getVirtualId } from '../../../../services/core/idService';
import { AnswerEditDTO } from '../../../../shared/dtos/AnswerEditDTO';
import { QuestionEditDataDTO } from '../../../../shared/dtos/QuestionEditDataDTO';
import { Id } from '../../../../shared/types/versionId';
import { iterate } from '../../../../static/frontendHelpers';
import { useXMutatorNew } from '../../../lib/XMutator/XMutatorReact';
import { AnswerMutationsType, QuestionMutationsType, RowSchema } from './QuestionEditGridTypes';

export const useQuestionEditGridLogic = (
    questions: QuestionEditDataDTO[],
    questionMutations: QuestionMutationsType,
    answerMutations: AnswerMutationsType,
    videoVersionId: Id<'VideoVersion'> | null,
    examVersionId: Id<'ExamVersion'> | null,
    showTiming?: boolean,
    getPlayedSeconds?: () => number,) => {

    const [questionMutatorState, questionMutatorFunctions] = useXMutatorNew(QuestionEditDataDTO, 'questionVersionId', 'QuestionMutator');
    const [answerMutatorState, answerMutatorFunctions] = useXMutatorNew(AnswerEditDTO, 'answerVersionId', 'AnswerMutator');

    /**
     * if video or exam version id changed
     * load questions, answers, and mutations 
     */
    useEffect(() => {

        const originalQuestions = questions ?? [];
        const originalAnswers = originalQuestions.flatMap(x => x.answers);
        const questionMutationsNonNull = questionMutations ?? [];

        // questions 
        questionMutatorFunctions
            .setOriginalItems(originalQuestions);

        questionMutatorFunctions
            .setMutations(questionMutationsNonNull);

        // answers 
        answerMutatorFunctions
            .setOriginalItems(originalAnswers);

        answerMutatorFunctions
            .setMutations(answerMutations);
    }, [
        questions,
        questionMutations,
        answerMutations,
        videoVersionId,
        examVersionId,
        answerMutatorFunctions,
        questionMutatorFunctions
    ]);

    /**
     * Add new quesiton
     */
    const handleAddQuestion = useCallback(() => {

        const questionVersionId = Id
            .create<'QuestionVersion'>(getVirtualId());

        iterate(4, () => {

            const newAnswerVersionId = Id
                .create<'AnswerVersion'>(getVirtualId());

            answerMutatorFunctions
                .create(newAnswerVersionId, {
                    answerVersionId: newAnswerVersionId,
                    isCorrect: false,
                    questionVersionId: questionVersionId,
                    text: ''
                });
        });

        const question: QuestionEditDataDTO = {
            questionVersionId: questionVersionId,
            questionText: '',
            questionShowUpTimeSeconds: 0,
            videoVersionId,
            examVersionId,
            answers: []
        };

        questionMutatorFunctions
            .create(question.questionVersionId, question);
    }, [videoVersionId, examVersionId, answerMutatorFunctions, questionMutatorFunctions]);

    /**
     * get rows 
     */
    const questionRows = useMemo((): RowSchema[] => {

        if (questionMutatorState.mutatedItems.length === 0)
            return [];

        return questionMutatorState
            .mutatedItems
            .flatMap((question): RowSchema[] => {

                const headerRow = {
                    isQuestionHeader: true,
                    rowKey: `${question.questionVersionId}`,
                    questionEditDTO: question,
                    questionShowUpTimeSeconds: question.questionShowUpTimeSeconds,
                    questionText: question.questionText,
                    questionVersionId: question.questionVersionId,
                    itemText: question.questionText
                } as RowSchema;

                const answerRows = answerMutatorState
                    .mutatedItems
                    .filter(x => x.questionVersionId === question.questionVersionId)
                    .map((answer): RowSchema => ({
                        ...headerRow,
                        isQuestionHeader: false,
                        rowKey: `${question.questionVersionId}-${answer.answerVersionId}`,
                        answerEditDTO: answer,
                        answerVersionId: answer.answerVersionId,
                        isCorrect: answer.isCorrect,
                        text: answer.text,
                        itemText: answer.text,
                    })) as RowSchema[];

                return [headerRow, ...answerRows];
            });
    }, [questionMutatorState, answerMutatorState]);

    /**
     * Get key from row
     */
    const getKey = useCallback(x => x.rowKey, []);

    /**
     * Calculate if something has 
     * been mutated or not 
     */
    const isAnyQuestionsMutated = useMemo(() => {

        return questionMutatorFunctions.getIsAnyItemsMutated() || answerMutatorFunctions.getIsAnyItemsMutated();
    }, [answerMutatorFunctions, questionMutatorFunctions]);

    return {
        questionRows,
        showTiming,
        isQuestionsMutated: isAnyQuestionsMutated,
        mutatedQuestions: questionMutatorState.mutatedItems,
        questionMutations: questionMutatorState.mutations,
        answerMutations: answerMutatorState.mutations,
        getKey,
        handleAddQuestion,
        getPlayedSeconds,
        removeQuestion: questionMutatorFunctions.remove,
        mutateQuestion: questionMutatorFunctions.mutate,
        resetMutations: questionMutatorFunctions.resetMutations,
        createAnswer: answerMutatorFunctions.create,
        mutateAnswer: answerMutatorFunctions.mutate,
        deleteAnswer: answerMutatorFunctions.remove
    };
};

export type QuestionEditGridLogicType = ReturnType<typeof useQuestionEditGridLogic>;