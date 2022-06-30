import { usePaging } from '../../../../static/frontendHelpers';
import { } from '../../../universal/epistoDialog/EpistoDialog';
import { EpistoDialogLogicType } from '../../../universal/epistoDialog/EpistoDialogTypes';
import { ExamEditor } from './ExamEditor';
import { AdminExamStatisticsModalPage } from './ExamStats';
import { EditDialogBase, EditDialogSubpage } from '../EditDialogBase';
import { ExamEditDialogParams } from './ExamEditDialogTypes';
import { useCallback } from 'react';
import { QuestionMutationsType } from '../questionsEditGrid/QuestionEditGridTypes';

export const ExamEditDialog = ({
    dialogLogic,
    callback
}: {
    dialogLogic: EpistoDialogLogicType<ExamEditDialogParams>,
    callback: (mutations: QuestionMutationsType) => void,
}) => {

    const { courseTitle, examTitle, examVersionId, mutations } = dialogLogic.params;

    const handleCallback = useCallback((mutations: QuestionMutationsType) => {

        dialogLogic.closeDialog();
        callback(mutations);
    }, [callback]);

    const paging = usePaging<EditDialogSubpage>([
        {
            content: () => <ExamEditor
                callback={handleCallback}
                examVersionId={examVersionId}
                endabled={dialogLogic.isOpen}
                mutations={mutations} />,
            title: 'Kérdések',
        },
        {
            content: () => <AdminExamStatisticsModalPage />,
            title: 'Statisztika',
        }
    ]);

    return <EditDialogBase
        logic={dialogLogic}
        title={examTitle}
        subTitle={courseTitle}
        chipText='Vizsga'
        chipColor='var(--deepOrange)'
        paging={paging} />;
};