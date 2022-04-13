import React from 'react';
import { usePaging } from '../../../static/frontendHelpers';
import { EpistoDialogLogicType } from '../../EpistoDialog';
import { EditDialogBase, EditDialogSubpage } from './EditDialogBase';
import { AdminExamQuestionsModalPage } from './modals/AdminExamQuestionsModalPage';
import { AdminExamStatisticsModalPage } from './modals/AdminExamStatisticsModalPage';

export const ExamEditDialog = (props: {
    logic: EpistoDialogLogicType
}) => {

    const { logic } = props;

    const paging = usePaging<EditDialogSubpage>([
        {
            content: () => <AdminExamQuestionsModalPage />,
            title: 'Kérdések',
        },
        {
            content: () => <AdminExamStatisticsModalPage />,
            title: 'Statisztika',
        }
    ]);

    return <EditDialogBase
        logic={logic}
        chipText='Vizsga'
        chipColor='var(--deepOrange)'
        paging={paging} />;
};