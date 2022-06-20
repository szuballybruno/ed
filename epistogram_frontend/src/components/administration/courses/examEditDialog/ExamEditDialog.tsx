import { usePaging } from '../../../../static/frontendHelpers';
import { } from '../../../universal/epistoDialog/EpistoDialog';
import { EpistoDialogLogicType } from '../../../universal/epistoDialog/EpistoDialogTypes';
import { ExamEditor } from './ExamEditor';
import { AdminExamStatisticsModalPage } from './ExamStats';
import { EditDialogBase, EditDialogSubpage } from '../EditDialogBase';
import { ExamEditDialogParams } from './ExamEditDialogTypes';

export const ExamEditDialog = (props: {
    dialogLogic: EpistoDialogLogicType<ExamEditDialogParams>
}) => {

    const { dialogLogic } = props;
    const { courseName: courseTitle, examTitle, examVersionId } = dialogLogic.params;

    const paging = usePaging<EditDialogSubpage>([
        {
            content: () => <ExamEditor
                examVersionId={examVersionId}
                endabled={dialogLogic.isOpen} />,
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