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
import { Id } from '@episto/commontypes';
import { Logger } from '../../../../static/Logger';
import { EMPTY_ARRAY } from '../../../../helpers/emptyArray';

export const ItemEditDialog = ({
    dialogLogic,
    callback
}: {
    dialogLogic: EpistoDialogLogicType<ItemEditDialogParams>,
    callback: (questionMutations: QuestionMutationsType, answerMutations: AnswerMutationsType) => void,
}) => {

    const {
        isVideo,
        itemVersionId,
        answerMutations,
        questionMutations,
        defaultModuleId,
        modules,
        courseTitle,
        itemTitle,
        examType
    } = dialogLogic.params ?? {
        isVideo: false,
        itemVersionId: null,
        answerMutations: EMPTY_ARRAY,
        defaultModuleId: null,
        modules: EMPTY_ARRAY,
        questionMutations: EMPTY_ARRAY,
        itemTitle: '',
        courseTitle: '',
        examType: 'normal'
    };

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
                    questionMutations={questionMutations}
                    defaultModuleId={defaultModuleId}
                    modules={modules} />,
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
                    answerMutations={answerMutations}
                    defaultModuleId={defaultModuleId}
                    modules={modules}
                    showQuestionModuleSelector={examType !== 'normal'} />,
                title: 'Kérdések',
            })
            .addIf(!isVideo, {
                content: () => <AdminExamStatisticsModalPage />,
                title: 'Statisztika',
            })
            .getArray()
        : [];

    const paging = usePaging<EditDialogSubpage>({ items: pages });

    return <EditDialogBase
        logic={dialogLogic}
        title={itemTitle}
        subTitle={courseTitle}
        chipText={isVideo ? 'Videó' : 'Vizsga'}
        chipColor={isVideo ? 'var(--deepBlue)' : 'var(--deepOrange)'}
        paging={paging} />;
};
