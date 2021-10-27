import React from 'react';
import { useParams } from 'react-router-dom';
import { CourseEditDataDTO } from '../../../models/shared_models/CourseEditDataDTO';
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

    const handleSaveCourseDataAsync = async (dto: CourseEditDataDTO, thumbnailFile: File | null) => {

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
        error={courseEditDataError}
        className="whall">

        <EditCourseControl
            courseEditData={courseEditData}
            courseId={courseId}
            saveCourseAsync={handleSaveCourseDataAsync} />
    </LoadingFrame>
};
