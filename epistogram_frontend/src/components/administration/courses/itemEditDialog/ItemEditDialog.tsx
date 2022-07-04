import { ArrayBuilder, usePaging } from '../../../../static/frontendHelpers';
import { } from '../../../universal/epistoDialog/EpistoDialog';
import { EpistoDialogLogicType } from '../../../universal/epistoDialog/EpistoDialogTypes';
import { ExamEditor } from './ExamEditor';
import { AdminExamStatisticsModalPage } from './ExamStats';
import { EditDialogBase, EditDialogSubpage } from '../EditDialogBase';
import { ItemEditDialogParams } from './ItemEditDialogTypes';
import { useCallback } from 'react';
import { AnswerMutationsType, QuestionMutationsType } from '../questionsEditGrid/QuestionEditGridTypes';
import { VideoEditor } from './VideoEditor';
import { AdminVideoStatisticsModalPage } from './VideoStats';

export const ItemEditDialog = ({
    dialogLogic,
    callback
}: {
    dialogLogic: EpistoDialogLogicType<ItemEditDialogParams>,
    callback: (questionMutations: QuestionMutationsType, answerMutations: AnswerMutationsType) => void,
}) => {

    const {
        courseTitle,
        itemTitle,
        itemVersionId,
        questionMutations,
        answerMutations,
        isVideo
    } = dialogLogic.params;

    const handleCallback = useCallback((questionMutations: QuestionMutationsType, answerMutations: AnswerMutationsType) => {

        dialogLogic.closeDialog();
        callback(questionMutations, answerMutations);
    }, [callback]);

    const paging = usePaging<EditDialogSubpage>(new ArrayBuilder()
        .addIf(isVideo, {
            content: () => <VideoEditor
                enabled={dialogLogic.isOpen}
                videoVersionId={itemVersionId}
                onClose={handleCallback}
                answerMutations={answerMutations}
                questionMutations={questionMutations} />,
            title: 'Kérdések'
        })
        .addIf(isVideo, {
            content: () => <AdminVideoStatisticsModalPage />,
            title: 'Statisztika'
        })
        .addIf(!isVideo, {
            content: () => <ExamEditor
                callback={handleCallback}
                examVersionId={itemVersionId}
                endabled={dialogLogic.isOpen}
                questionMutations={questionMutations}
                answerMutations={answerMutations} />,
            title: 'Kérdések',
        })
        .addIf(!isVideo, {
            content: () => <AdminExamStatisticsModalPage />,
            title: 'Statisztika',
        })
        .getArray());

    return <EditDialogBase
        logic={dialogLogic}
        title={itemTitle}
        subTitle={courseTitle}
        chipText={isVideo ? 'Videó' : 'Vizsga'}
        chipColor={isVideo ? 'var(--deepBlue)' : 'var(--deepOrange)'}
        paging={paging} />;
};