import { Id } from '../../../../shared/types/versionId';
import { useEpistoDialogLogic } from '../../../universal/epistoDialog/EpistoDialogLogic';
import { AdminUserCourseContentDialog } from './AdminUserCourseContentDialog';

export const useAdminCourseContentDialogLogic = () => {

    const adminCourseContentDialogLogic = useEpistoDialogLogic<{
        courseId: Id<'Course'>,
        userId: Id<'User'> 
    }>(AdminUserCourseContentDialog);

    return {
        adminCourseContentDialogLogic
    };
};