
import React from "react";
import {CourseEditDataDTO} from "../../../models/shared_models/CourseEditDataDTO";
import {useParams} from "react-router-dom";
import {showNotification, useShowErrorDialog} from "../../../services/notifications";
import {useAdminEditedCourse, useSaveCourseData, useUploadCourseThumbnailAsync} from "../../../services/courseService";
import {LoadingFrame} from "../../HOC/LoadingFrame";
import {AdminCourseDetailsControl} from "./AdminCourseDetailsControl";

export const AdminCourseDetailsSubpage = () => {
    const params = useParams<{ courseId: string }>();
    const courseId = parseInt(params.courseId);
    const showError = useShowErrorDialog();

    // api calls
    const { courseEditData, courseEditDataError, courseEditDataState, refetchCourseEditDataAsync } = useAdminEditedCourse(courseId);
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

        <AdminCourseDetailsControl
            courseEditData={courseEditData}
            courseId={courseId}
            saveCourseAsync={handleSaveCourseDataAsync} />
    </LoadingFrame>
}
