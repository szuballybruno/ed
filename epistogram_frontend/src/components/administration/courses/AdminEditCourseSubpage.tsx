import React from 'react';
import { EditCourseControl } from "./EditCourseControl";

export const AdminEditCourseSubpage = () => {

    return <EditCourseControl saveCourseAsync={() => Promise.resolve()} />
};
