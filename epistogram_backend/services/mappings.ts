import { Answer } from "../models/entity/Answer";
import { Course } from "../models/entity/Course";
import { Exam } from "../models/entity/Exam";
import { Organization } from "../models/entity/Organization";
import { Question } from "../models/entity/Question";
import { QuestionAnswer } from "../models/entity/QuestionAnswer";
import { Task } from "../models/entity/Task";
import { User } from "../models/entity/User";
import { Video } from "../models/entity/Video";
import { AdminPageUserDTO } from "../models/shared_models/AdminPageUserDTO";
import { AnswerDTO } from "../models/shared_models/AnswerDTO";
import { CourseAdminDTO } from "../models/shared_models/CourseAdminDTO";
import { CourseItemDTO } from "../models/shared_models/CourseItemDTO";
import { CourseShortDTO } from "../models/shared_models/CourseShortDTO";
import { ExamDTO } from "../models/shared_models/ExamDTO";
import { OrganizationDTO } from "../models/shared_models/OrganizationDTO";
import { PlayerDataDTO } from "../models/shared_models/PlayerDataDTO";
import { QuestionAnswerDTO } from "../models/shared_models/QuestionAnswerDTO";
import { QuestionDTO } from "../models/shared_models/QuestionDTO";
import { TaskDTO } from "../models/shared_models/TaskDTO";
import { UserDTO } from "../models/shared_models/UserDTO";
import { VideoDTO } from "../models/shared_models/VideoDTO";
import { staticProvider } from "../staticProvider";
import { navPropNotNull } from "../utilities/helpers";
import { getStorageFileUrl } from "./storageService";

export const toUserDTO = (user: User) => {

    return {
        userId: user.id,
        organizationId: user.organizationId,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        jobTitle: user.jobTitle,
        isActive: user.isActive,
        email: user.email,
        phoneNumber: user.phoneNumber,
        name: `${user.lastName} ${user.firstName}`,
        avatarUrl: getStorageFileUrl(user.avatarFile?.filePath)
    } as UserDTO;
}

export const toAdminPageUserDTO = (user: User) => {

    const userDTO = toUserDTO(user);
    navPropNotNull(user.organization);

    return {
        ...userDTO,
        organizationName: user.organization.name,
        tasks: user.tasks.map(x => toTaskDTO(x))
    } as AdminPageUserDTO;
}

export const toQuestionAnswerDTO = (questionAnswer: QuestionAnswer) => {

    return {
        answerId: questionAnswer.answerId,
        questionId: questionAnswer.questionId,
        userId: questionAnswer.userId
    } as QuestionAnswerDTO;
}

export const toTaskDTO = (task: Task) => {

    return {
        text: task.name,
        dueDate: task.dueData.toString(),
        objective: task.objective
    } as TaskDTO;
}

export const toExamDTO = (exam: Exam) => {

    return {
        id: exam.id,
        subTitle: exam.subtitle,
        title: exam.title,
        thumbnailUrl: exam.thumbnailUrl
    } as ExamDTO;
}

export const toPlayerDataDTO = (
    course: Course,
    video: Video | null,
    exam: Exam | null) => {

    const examItems = course
        .exams
        .map(x => toCourseItemDTO(x, false));

    // aggregate items to a single ordered collection
    const videoItems = course
        .videos
        .map(x => toCourseItemDTO(x, true));

    const itemsCombined = examItems
        .concat(videoItems);

    const itemsOrdered = itemsCombined
        .orderBy(x => x.orderIndex);

    // TODO: set state 
    // itemsOrdered
    //     .forEach((courseItem, index) => {
    //     })

    return {
        courseItems: itemsOrdered,
        video: video ? toVideoDTO(video) : null,
        exam: exam ? toExamDTO(exam) : null
    } as PlayerDataDTO;
}

export const toVideoDTO = (video: Video) => {

    navPropNotNull(video.questions);

    return {
        id: video.id,
        subTitle: video.subtitle,
        title: video.title,
        description: video.description,
        thumbnailUrl: "",
        url: video.videoFile ? getStorageFileUrl(video.videoFile.filePath) : null,
        questions: video.questions.map(q => toQuestionDTO(q))
    } as VideoDTO;
}

export const toCourseItemDTO = (item: Video | Exam, isVideo: boolean) => {

    if (isVideo) {

        const video = item as Video;

        return {
            id: video.id,
            subTitle: video.subtitle,
            thumbnailUrl: "",//video.thumbnailFile?.url ?? null,
            title: video.title,
            type: "video",
            orderIndex: video.orderIndex
        } as CourseItemDTO;
    }
    else {

        const exam = item as Exam;

        return {
            id: exam.id,
            subTitle: exam.subtitle,
            thumbnailUrl: exam.thumbnailUrl,
            title: exam.title,
            type: "exam",
            orderIndex: exam.orderIndex
        } as CourseItemDTO;
    }
}

export const toCourseShortDTO = (course: Course) => {

    navPropNotNull(course.videos);
    navPropNotNull(course.exams);

    const thumbnailImageURL = staticProvider.globalConfig.misc.assetStoreUrl + `/courses/${course.id}.png`;

    return {
        courseId: course.id,
        title: course.title,
        category: course.category,
        firstVideoId: course.videos.length != 0 ? course.videos[0].id : null,
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

export const toQuestionDTO = (q: Question) => {

    navPropNotNull(q.answers);

    return {
        questionId: q.id,
        questionText: q.questionText,
        imageUrl: q.imageUrl,
        answers: q.answers
            .map(x => toAnswerDTO(x))

    } as QuestionDTO;
}

export const toAnswerDTO = (a: Answer) => {

    return {
        answerId: a.id,
        answerText: a.text
    } as AnswerDTO;
}

export const toCourseAdminDTO = (course: Course) => {

    return {
        title: course.title,
        category: course.category,
        courseId: course.id,
        teacherName: "Mr. Teacher Name",
        videosCount: 0,
        thumbnailImageURL: staticProvider.globalConfig.misc.assetStoreUrl + `/courses/${course.id}.png`
    } as CourseAdminDTO;
}