import { TeacherInfoEditDTO } from '@episto/communication';
import { apiRoutes } from '@episto/communication';
import { Id } from '@episto/commontypes';
import { QueryService } from '../../static/XQuery/XQueryReact';
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