import React, { useCallback, useEffect, useState } from 'react';
import { useSaveVideoQuestionEditData, useVideoQuestionEditData } from '../../../services/api/videoApiService';
import { getVirtualId } from '../../../services/core/idService';
import { useShowErrorDialog } from '../../../services/core/notifications';
import { AnswerEditDTO } from '../../../shared/dtos/AnswerEditDTO';
import { QuestionEditDataDTO } from '../../../shared/dtos/QuestionEditDataDTO';
import { EpistoDialogLogicType } from '../../EpistoDialog';
import { CourseItemEditDialogBase } from './CourseItemEditDialogBase';
import { AdminVideoQuestionsModalPage } from './modals/AdminVideoQuestionsModalPage';
import { AdminVideoStatisticsModalPage } from './modals/AdminVideoStatisticsModalPage';
import { useXListMutator } from './XMutator';

export type QuestionSchema = {
    itemId: number,
    questionId: number,
    questionText: string,
    answers: AnswerEditDTO[]
}

export type EditQuestionFnType = <TField extends keyof QuestionSchema, >(key: number, field: TField, value: QuestionSchema[TField]) => void;


export const mapToQuestionSchema = (item: QuestionEditDataDTO, itemId: number): QuestionSchema => {

    return {
        itemId: itemId,
        questionId: item.questionId,
        questionText: item.questionText,
        answers: item.answers
            .map(answer => ({
                id: answer.id,
                text: answer.text,
                isCorrect: false
            }))
    };
};

export const VideoEditDialog = (props: {
    logic: EpistoDialogLogicType<number>
}) => {

    // props
    const { logic } = props;

    // util
    const showError = useShowErrorDialog();

    // state
    const [preprocessedQuestions, setPreprocessedQuestions] = useState<QuestionSchema[]>([]);

    // http
    const {
        videoQuestionEditData,
        videoQuestionEditDataState,
        videoQuestionEditDataError,
        refetchVideoQuestionEditData
    } = useVideoQuestionEditData(logic.params!);
    const { saveVideoQuestionEditData } = useSaveVideoQuestionEditData();

    // computed
    const videoUrl = videoQuestionEditData?.videoUrl || '';
    const videoTitle = videoQuestionEditData?.title || '';
    const courseName = videoQuestionEditData?.courseName || '';

    const getRowKey = useCallback((question: QuestionSchema) => {
        console.log(question.questionId);
        return question.questionId;
    }, []);

    const {
        mutatedData,
        add: addQuestion,
        mutate: mutateQuestion,
        remove: removeQuestion,
        isMutated: isQuestionModified,
        isAnyMutated: isAnyQuestionsMutated,
        mutations,
        resetMutations,
        addOnMutationHandlers
    } = useXListMutator<QuestionSchema, number>(preprocessedQuestions, getRowKey, 'questionId');

    // map data for mutator
    useEffect(() => {
        const questions = videoQuestionEditData?.questions ?? [];

        const preproQuestions = questions
            .map((item, index) => mapToQuestionSchema(item, videoQuestionEditData?.id!));

        setPreprocessedQuestions(preproQuestions);
    }, [videoQuestionEditData]);

    // reset mutations on dialog close
    useEffect(() => {

        if (logic.isOpen!)
            resetMutations();
    }, [logic.isOpen]);

    // logs mutateddata when it changes
    useEffect(() => {

        console.log(mutatedData);
        console.log(mutations);
    }, [mutatedData]);

    // mutation handlers
    const handleMutateQuestion: EditQuestionFnType = (key, field, value) => {

        mutateQuestion({ key, field: field as any, newValue: value });
    };

    const handleAddQuestion = () => {

        const newId = getVirtualId();

        const dto: QuestionEditDataDTO = {
            questionId: -1,
            questionText: '',
            answers: []
        };

        const question = mapToQuestionSchema(dto, videoQuestionEditData?.id!);

        addQuestion(newId, question);
    };

    const handleSaveQuestionsAsync = async () => {

        try {

            await saveVideoQuestionEditData(mutations as any);
            resetMutations();
            logic.closeDialog();
        }
        catch (e) {

            showError(e);
        }
    };

    return <CourseItemEditDialogBase
        title={videoTitle}
        subTitle={courseName}
        chipText='Videó'
        chipColor='var(--deepBlue)'
        logic={logic}
        subpages={[
            {
                content: () => <AdminVideoQuestionsModalPage
                    videoUrl={videoUrl}
                    questions={mutatedData}
                    handleAddQuestion={handleAddQuestion}
                    handleMutateQuestion={handleMutateQuestion}
                    handleSaveQuestions={handleSaveQuestionsAsync}
                    isAnyQuestionsMutated={isAnyQuestionsMutated} />,
                title: 'Kérdések'
            },
            {
                content: () => <AdminVideoStatisticsModalPage />,
                title: 'Statisztika'
            }
        ]} />;
};