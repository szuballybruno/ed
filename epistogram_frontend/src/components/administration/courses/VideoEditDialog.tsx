import React, { useCallback, useEffect, useState } from 'react';
import { useSaveVideoQuestionEditData, useVideoQuestionEditData } from '../../../services/api/videoApiService';
import { getVirtualId } from '../../../services/core/idService';
import { useShowErrorDialog } from '../../../services/core/notifications';
import { AnswerEditDTO } from '../../../shared/dtos/AnswerEditDTO';
import { QuestionEditDataDTO } from '../../../shared/dtos/QuestionEditDataDTO';
import { iterate, usePaging } from '../../../static/frontendHelpers';
import { EpistoDialogLogicType } from '../../EpistoDialog';
import { useXListMutator } from '../../lib/XMutator/XMutator';
import { AdminVideoQuestionsModalPage } from './dialogs/AdminVideoQuestionsDialogPage';
import { AdminVideoStatisticsModalPage } from './dialogs/AdminVideoStatisticsDialogPage';
import { EditDialogBase, EditDialogSubpage } from './EditDialogBase';


export type EditQuestionFnType = <TField extends keyof QuestionEditDataDTO, >(key: number, field: TField, value: QuestionEditDataDTO[TField]) => void;

export const VideoEditDialog = (props: {
    logic: EpistoDialogLogicType<number>
}) => {

    // props
    const { logic } = props;
    const videoId = logic.params!;

    // util
    const showError = useShowErrorDialog();

    // state
    const [preprocessedQuestions, setPreprocessedQuestions] = useState<QuestionEditDataDTO[]>([]);


    // http
    const {
        videoQuestionEditData,
        videoQuestionEditDataState,
        videoQuestionEditDataError,
        refetchVideoQuestionEditData
    } = useVideoQuestionEditData(videoId);
    const { saveVideoQuestionEditData } = useSaveVideoQuestionEditData();

    // computed
    const videoUrl = videoQuestionEditData?.videoUrl || '';
    const videoTitle = videoQuestionEditData?.title || '';
    const courseName = videoQuestionEditData?.courseName || '';

    const questions = videoQuestionEditData?.questions ?? [];

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
    } = useXListMutator<QuestionEditDataDTO, 'questionId', number>(questions, 'questionId', () => console.log(''));

    // reset mutations on dialog close
    useEffect(() => {

        if (logic.isOpen!)
            resetMutations();
    }, [logic.isOpen]);

    // mutation handlers
    const handleMutateQuestion: EditQuestionFnType = (key, field, value) => {

        mutateQuestion({ key, field: field as any, newValue: value });
    };

    const handleAddQuestion = () => {

        const newId = getVirtualId();

        const dto: QuestionEditDataDTO = {
            videoId: videoId,
            examId: null,
            questionId: newId,
            questionText: '',
            questionShowUpTimeSeconds: 0,
            answers: iterate(4, (index) => ({
                id: 0 - index,
                text: '',
                isCorrect: false
            } as AnswerEditDTO))
        };

        addQuestion(newId, dto);
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