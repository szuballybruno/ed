import { useCallback, useEffect, useMemo } from 'react';
import { getVirtualId } from '../../../../services/core/idService';
import { AnswerEditDTO } from '../../../../shared/dtos/AnswerEditDTO';
import { QuestionEditDataDTO } from '../../../../shared/dtos/QuestionEditDataDTO';
import { Id } from '../../../../shared/types/versionId';
import { iterate } from '../../../../static/frontendHelpers';
import { useXMutator } from '../../../lib/XMutator/XMutatorReact';
import { AnswerMutationsType, QuestionMutationsType, RowSchema } from './QuestionEditGridTypes';

export const useQuestionEditGridLogic = (
    questions: QuestionEditDataDTO[],
    questionMutations: QuestionMutationsType,
    answerMutations: AnswerMutationsType,
    videoVersionId: Id<'VideoVersion'> | null,
    examVersionId: Id<'ExamVersion'> | null,
    showTiming?: boolean,
    getPlayedSeconds?: () => number,) => {

    const questionMutatorRef = useXMutator(QuestionEditDataDTO, 'questionVersionId');
    const answerMutatorRef = useXMutator(AnswerEditDTO, 'answerVersionId');

    // if video or exam version id changed
    // load questions, answers, and mutations 
    useEffect(() => {

        const q = questions ?? [];
        const a = q.flatMap(x => x.answers);
        const qmut = questionMutations ?? [];

        // questions 
        questionMutatorRef
            .current
            .setOriginalItems(q);

        questionMutatorRef
            .current
            .setMutations(qmut);

        // answers 
        answerMutatorRef
            .current
            .setOriginalItems(a);

        answerMutatorRef
            .current
            .setMutations(answerMutations);
    }, [questions, questionMutations, answerMutations, videoVersionId, examVersionId]);

    //
    // add question
    const handleAddQuestion = useCallback(() => {

        const questionVersionId = Id
            .create<'QuestionVersion'>(getVirtualId());

        iterate(4, () => {

            const newAnswerVersionId = Id
                .create<'AnswerVersion'>(getVirtualId());

            answerMutatorRef
                .current
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

        questionMutatorRef
            .current
            .create(question.questionVersionId, question);
    }, [videoVersionId, examVersionId]);

    //
    // rows
    const questionRows = useMemo((): RowSchema[] => {

        if (questionMutatorRef.current.mutatedItems.length === 0)
            return [];

        return questionMutatorRef
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

                const answerRows = answerMutatorRef
                    .current
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
    }, [questionMutatorRef.current.mutatedItems, answerMutatorRef.current.mutatedItems]);

    //
    // get key
    const getKey = useCallback(x => x.rowKey, []);

    return {
        questionRows,
        showTiming,
        isQuestionsMutated: questionMutatorRef.current.isAnyItemsMutated,
        mutatedQuestions: questionMutatorRef.current.mutatedItems,
        questionMutations: questionMutatorRef.current.mutations,
        answerMutations: answerMutatorRef.current.mutations,
        getKey,
        handleAddQuestion,
        getPlayedSeconds,
        removeQuestion: questionMutatorRef.current.remove,
        mutateQuestion: questionMutatorRef.current.mutate,
        resetMutations: questionMutatorRef.current.resetMutations,
        createAnswer: answerMutatorRef.current.create,
        mutateAnswer: answerMutatorRef.current.mutate,
        deleteAnswer: answerMutatorRef.current.remove
    };
};

export type QuestionEditGridLogicType = ReturnType<typeof useQuestionEditGridLogic>;