import { QuestionEditDataDTO } from '../../../../shared/dtos/QuestionEditDataDTO';
import { usePaging } from '../../../../static/frontendHelpers';
import { } from '../../../universal/epistoDialog/EpistoDialog';
import { EpistoDialogLogicType } from '../../../universal/epistoDialog/EpistoDialogTypes';
import { EditDialogBase, EditDialogSubpage } from '../EditDialogBase';
import { VideoEditDialogParams } from './VideoEditDialogTypes';
import { VideoEditor } from './VideoEditor';
import { AdminVideoStatisticsModalPage } from './VideoStats';

export type EditQuestionFnType = <TField extends keyof QuestionEditDataDTO, >(key: number, field: TField, value: QuestionEditDataDTO[TField]) => void;

export const VideoEditDialog = (props: {
    dialogLogic: EpistoDialogLogicType<VideoEditDialogParams>
}) => {

    // props
    const { dialogLogic } = props;
    const { videoVersionId, courseName, videoTitle } = dialogLogic.params;

    const paging = usePaging<EditDialogSubpage>([
        {
            content: () => <VideoEditor
                enabled={dialogLogic.isOpen}
                videoVersionId={videoVersionId} />,
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