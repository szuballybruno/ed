import { TeacherInfoEditDTO } from "../../models/shared_models/TeacherInfoEditDTO";
import { apiRoutes } from "../../models/shared_models/types/apiRoutes";
import { useReactQuery2 } from "../../static/frontendHelpers";
import { usePostDataUnsafe } from "../core/httpClient";

export const useTeacherInfoEditData = (userId: number) => {

    const qr = useReactQuery2<TeacherInfoEditDTO>(apiRoutes.teacherInfo.getTeacherInfo, { userId });

    return {
        teacherInfoEditData: qr.data
    }
}

export const useSaveTeacherInfoData = () => {

    const qr = usePostDataUnsafe<TeacherInfoEditDTO, void>(apiRoutes.teacherInfo.saveTeacherInfo);

    return {
        saveTeacherInfoAsync: qr.postDataAsync,
        saveTeacherInfoState: qr.state
    }
}