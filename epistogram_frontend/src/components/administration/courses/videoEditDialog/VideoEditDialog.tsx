import { QuestionEditDataDTO } from '../../../../shared/dtos/QuestionEditDataDTO';
import { usePaging } from '../../../../static/frontendHelpers';
import { EpistoDialogLogicType } from '../../../universal/epistoDialog/EpistoDialogTypes';
import { EditDialogBase, EditDialogSubpage } from '../EditDialogBase';
import { VideoEditDialogParams } from './VideoEditDialogTypes';
import { VideoEditor } from './VideoEditor';
import { AdminVideoStatisticsModalPage } from './VideoStats';

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