import { Id } from '@episto/commontypes';
import { ModuleEditDTO } from '@episto/communication';
import { useCallback, useMemo } from 'react';
import { CourseItemApiService } from '../../../../services/api/CourseItemApiService';
import { ArrayBuilder, usePaging } from '../../../../static/frontendHelpers';
import { EditDialogSubpage } from '../EditDialogBase';
import { AnswerMutationsType, QuestionMutationsType } from '../questionsEditGrid/QuestionEditGridTypes';
import { DetailsLayout } from './DetailsLayout';
import { ExamEditor, useExamEditorLogic } from './ExamEditor';
import { ExamStats } from './ExamStats';

export type ExamEditorCallbackDataType = {
    questionMutations: QuestionMutationsType,
    answerMutations: AnswerMutationsType,
}

export const ExamDetails = ({
    examVersionId,
    defaultModuleId,
    modules,
    questionMutations,
    answerMutations,
    callback,
    cancelEdit
}: {
    examVersionId: Id<'ExamVersion'>,
    defaultModuleId: Id<'Module'>,
    modules: ModuleEditDTO[],
    questionMutations: QuestionMutationsType,
    answerMutations: AnswerMutationsType,
    callback: (data: ExamEditorCallbackDataType) => void,
    cancelEdit: () => void
}) => {

    const { courseItemEditData, courseItemEditDataState } = CourseItemApiService
        .useCourseItemEditData(null, examVersionId, true);

    const { title, subtitle } = courseItemEditData ?? {
        title: '',
        subtitle: ''
    };

    const examEditorLogic = useExamEditorLogic({
        answerMutations,
        defaultModuleId,
        editData: courseItemEditData,
        examVersionId,
        modules,
        questionMutations,
        showQuestionModuleSelector: true
    });

    const handleOk = useCallback(() => {

        callback({
            questionMutations: examEditorLogic.questionMutations,
            answerMutations: examEditorLogic.answerMutations,
        });
    }, [
        callback,
        examEditorLogic.questionMutations,
        examEditorLogic.answerMutations,
    ]);

    const isChanged = useMemo(() => {

        if (examEditorLogic.questionMutations !== questionMutations)
            return true;

        if (examEditorLogic.answerMutations !== answerMutations)
            return true;

        return false;
    }, [
        examEditorLogic.questionMutations,
        examEditorLogic.answerMutations,
        questionMutations,
        answerMutations,
    ]);

    const pages = courseItemEditData
        ? new ArrayBuilder()
            .add({
                content: () => <ExamEditor
                    logic={examEditorLogic} />,
                title: 'Szerkesztés'
            })
            .add({
                content: () => <ExamStats />,
                title: 'Statisztika'
            })
            .getArray()
        : [];

    const paging = usePaging<EditDialogSubpage>({
        items: pages
    });

    return (
        <DetailsLayout
            subTitle={subtitle}
            title={title}
            paging={paging}
            chipText={'Vizsga'}
            chipColor={'var(--deepOrange)'}
            cancelEdit={cancelEdit}
            okEdit={handleOk}
            okEnabled={isChanged} />
    );
};