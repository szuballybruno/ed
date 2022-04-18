import React, { useCallback, useEffect, useState } from 'react';
import { useSaveVideoQuestionEditData, useVideoQuestionEditData } from '../../../services/api/videoApiService';
import { getVirtualId } from '../../../services/core/idService';
import { useShowErrorDialog } from '../../../services/core/notifications';
import { AnswerEditDTO } from '../../../shared/dtos/AnswerEditDTO';
import { QuestionEditDataDTO } from '../../../shared/dtos/QuestionEditDataDTO';
import { EpistoDialogLogicType } from '../../EpistoDialog';
import { EditDialogBase, EditDialogSubpage } from './EditDialogBase';
import { AdminVideoQuestionsModalPage } from './modals/AdminVideoQuestionsModalPage';
import { AdminVideoStatisticsModalPage } from './modals/AdminVideoStatisticsModalPage';
import { useXListMutator } from '../../lib/XMutator/XMutator';
import { usePaging } from '../../../static/frontendHelpers';

export type QuestionSchema = {
    videoId: number | null,
    examId: number | null,
    questionId: number,
    questionText: string,
    questionShowUpTimeSeconds: number | undefined,
    answers: AnswerEditDTO[]
}

export type EditQuestionFnType = <TField extends keyof QuestionSchema, >(key: number, field: TField, value: QuestionSchema[TField]) => void;


export const mapToQuestionSchema = (
    item: QuestionEditDataDTO,
    videoId?: number,
    examId?: number
): QuestionSchema => {

    return {
        videoId: videoId ?? null,
        examId: examId ?? null,
        questionId: item.questionId,
        questionText: item.questionText,
        questionShowUpTimeSeconds: item.questionShowUpTimeSeconds,
        answers: item.answers
            .map(answer => ({
                id: answer.id,
                text: answer.text,
                isCorrect: answer.isCorrect
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

    const questions = videoQuestionEditData?.questions ?? [];

    const preprocessItems = useCallback((questions: QuestionEditDataDTO[]) => {

        const preproQuestions = questions
            .map((item, index) => mapToQuestionSchema(item, videoQuestionEditData?.id!));

        setPreprocessedQuestions(preproQuestions);
    }, [setPreprocessedQuestions]);

    const mutationEndCallback = useCallback(({ newMutatedItems }) => {

        preprocessItems(newMutatedItems);
    }, [preprocessItems]);

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
    } = useXListMutator<QuestionEditDataDTO, 'questionId', number>(questions, 'questionId', mutationEndCallback);

    // map data for mutator
    useEffect(() => {

        if (!videoQuestionEditData)
            return;

        preprocessItems(videoQuestionEditData.questions);
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
            videoId: null,
            examId: null,
            questionId: -1,
            questionText: '',
            questionShowUpTimeSeconds: 0,
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

    const paging = usePaging<EditDialogSubpage>([
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
    ]);

    return <EditDialogBase
        title={videoTitle}
        subTitle={courseName}
        chipText='Videó'
        chipColor='var(--deepBlue)'
        logic={logic}
        paging={paging} />;
};