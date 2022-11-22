import { Id, VersionCode } from '@episto/commontypes';
import { useCallback, useEffect } from 'react';
import { EMPTY_ARRAY } from '../../../../helpers/emptyArray';
import { ArrayBuilder, usePaging } from '../../../../static/frontendHelpers';
import { Logger } from '../../../../static/Logger';
import { useEpistoDialogLogic } from '../../../universal/epistoDialog/EpistoDialogLogic';
import { EditDialogBase, EditDialogSubpage } from '../EditDialogBase';
import { AnswerMutationsType, QuestionMutationsType } from '../questionsEditGrid/QuestionEditGridTypes';
import { ExamEditor } from './ExamEditor';
import { AdminExamStatisticsModalPage } from './ExamStats';
import { ItemEditDialogParams } from './ItemEditDialogTypes';
import { VideoEditor } from './VideoEditor';
import { AdminVideoStatisticsModalPage } from './VideoStats';

export type CallbackParamsType = {
    versionCode: VersionCode;
    questionMutations: QuestionMutationsType;
    answerMutations: AnswerMutationsType;
    videoAudioText?: string;
};

export const useItemEditDialogLogic = (callback: (params: CallbackParamsType) => void) => {

    const dialogLogic = useEpistoDialogLogic<ItemEditDialogParams>(useItemEditDialogLogic.name);

    return {
        dialogLogic,
        callback,
        openDialog: dialogLogic.openDialog
    };
};

export type ItemEditDialogLogicType = ReturnType<typeof useItemEditDialogLogic>;

export type ItemEditDialogPageType = 'videoQuestion' | 'examQuestion' | 'videoStats' | 'examStats'

export const ItemEditDialog = ({
    logic: {
        callback,
        dialogLogic
    }
}: {
    logic: ItemEditDialogLogicType,
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
        examType,
        page,
        versionCode
    } = dialogLogic.params ?? {
        isVideo: false,
        itemVersionId: null,
        answerMutations: EMPTY_ARRAY,
        defaultModuleId: null,
        modules: EMPTY_ARRAY,
        questionMutations: EMPTY_ARRAY,
        itemTitle: '',
        courseTitle: '',
        examType: 'normal',
        page: 'videoStats',
        versionCode: null as any as VersionCode
    };

    const handleCallback = useCallback((questionMutations: QuestionMutationsType, answerMutations: AnswerMutationsType, videoAudioText?: string) => {

        Logger.logScoped('MUTATIONS', 'Finishing item edits. Question mutations: ', questionMutations);
        Logger.logScoped('MUTATIONS', 'Finishing item edits. Answer mutations: ', answerMutations);

        dialogLogic
            .closeDialog();

        callback({
            versionCode,
            questionMutations,
            answerMutations,
            videoAudioText
        });
    }, [callback, versionCode, dialogLogic]);

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

    useEffect(() => {

        if (page === 'videoQuestion' && isVideo)
            return paging.setItem(0);

        if (page === 'videoStats' && isVideo)
            return paging.setItem(1);

    }, [isVideo, paging, page]);

    return <EditDialogBase
        logic={dialogLogic}
        title={itemTitle}
        subTitle={courseTitle}
        chipText={isVideo ? 'Videó' : 'Vizsga'}
        chipColor={isVideo ? 'var(--deepBlue)' : 'var(--deepOrange)'}
        paging={paging} />;
};
