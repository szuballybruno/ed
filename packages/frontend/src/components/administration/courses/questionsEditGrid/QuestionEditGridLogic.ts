import { useCallback, useEffect, useMemo } from 'react';
import { getVirtualId } from '../../../../services/core/idService';
import { AnswerEditDTO } from '../../../../shared/dtos/AnswerEditDTO';
import { ModuleEditDTO } from '../../../../shared/dtos/ModuleEditDTO';
import { QuestionEditDataReadDTO } from '../../../../shared/dtos/QuestionEditDataReadDTO';
import { Id } from '../../../../shared/types/versionId';
import { iterate } from '../../../../static/frontendHelpers';
import { useXMutatorNew } from '../../../lib/XMutator/XMutatorReact';
import { AnswerMutationsType, QuestionMutationsType, RowSchema } from './QuestionEditGridTypes';

export const useQuestionEditGridLogic = ({
    answerMutations,
    defaultModuleId,
    examVersionId,
    modules,
    questionMutations,
    questions,
    showQuestionModuleSelector,
    videoVersionId,
    getPlayedSeconds,
    onFocusChanged,
    showTiming
}: {
    questions: QuestionEditDataReadDTO[],
    questionMutations: QuestionMutationsType,
    answerMutations: AnswerMutationsType,
    videoVersionId: Id<'VideoVersion'> | null,
    examVersionId: Id<'ExamVersion'> | null,
    defaultModuleId: Id<'Module'> | null,
    modules: ModuleEditDTO[],
    showQuestionModuleSelector: boolean,
    showTiming?: boolean,
    getPlayedSeconds?: () => number,
    onFocusChanged?: (hasFocus: boolean) => void
}) => {

    const [questionMutatorState, questionMutatorFunctions] = useXMutatorNew(QuestionEditDataReadDTO, 'questionVersionId', 'QuestionMutator');
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

        const question: QuestionEditDataReadDTO = {
            questionVersionId: questionVersionId,
            questionText: '',
            questionShowUpTimeSeconds: 0,
            videoVersionId,
            examVersionId,
            answers: [],
            moduleId: defaultModuleId!
        };

        questionMutatorFunctions
            .create(question.questionVersionId, question);
    }, [videoVersionId, examVersionId, answerMutatorFunctions, questionMutatorFunctions, defaultModuleId]);

    /**
     * get rows 
     */
    const questionRows = useMemo((): RowSchema[] => {

        if (questionMutatorState.mutatedItems.length === 0)
            return [];

        return questionMutatorState
            .mutatedItems
            .flatMap((question): RowSchema[] => {

                const headerRow: RowSchema = {
                    isQuestionHeader: true,
                    rowKey: `${question.questionVersionId}`,
                    questionEditDTO: question,
                    questionShowUpTimeSeconds: question.questionShowUpTimeSeconds,
                    questionText: question.questionText,
                    questionVersionId: question.questionVersionId,
                    itemText: question.questionText,
                    moduleId: question.moduleId,
                    text: ''
                };

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

        return questionMutatorState.isAnyItemsMutated || answerMutatorState.isAnyItemsMutated;
    }, [questionMutatorState, answerMutatorState]);

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
        removeQuestion: questionMutatorFunctions.remove.bind(questionMutatorFunctions),
        mutateQuestion: questionMutatorFunctions.mutate.bind(questionMutatorFunctions),
        resetMutations: questionMutatorFunctions.resetMutations.bind(questionMutatorFunctions),
        createAnswer: answerMutatorFunctions.create.bind(answerMutatorFunctions),
        mutateAnswer: answerMutatorFunctions.mutate.bind(answerMutatorFunctions),
        deleteAnswer: answerMutatorFunctions.remove.bind(answerMutatorFunctions),
        onFocusChanged,
        modules,
        showQuestionModuleSelector
    };
};

export type QuestionEditGridLogicType = ReturnType<typeof useQuestionEditGridLogic>;