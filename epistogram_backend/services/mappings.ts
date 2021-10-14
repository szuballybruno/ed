import { Answer } from "../models/entity/Answer";
import { Course } from "../models/entity/Course";
import { CourseGroup } from "../models/entity/CourseGroup";
import { CourseOrganization } from "../models/entity/CourseOrganization";
import { CourseTag } from "../models/entity/CourseTag";
import { Exam } from "../models/entity/Exam";
import { Organization } from "../models/entity/Organization";
import { Question } from "../models/entity/Question";
import { QuestionAnswer } from "../models/entity/QuestionAnswer";
import { Task } from "../models/entity/Task";
import { User } from "../models/entity/User";
import { Video } from "../models/entity/Video";
import { EditListItemDTO } from "../models/shared_models/AdminPageEditCourseDTO";
import { AdminPageUserDTO } from "../models/shared_models/AdminPageUserDTO";
import { AnswerDTO } from "../models/shared_models/AnswerDTO";
import { CourseAdminDTO } from "../models/shared_models/CourseAdminDTO";
import { CourseGroupDTO } from "../models/shared_models/CourseGroupDTO";
import { CourseItemDTO } from "../models/shared_models/CourseItemDTO";
import { CourseOrganizationDTO } from "../models/shared_models/CourseOrganizationDTO";
import { CourseShortDTO } from "../models/shared_models/CourseShortDTO";
import { CourseStatDTO } from "../models/shared_models/CourseStatDTO";
import { CourseTagDTO } from "../models/shared_models/CourseTagDTO";
import { ExamDTO } from "../models/shared_models/ExamDTO";
import { ExamResultQuestionDTO } from "../models/shared_models/ExamResultQuestionDTO";
import { ExamResultsDTO } from "../models/shared_models/ExamResultsDTO";
import { OrganizationDTO } from "../models/shared_models/OrganizationDTO";
import { QuestionAnswerDTO } from "../models/shared_models/QuestionAnswerDTO";
import { QuestionDTO } from "../models/shared_models/QuestionDTO";
import { TaskDTO } from "../models/shared_models/TaskDTO";
import { UserActivityDTO } from "../models/shared_models/UserActivityDTO";
import { UserDTO } from "../models/shared_models/UserDTO";
import { VideoDTO } from "../models/shared_models/VideoDTO";
import { CourseItemStateView } from "../models/views/CourseItemStateView";
import { CourseView } from "../models/views/CourseView";
import { UserActivityFlatView } from "../models/views/UserActivityFlatView";
import { UserExamAnswerSessionView } from "../models/views/UserExamAnswerSessionView";
import { navPropNotNull, throwNotImplemented } from "../utilities/helpers";
import { getCourseItemDescriptorCode } from "./encodeService";
import { getAssetUrl, getExamCoverImageUrl } from "./misc/urlProvider";

export const toUserDTO = (user: User) => {

    return {
        id: user.id,
        organizationId: user.organizationId,
        firstName: user.firstName,
        lastName: user.lastName,
        jobTitle: user.jobTitle,
        email: user.email,
        phoneNumber: user.phoneNumber,
        isPendingInvitation: user.isPendingInvitation,
        name: `${user.lastName} ${user.firstName}`,

        avatarUrl: user.avatarFile
            ? getAssetUrl(user.avatarFile.filePath)
            : null,// : getAssetUrl("images/defaultAvatar.png"),

        userActivity: user.userActivity
            ? toUserActivityDTO(user.userActivity)
            : null
    } as UserDTO;
}

export const toCourseStatDTO = (courseStateView: CourseView) => {

    return {
        title: courseStateView.title,
        coverImageUrl: courseStateView.filePath
            ? getAssetUrl(courseStateView.filePath)
            : getAssetUrl("/images/defaultCourseCover.jpg")
    } as CourseStatDTO;
}

export const toUserActivityDTO = (userRightsView: UserActivityFlatView) => {

    return {
        canSetInvitedUserOrganization: userRightsView.canSetInvitedUserOrganization,
        canAccessAdministration: userRightsView.canAccessAdministration,
        canAccessCourseAdministration: userRightsView.canAccessCourseAdministration,
        canAccessApplication: userRightsView.canAccessApplication
    } as UserActivityDTO;
}

export const toAdminPageUserDTO = (user: User) => {

    const userDTO = toUserDTO(user);

    return {
        ...userDTO,
        organizationName: user.organization ? user.organization.name : "",
        tasks: user.tasks.map(x => toTaskDTO(x))
    } as AdminPageUserDTO;
}

export const toQuestionAnswerDTO = (questionAnswer: QuestionAnswer) => {

    return {
        answerId: questionAnswer.answerId,
        questionId: questionAnswer.questionId,
    } as QuestionAnswerDTO;
}

export const toCourseOrganizationDTO = (courseOrganization: CourseOrganization) => {

    return {
        courseId: courseOrganization.courseId,
        organizationId: courseOrganization.organizationId
    } as CourseOrganizationDTO;
}

export const toCourseGroupDTO = (courseGroup: CourseGroup) => {

    return {
        courseId: courseGroup.courseId,
        groupId: courseGroup.groupId
    } as CourseGroupDTO;
}

export const toCourseTagDTO = (courseTag: CourseTag) => {

    return {
        courseId: courseTag.courseId,
        tagId: courseTag.tagId
    } as CourseTagDTO;
}

export const toTaskDTO = (task: Task) => {

    return {
        name: task.name,
        dueDate: task.dueData,
        objective: task.objective
    } as TaskDTO;
}

export const toExamDTO = (exam: Exam) => {

    navPropNotNull(exam.questions);

    return {
        id: exam.id,
        courseId: exam.courseId,
        subTitle: exam.subtitle,
        title: exam.title,
        thumbnailUrl: exam.thumbnailUrl,
        questions: exam.questions.map(x => toQuestionDTO(x))
    } as ExamDTO;
}

export const toExamResultDTO = (
    answerSessionView: UserExamAnswerSessionView,
    data: User,
    isFirstTimeComplted: boolean) => {

    navPropNotNull(data.currentExam);
    navPropNotNull(data.currentExam!.questions);

    const questions = data.currentExam!.questions;

    const questionDTOs = questions
        .map(question => {

            navPropNotNull(question.questionAnswers);
            navPropNotNull(question.answers);

            const questionAnswer = question
                .questionAnswers
                .single(x => true);

            navPropNotNull(questionAnswer.answer);

            const correctAnswer = question
                .answers
                .single(x => x.isCorrect);

            return {
                text: question.questionText,
                answerText: questionAnswer.answer.text,
                correctAnswerText: correctAnswer.text,
                isCorrect: questionAnswer.answer.isCorrect ?? false
            } as ExamResultQuestionDTO;
        })

    return {
        isSuccessful: answerSessionView.isCompleteSession,
        correctAnswerCount: answerSessionView.correctAnswerCount,
        questionCount: answerSessionView.questionCount,
        questions: questionDTOs,
        isCompletedPrevoiusly: !isFirstTimeComplted,
        isFinalExam: answerSessionView.isFinalExam,
        shouldShowCourseCompleted: isFirstTimeComplted && answerSessionView.isFinalExam
    } as ExamResultsDTO;
}

export const toCourseItemDTOs = (
    courseItems: CourseItemStateView[],
    currentItemDescriptorCode: string) => {

    const courseItemDTOs = courseItems
        .map(x => toCourseItemDTO(x));

    // set current item's state to 'current'
    let currentItem = courseItemDTOs
        .single(item => item.descriptorCode === currentItemDescriptorCode);

    if (currentItem.state === "locked") {

        const firstLockedIndex = courseItemDTOs
            .findIndex(x => x.state === "locked");

        currentItem = courseItemDTOs[firstLockedIndex - 1];
    }

    currentItem.state = "current";

    return courseItemDTOs;
}

export const toVideoDTO = (video: Video, maxWatchedSeconds: number) => {

    navPropNotNull(video.questions);
    navPropNotNull(video.videoFile);

    return {
        id: video.id,
        courseId: video.courseId,
        subTitle: video.subtitle,
        title: video.title,
        description: video.description,
        thumbnailUrl: "",
        url: getAssetUrl(video.videoFile.filePath) ?? getAssetUrl("images/videoImage.jpg"),
        questions: video.questions.map(q => toQuestionDTO(q)),
        maxWatchedSeconds: maxWatchedSeconds
    } as VideoDTO;
}

export const toCourseItemDTO = (courseItemView: CourseItemStateView) => {

    const isVideo = !!courseItemView.videoId;

    // VIDEO
    if (isVideo) {

        navPropNotNull(courseItemView.video);

        const video = courseItemView.video as Video;

        return {
            subTitle: video.subtitle,
            thumbnailUrl: getAssetUrl(video.thumbnailFile?.filePath) ?? getAssetUrl("images/videoImage.jpg"),
            title: video.title,
            orderIndex: video.orderIndex,
            state: courseItemView.state,
            descriptorCode: getCourseItemDescriptorCode(video.id, "video"),
            type: "video"
        } as CourseItemDTO;
    }

    // EXAM
    else {

        navPropNotNull(courseItemView.exam);

        const exam = courseItemView.exam as Exam;

        return {
            subTitle: exam.subtitle,
            thumbnailUrl: getExamCoverImageUrl(),
            title: exam.title,
            orderIndex: exam.orderIndex,
            state: courseItemView.state,
            descriptorCode: getCourseItemDescriptorCode(exam.id, "exam"),
            type: "exam"
        } as CourseItemDTO;
    }
}

export const toCourseShortDTO = (course: CourseView) => {

    const thumbnailImageURL = course.filePath
        ? getAssetUrl(course.filePath)
        : getAssetUrl("/images/defaultCourseCover.jpg");

    const firstItemCode = (course.currentExamId || course.currentVideoId)
        ? course.currentExamId
            ? getCourseItemDescriptorCode(course.currentExamId, "exam")
            : getCourseItemDescriptorCode(course.currentVideoId, "video")
        : null;

    return {
        courseId: course.id,
        title: course.title,
        category: course.category,
        firstItemCode: firstItemCode,
        teacherName: "Mr. Teacher Name",
        thumbnailImageURL: thumbnailImageURL,
        isComplete: course.isComplete
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
        showUpTimeSeconds: q.showUpTimeSeconds,
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

    const thumbnailImageURL = course.coverFile
        ? getAssetUrl(course.coverFile.filePath)
        : getAssetUrl("/images/defaultCourseCover.jpg");

    return {
        title: course.title,
        category: course.category,
        courseId: course.id,
        teacherName: "Mr. Teacher Name",
        videosCount: 0,
        thumbnailImageURL: thumbnailImageURL
    } as CourseAdminDTO;
}

export const toEditListItemDTO = (id: number, name: string, checked: boolean) => {
    return {
        id: id,
        name: name,
        checked: checked
    } as EditListItemDTO
}

export const toEditCourseItemsDTO = (course: Course) => {

    // const examItems = course
    //     .exams
    //     .map(x => toCourseItemDTO(x, "completed", false));

    // const videoItems = course
    //     .videos
    //     .map(x => toCourseItemDTO(x, "completed", true));

    // const itemsCombined = examItems
    //     .concat(videoItems);

    // const itemsOrdered = itemsCombined
    //     .orderBy(x => x.orderIndex);

    // return itemsOrdered as CourseItemDTO[];
    //TODO: SOLVE throwNotImplemented();
    return [] as CourseItemDTO[];
}
