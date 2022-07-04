import { useCallback } from 'react';
import { usePaging } from '../../../../static/frontendHelpers';
import { EpistoDialogLogicType } from '../../../universal/epistoDialog/EpistoDialogTypes';
import { EditDialogBase, EditDialogSubpage } from '../EditDialogBase';
import { QuestionMutationsType } from '../questionsEditGrid/QuestionEditGridTypes';
import { VideoEditDialogParams } from './VideoEditDialogTypes';
import { VideoEditor } from './VideoEditor';
import { AdminVideoStatisticsModalPage } from './VideoStats';

export const VideoEditDialog = ({ callback, dialogLogic }: {
    dialogLogic: EpistoDialogLogicType<VideoEditDialogParams>,
    callback: (questionMutations: QuestionMutationsType) => void
}) => {

    const callbackHandler = useCallback((mutations: QuestionMutationsType) => {

        dialogLogic.closeDialog();
        callback(mutations);
    }, [callback, dialogLogic.closeDialog]);

    // props
    const { videoVersionId, courseName, videoTitle, questionMutations, answerMutations } = dialogLogic.params;

    const paging = usePaging<EditDialogSubpage>([
        {
            content: () => <VideoEditor
                enabled={dialogLogic.isOpen}
                videoVersionId={videoVersionId}
                onClose={callbackHandler}
                answerMutations={answerMutations}
                questionMutations={questionMutations} />,
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
        logic={dialogLogic}
        paging={paging} />;
};