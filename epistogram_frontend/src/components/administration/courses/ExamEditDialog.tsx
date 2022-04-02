import React from 'react';
import { EpistoDialogLogicType } from '../../EpistoDialog';
import { CourseItemEditDialogBase } from './CourseItemEditDialogBase';
import { AdminExamQuestionsModalPage } from './modals/AdminExamQuestionsModalPage';
import { AdminExamStatisticsModalPage } from './modals/AdminExamStatisticsModalPage';
import { AdminVideoStatisticsModalPage } from './modals/AdminVideoStatisticsModalPage';

export const ExamEditDialog = (props: {
    logic: EpistoDialogLogicType
}) => {

    const { logic } = props;

    return <CourseItemEditDialogBase
        logic={logic}
        subpages={[
            {
                content: () => <AdminExamQuestionsModalPage />,
                title: 'Kérdések',
            },
            {
                content: () => <AdminExamStatisticsModalPage />,
                title: 'Statisztika',
            }
        ]} />;
};