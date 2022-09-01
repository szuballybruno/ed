import { TeacherInfoEditDTO } from '../../shared/dtos/TeacherInfoEditDTO';
import { apiRoutes } from '../../shared/types/apiRoutes';
import { Id } from '../../shared/types/versionId';
import { QueryService } from '../../static/QueryService';
import { usePostDataUnsafe } from '../core/httpClient';

export const useTeacherInfoEditData = (userId: Id<'User'>) => {

    const qr = QueryService.useXQuery<TeacherInfoEditDTO>(apiRoutes.teacherInfo.getTeacherInfo, { userId });

    return {
        teacherInfoEditData: qr.data
    };
};

export const useSaveTeacherInfoData = () => {

    const qr = usePostDataUnsafe<TeacherInfoEditDTO, void>(apiRoutes.teacherInfo.saveTeacherInfo);

    return {
        saveTeacherInfoAsync: qr.postDataAsync,
        saveTeacherInfoState: qr.state
    };
};