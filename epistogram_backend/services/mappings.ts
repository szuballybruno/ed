import { Course } from "../models/entity/Course";
import { Exam } from "../models/entity/Exam";
import { User } from "../models/entity/User";
import { Video } from "../models/entity/Video";
import { CourseShortDTO } from "../models/shared_models/CourseShortDTO";
import { ExamDTO } from "../models/shared_models/ExamDTO";
import { UserDTO } from "../models/shared_models/UserDTO";
import { VideoDTO } from "../models/shared_models/VideoDTO";
import { globalConfig } from "../server";
import { CourseAdminDTO } from "../models/shared_models/CourseAdminDTO";
import { Organization } from "../models/entity/Organization";
import { OrganizationDTO } from "../models/shared_models/OrganizationDTO";
import { AdminPageUserDTO } from "../models/shared_models/AdminPageUserDTO";
import { Task } from "../models/entity/Task";
import { TaskDTO } from "../models/shared_models/TaskDTO";
import { navPropNotNull } from "../utilities/helpers";

export const toUserDTO = (user: User) => new UserDTO(
    user.id,
    user.organizationId,
    user.firstName,
    user.lastName,
    user.role,
    user.jobTitle,
    user.isActive,
    user.email,
    user.phoneNumber,
    `${user.lastName} ${user.firstName}`);

export const toAdminPageUserDTO = (user: User) => {

    const userDTO = toUserDTO(user);
    navPropNotNull(user.organization);

    return {
        ...userDTO,
        organizationName: user.organization.name,
        tasks: user.tasks.map(x => toTaskDTO(x))
    } as AdminPageUserDTO;
}

export const toTaskDTO = (task: Task) => {

    return {
        text: task.name,
        dueDate: task.dueData.toString(),
        objective: task.objective
    } as TaskDTO;
}

export const toVideoDTO = (video: Video) => {

    return {
        id: video.id,
        subTitle: video.subtitle,
        title: video.title,
        type: "video",
        thumbnailUrl: video.thumbnailUrl
    } as VideoDTO;
}

export const toExamDTO = (exam: Exam) => {

    return {
        id: exam.id,
        subTitle: exam.subtitle,
        title: exam.title,
        type: "exam",
        thumbnailUrl: exam.thumbnailUrl
    } as ExamDTO;
}

export const toCourseShortDTO = (course: Course) => {

    const thumbnailImageURL = globalConfig.misc.assetStoreUrl + `/courses/${course.id}.png`;

    return {
        courseId: course.id,
        title: course.title,
        category: course.category,
        firstVideoId: course.videos ? course.videos[0].id : null,
        teacherName: "Mr. Teacher Name",
        thumbnailImageURL: thumbnailImageURL
    } as CourseShortDTO;
}

export const toOrganizationDTO = (org: Organization) => {

    return {
        id: org.id,
        name: org.name
    } as OrganizationDTO;
}

export const toCourseAdminDTO = (course: Course) => {

    return {
        title: course.title,
        category: course.category,
        courseId: course.id,
        teacherName: "Mr. Teacher Name",
        videosCount: 0,
        thumbnailImageURL: globalConfig.misc.assetStoreUrl + `/courses/${course.id}.png`
    } as CourseAdminDTO;
}