import { useCallback, useEffect, useMemo, useRef } from 'react';
import { getVirtualId } from '../../../../services/core/idService';
import { AnswerEditDTO } from '../../../../shared/dtos/AnswerEditDTO';
import { QuestionEditDataDTO } from '../../../../shared/dtos/QuestionEditDataDTO';
import { iterate, useForceUpdate, valueCompareTest } from '../../../../static/frontendHelpers';
import { XMutatorCore } from '../../../lib/XMutator/XMutatorCore';
import { RowSchema } from './QuestionEditGridTypes';

export const useQuestionEditGridLogic = (
    questions: QuestionEditDataDTO[],
    showTiming?: boolean,
    getPlayedSeconds?: () => number) => {

    // const {
    //     mutatedData: mutatedQuestions,
    //     add: addQuestion,
    //     mutate: mutateQuestion,
    //     remove: removeQuestion,
    //     isAnyMutated,
    //     mutations,
    //     resetMutations,
    //     addOnMutationHandlers
    // } = useXListMutator<QuestionEditDataDTO, 'questionVersionId', number>(questions, 'questionVersionId', () => console.log(''));

    const forceUpdate = useForceUpdate();

    const mutatorRef = useRef(new XMutatorCore<QuestionEditDataDTO, 'questionVersionId', number>({
        keyPropertyName: 'questionVersionId',
        onMutatedItems: () => {
            console.log('---------------- mut ------------------');
            forceUpdate();
        }
    }));

    useEffect(() => {

        mutatorRef
            .current
            .setOriginalItems(questions);
    }, [questions]);

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

        mutatorRef.current.add(question.questionVersionId, question);
    }, []);

    //
    // rows
    const questionRows = useMemo((): RowSchema[] => {

        if (mutatorRef.current.mutatedItems.length === 0)
            return [];

        return mutatorRef
            .current
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

                const answerRows = question
                    .answers
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
    }, [mutatorRef.current.mutatedItems]);

    //
    // get key
    const getKey = useCallback(x => x.rowKey, []);

    return {
        questionRows,
        showTiming,
        isAnyMutated: mutatorRef.current.isAnyMutated,
        mutatedQuestions: mutatorRef.current.mutatedItems,
        mutations: mutatorRef.current.mutations,
        getKey,
        handleAddQuestion,
        removeQuestion: mutatorRef.current.remove,
        getPlayedSeconds,
        mutateQuestion: mutatorRef.current.mutate,
        resetMutations: mutatorRef.current.resetMutations,
    };
};

export type QuestionEditGridLogicType = ReturnType<typeof useQuestionEditGridLogic>;