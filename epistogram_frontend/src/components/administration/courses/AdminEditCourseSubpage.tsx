import React from 'react';
import { useParams } from 'react-router-dom';
import { EditCourseDataDTO } from '../../../models/shared_models/AdminPageEditCourseDTO';
import { useAdminEditedCourse, useSaveCourseData, useUploadCourseThumbnailAsync } from '../../../services/courseService';
import { showNotification, useShowErrorDialog } from '../../../services/notifications';
import { LoadingFrame } from '../../HOC/LoadingFrame';
import { EditCourseControl } from "./EditCourseControl";

export const AdminEditCourseSubpage = () => {

    const params = useParams<{ courseId: string }>();
    const courseId = parseInt(params.courseId);
    const showError = useShowErrorDialog();

    // api calls
    const { courseEditData, courseEditDataError, courseEditDataState } = useAdminEditedCourse(courseId);
    const { saveCourseDataAsync, saveCourseDataState } = useSaveCourseData();
    const { saveCourseThumbnailAsync, saveCourseThumbnailState } = useUploadCourseThumbnailAsync();

    const handleSaveCourseDataAsync = async (dto: EditCourseDataDTO, thumbnailFile: File | null) => {

        try {

            if (thumbnailFile)
                await saveCourseThumbnailAsync(courseId, thumbnailFile);

            await saveCourseDataAsync(dto);

            showNotification("Kurzus sikeresen mentve!");
        }
        catch (e) {

            showError(e);
        }
    }

    return <LoadingFrame
        loadingState={[saveCourseDataState, courseEditDataState, saveCourseThumbnailState]}
        error={courseEditDataError}>

        <EditCourseControl
            courseEditData={courseEditData}
            courseId={courseId}
            saveCourseAsync={handleSaveCourseDataAsync} />
    </LoadingFrame>
};
