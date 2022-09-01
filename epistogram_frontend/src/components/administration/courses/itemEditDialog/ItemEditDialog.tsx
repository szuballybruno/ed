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
import { Logger } from '../../../../static/Logger';

export const ItemEditDialog = ({
    dialogLogic,
    callback
}: {
    dialogLogic: EpistoDialogLogicType<ItemEditDialogParams>,
    callback: (questionMutations: QuestionMutationsType, answerMutations: AnswerMutationsType) => void,
}) => {

    const dialogParams = dialogLogic.params;
    const isExam = !dialogParams?.isVideo;
    const isVideo = !isExam;
    const itemVersionId = dialogParams?.itemVersionId;
    const answerMutations = dialogParams?.answerMutations;
    const questionMutations = dialogParams?.questionMutations;

    const handleCallback = useCallback((questionMutations: QuestionMutationsType, answerMutations: AnswerMutationsType) => {

        Logger.logScoped('MUTATIONS', 'Finishing item edits. Question mutations: ', questionMutations);
        Logger.logScoped('MUTATIONS', 'Finishing item edits. Answer mutations: ', answerMutations);

        dialogLogic.closeDialog();
        callback(questionMutations, answerMutations);
    }, [callback]);

    const pages = (itemVersionId && answerMutations && questionMutations)
        ? new ArrayBuilder()
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
            .addIf(isExam, {
                content: () => <ExamEditor
                    callback={handleCallback}
                    examVersionId={itemVersionId as Id<'ExamVersion'>}
                    endabled={dialogLogic.isOpen}
                    questionMutations={questionMutations}
                    answerMutations={answerMutations} />,
                title: 'Kérdések',
            })
            .addIf(isExam, {
                content: () => <AdminExamStatisticsModalPage />,
                title: 'Statisztika',
            })
            .getArray()
        : [];

    const paging = usePaging<EditDialogSubpage>({ items: pages });

    return <EditDialogBase
        logic={dialogLogic}
        title={dialogParams?.itemTitle ?? ''}
        subTitle={dialogParams?.courseTitle ?? ''}
        chipText={isVideo ? 'Videó' : 'Vizsga'}
        chipColor={isVideo ? 'var(--deepBlue)' : 'var(--deepOrange)'}
        paging={paging} />;
};
