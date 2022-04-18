import React, { useCallback, useEffect, useState } from 'react';
import { useExamQuestionEditData, useSaveExamQuestionEditData } from '../../../services/api/examApiService';
import { getVirtualId } from '../../../services/core/idService';
import { useShowErrorDialog } from '../../../services/core/notifications';
import { QuestionEditDataDTO } from '../../../shared/dtos/QuestionEditDataDTO';
import { usePaging } from '../../../static/frontendHelpers';
import { EpistoDialogLogicType } from '../../EpistoDialog';
import { useXListMutator } from '../../lib/XMutator/XMutator';
import { EditDialogBase, EditDialogSubpage } from './EditDialogBase';
import { AdminExamQuestionsModalPage } from './modals/AdminExamQuestionsModalPage';
import { AdminExamStatisticsModalPage } from './modals/AdminExamStatisticsModalPage';
import { EditQuestionFnType, mapToQuestionSchema, QuestionSchema } from './VideoEditDialog';

export const ExamEditDialog = (props: {
    logic: EpistoDialogLogicType
}) => {

    const { logic } = props;

    const showError = useShowErrorDialog();

    // state
    const [preprocessedQuestions, setPreprocessedQuestions] = useState<QuestionEditDataDTO[]>([]);

    const preprocessItems = useCallback((questions: QuestionEditDataDTO[]) => {

        setPreprocessedQuestions(questions);
    }, [setPreprocessedQuestions]);

    const mutationEndCallback = useCallback(({ newMutatedItems }) => {

        preprocessItems(newMutatedItems);
    }, [preprocessItems]);
    // http
    const {
        examQuestionEditData,
        examQuestionEditDataState,
        examQuestionEditDataError,
        refetchExamQuestionEditData
    } = useExamQuestionEditData(logic.params!);
    const { saveExamQuestionEditData } = useSaveExamQuestionEditData();


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
    } = useXListMutator<QuestionEditDataDTO, 'questionId', number>(preprocessedQuestions, 'questionId', mutationEndCallback);

    // map data for mutator
    useEffect(() => {
        const questions = examQuestionEditData?.questions ?? [];

        setPreprocessedQuestions(questions);
    }, [examQuestionEditData]);

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
        console.log('handleaddquestion called...');

        const newId = getVirtualId();

        const dto: QuestionEditDataDTO = {
            videoId: null,
            examId: examQuestionEditData?.id || null,
            questionId: -1,
            questionText: '',
            answers: []
        };

        addQuestion(newId, dto);
    };

    const handleSaveQuestionsAsync = async () => {

        try {

            await saveExamQuestionEditData(mutations);
            resetMutations();
            logic.closeDialog();
        }
        catch (e) {

            showError(e);
        }
    };

    const paging = usePaging<EditDialogSubpage>([
        {
            content: () => <AdminExamQuestionsModalPage
                questions={mutatedData}
                handleAddQuestion={handleAddQuestion}
                handleMutateQuestion={handleMutateQuestion}
                handleSaveQuestions={handleSaveQuestionsAsync}
                examQuestionEditDataState={examQuestionEditDataState}
                examQuestionEditDataError={examQuestionEditDataError}
                isAnyQuestionsMutated={isAnyQuestionsMutated} />,
            title: 'Kérdések',
        },
        {
            content: () => <AdminExamStatisticsModalPage />,
            title: 'Statisztika',
        }
    ]);

    return <EditDialogBase
        logic={logic}
        title={examQuestionEditData?.title}
        subTitle={examQuestionEditData?.courseName}
        chipText='Vizsga'
        chipColor='var(--deepOrange)'
        paging={paging} />;
};