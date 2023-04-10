import { Id } from '@episto/commontypes';
import { ModuleEditDTO } from '@episto/communication';
import { useCallback, useMemo } from 'react';
import { CourseItemApiService } from '../../../../services/api/CourseItemApiService';
import { ArrayBuilder, usePaging } from '../../../../static/frontendHelpers';
import { EditDialogSubpage } from '../EditDialogBase';
import { AnswerMutationsType, QuestionMutationsType } from '../questionsEditGrid/QuestionEditGridTypes';
import { DetailsLayout } from './DetailsLayout';
import { useVideoTextsEditorLogic, VideoAudioTextEditor } from './VideoAudioTextEditor';
import { useVideoEditorLogic, VideoEditor } from './VideoEditor';
import { AdminVideoStatisticsModalPage } from './VideoStats';

export type VideoEditorCallbackDataType = {
    questionMutations: QuestionMutationsType,
    answerMutations: AnswerMutationsType,
    videoAudioText?: string,
    videoDescription?: string
}

export const VideoDetails = ({
    videoVersionId,
    defaultModuleId,
    modules,
    questionMutations,
    answerMutations,
    videoAudioText,
    videoDescription,
    callback,
    cancelEdit
}: {
    videoVersionId: Id<'VideoVersion'>,
    defaultModuleId: Id<'Module'>,
    modules: ModuleEditDTO[],
    questionMutations: QuestionMutationsType,
    answerMutations: AnswerMutationsType,
    videoAudioText: string,
    videoDescription: string,
    callback: (data: VideoEditorCallbackDataType) => void,
    cancelEdit: () => void
}) => {

    const { courseItemEditData, courseItemEditDataState } = CourseItemApiService
        .useCourseItemEditData(videoVersionId, null, true);

    const videoUrl = courseItemEditData?.videoUrl ?? '';
    const { title, subtitle } = courseItemEditData ?? {
        title: '',
        subtitle: ''
    };

    const videoEditorLogic = useVideoEditorLogic({
        answerMutations,
        defaultModuleId,
        editData: courseItemEditData,
        modules,
        questionMutations,
        videoVersionId
    });

    const audioTextEditorLogic = useVideoTextsEditorLogic({
        initialAudioText: videoAudioText ?? '',
        initialDescription: videoDescription ?? ''
    });

    const handleOk = useCallback(() => {

        callback({
            questionMutations: videoEditorLogic.questionMutations,
            answerMutations: videoEditorLogic.answerMutations,
            videoAudioText: audioTextEditorLogic.audioText,
            videoDescription: audioTextEditorLogic.description
        });
    }, [
        callback,
        videoEditorLogic.questionMutations,
        videoEditorLogic.answerMutations,
        audioTextEditorLogic.audioText,
        audioTextEditorLogic.description
    ]);

    const isChanged = useMemo(() => {

        if (videoEditorLogic.questionMutations !== questionMutations)
            return true;

        if (videoEditorLogic.answerMutations !== answerMutations)
            return true;

        if (audioTextEditorLogic.isChanged)
            return true;

        return false;
    }, [
        videoEditorLogic.questionMutations,
        videoEditorLogic.answerMutations,
        questionMutations,
        answerMutations,
        audioTextEditorLogic.isChanged
    ]);

    const pages = courseItemEditData
        ? new ArrayBuilder()
            .add({
                content: () => <VideoEditor
                    logic={videoEditorLogic} />,
                title: 'Kérdések'
            })
            .add({
                content: () => <AdminVideoStatisticsModalPage />,
                title: 'Statisztika'
            })
            .add({
                content: () => <VideoAudioTextEditor
                    logic={audioTextEditorLogic} />,
                title: 'Szöveg szerkesztése'
            })
            .getArray()
        : [];

    const paging = usePaging<EditDialogSubpage>({
        items: pages
    });

    return (
        <DetailsLayout
            subTitle={subtitle}
            title={title}
            paging={paging}
            chipText={'Videó'}
            chipColor={'var(--deepBlue)'}
            cancelEdit={cancelEdit}
            okEdit={handleOk}
            okEnabled={isChanged} />
    );
};