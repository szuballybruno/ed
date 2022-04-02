import React from 'react';
import { EpistoDialogLogicType } from '../../EpistoDialog';
import { CourseItemEditDialogBase } from './CourseItemEditDialogBase';
import { AdminVideoQuestionsModalPage } from './modals/AdminVideoQuestionsModalPage';
import { AdminVideoStatisticsModalPage } from './modals/AdminVideoStatisticsModalPage';

export const VideoEditDialog = (props: {
    logic: EpistoDialogLogicType
}) => {

    const { logic } = props;

    return <CourseItemEditDialogBase
        logic={logic}
        subpages={[
            {
                content: () => <AdminVideoQuestionsModalPage />,
                title: 'Kérdések'

            },
            {
                content: () => <AdminVideoStatisticsModalPage />,
                title: 'Statisztika'
            }
        ]} />;
};