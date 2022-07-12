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
import { Id } from '../../../../shared/types/versionId';

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

    const pages = new ArrayBuilder()
        .addIf(isVideo, {
            content: () => <VideoEditor
                enabled={dialogLogic.isOpen}
                videoVersionId={itemVersionId as Id<'VideoVersion'>}
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
                examVersionId={itemVersionId as Id<'ExamVersion'>}
                endabled={dialogLogic.isOpen}
                questionMutations={questionMutations}
                answerMutations={answerMutations} />,
            title: 'Kérdések',
        })
        .addIf(!isVideo, {
            content: () => <AdminExamStatisticsModalPage />,
            title: 'Statisztika',
        })
        .getArray();

    const paging = usePaging<EditDialogSubpage>({ items: pages });

    return <EditDialogBase
        logic={dialogLogic}
        title={itemTitle}
        subTitle={courseTitle}
        chipText={isVideo ? 'Videó' : 'Vizsga'}
        chipColor={isVideo ? 'var(--deepBlue)' : 'var(--deepOrange)'}
        paging={paging} />;
};