import { Answer } from "../models/entity/Answer";
import { AnswerSession } from "../models/entity/AnswerSession";
import { Course } from "../models/entity/Course";
import { CourseOrganization } from "../models/entity/CourseOrganization";
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
import { CourseItemDescriptorDTO } from "../models/shared_models/CourseItemDescriptorDTO";
import { CourseItemDTO } from "../models/shared_models/CourseItemDTO";
import { CourseOrganizationDTO } from "../models/shared_models/CourseOrganizationDTO";
import { CourseShortDTO } from "../models/shared_models/CourseShortDTO";
import { ExamDTO } from "../models/shared_models/ExamDTO";
import { OrganizationDTO } from "../models/shared_models/OrganizationDTO";
import { QuestionAnswerDTO } from "../models/shared_models/QuestionAnswerDTO";
import { QuestionDTO } from "../models/shared_models/QuestionDTO";
import { TaskDTO } from "../models/shared_models/TaskDTO";
import { CourseItemState } from "../models/shared_models/types/sharedTypes";
import { UserDTO } from "../models/shared_models/UserDTO";
import { VideoDTO } from "../models/shared_models/VideoDTO";
import { VideoWatchedPercent } from "../models/VideoWatchedPercent";
import { hasValue, navPropNotNull } from "../utilities/helpers";
import { getCourseItemDescriptorCode, getCourseItemDescriptorCodeFromDTO } from "./encodeService";
import { getAssetUrl, getExamCoverImageUrl } from "./misc/urlProvider";

export const toUserDTO = (user: User) => {

    return {
        id: user.id,
        organizationId: user.organizationId,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        jobTitle: user.jobTitle,
        isActive: user.isActive,
        email: user.email,
        phoneNumber: user.phoneNumber,
        name: `${user.lastName} ${user.firstName}`,
        avatarUrl: getAssetUrl(user.avatarFile?.filePath)
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
    } as QuestionAnswerDTO;
}

export const toCourseOrganizationDTO = (courseOrganization: CourseOrganization) => {

    return {
        courseId: courseOrganization.courseId,
        organizationId: courseOrganization.organizationId,
        groupId: courseOrganization.groupId,
        tagId: courseOrganization.tagId
    } as CourseOrganizationDTO;
}

export const toTaskDTO = (task: Task) => {

    return {
        text: task.name,
        dueDate: task.dueData.toString(),
        objective: task.objective
    } as TaskDTO;
}

export const toExamDTO = (exam: Exam) => {

    navPropNotNull(exam.questions);

    return {
        id: exam.id,
        subTitle: exam.subtitle,
        title: exam.title,
        thumbnailUrl: exam.thumbnailUrl,
        questions: exam.questions.map(x => toQuestionDTO(x))
    } as ExamDTO;
}

export const toCourseItemDTOs = (
    course: Course,
    currentCourseItemDescriptor: CourseItemDescriptorDTO,
    videoWatchedPercents: VideoWatchedPercent[]) => {

    navPropNotNull(course.exams);
    navPropNotNull(course.videos);

    // map exam items
    const examItems = course
        .exams
        .map(exam => {

            navPropNotNull(exam.questions);
            navPropNotNull(exam.answerSessions);

            const hasCompletedAnswerSession = getCompletedAnswerSession(exam.questions, exam.answerSessions);

            return toCourseItemDTO(exam, hasCompletedAnswerSession ? "completed" : "locked", false);
        });

    // map video items
    const videoItems = course
        .videos
        .map(video => {

            navPropNotNull(video.questions);
            navPropNotNull(video.answerSessions);

            const answerSessionCompleted = video.questions.length != 0
                ? getCompletedAnswerSession(video.questions, video.answerSessions)
                : true;

            const watchedPercent = videoWatchedPercents
                .single(x => x.video.id === video.id)
                .watchedPercent;

            // 20% is a very low number only for development
            const percentReached = watchedPercent > 20;
            const isCompleted = answerSessionCompleted && percentReached;

            return toCourseItemDTO(video, isCompleted ? "completed" : "locked", true);
        });

    // concat to one ordered list
    const itemsOrdered = examItems
        .concat(videoItems)
        .orderBy(x => x.orderIndex);

    // get the index of the last non-locked item
    // note that there has not been a current calculation so far
    const lastNonLockedItemIndex = itemsOrdered
        .findLastIndex(x => x.state != "locked");

    // if there is a last non-locked, 
    // and it's not the last in the list
    // set it to available 
    if (hasValue(lastNonLockedItemIndex) && lastNonLockedItemIndex! + 1 != itemsOrdered.length)
        itemsOrdered[lastNonLockedItemIndex! + 1].state = "available";

    // set current item's state to 'current'
    const currentItemDescriptorCode = getCourseItemDescriptorCodeFromDTO(currentCourseItemDescriptor);
    const currentItem = itemsOrdered
        .single(item => item.descriptorCode === currentItemDescriptorCode);

    currentItem.state = "current";

    return itemsOrdered;
}

const getCompletedAnswerSession = (
    questions: Question[],
    answerSessions: AnswerSession[]) => {

    const isAnyCompletedAnswerSession = answerSessions
        .any(answerSession => {

            const isAllQuestionsAnswered = questions
                .all(quesiton => answerSession
                    .questionAnswers
                    .any(qa => qa.questionId == quesiton.id));

            const isAllAnswersCorrect = answerSession
                .questionAnswers
                .all(qa => !!qa.answer.isCorrect);

            if (isAllQuestionsAnswered && isAllAnswersCorrect)
                return true;

            return false;
        });

    return isAnyCompletedAnswerSession;
}

export const toVideoDTO = (video: Video) => {

    navPropNotNull(video.questions);
    navPropNotNull(video.videoFile);

    return {
        id: video.id,
        subTitle: video.subtitle,
        title: video.title,
        description: video.description,
        thumbnailUrl: "",
        url: getAssetUrl(video.videoFile.filePath) ?? getAssetUrl("images/videoImage.jpg"),
        questions: video.questions.map(q => toQuestionDTO(q))
    } as VideoDTO;
}

export const toCourseItemDTO = (item: Video | Exam, state: CourseItemState, isVideo: boolean) => {

    if (isVideo) {

        const video = item as Video;

        return {
            subTitle: video.subtitle,
            thumbnailUrl: getAssetUrl(video.thumbnailFile?.filePath) ?? getAssetUrl("images/videoImage.jpg"),
            title: video.title,
            orderIndex: video.orderIndex,
            state: state,
            descriptorCode: getCourseItemDescriptorCode(video.id, "video")
        } as CourseItemDTO;
    }
    else {

        const exam = item as Exam;

        return {
            subTitle: exam.subtitle,
            thumbnailUrl: getExamCoverImageUrl(),
            title: exam.title,
            orderIndex: exam.orderIndex,
            state: state,
            descriptorCode: getCourseItemDescriptorCode(exam.id, "exam")
        } as CourseItemDTO;
    }
}

export const toCourseShortDTO = (course: Course, itemCode: string) => {

    navPropNotNull(course.videos);
    navPropNotNull(course.exams);

    const thumbnailImageURL = course.coverFile
        ? getAssetUrl(course.coverFile.filePath)
        : getAssetUrl("/images/defaultCourseCover.jpg");

    return {
        courseId: course.id,
        title: course.title,
        category: course.category,
        firstItemCode: itemCode,
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

    const examItems = course
        .exams
        .map(x => toCourseItemDTO(x, "completed", false));

    const videoItems = course
        .videos
        .map(x => toCourseItemDTO(x, "completed", true));

    const itemsCombined = examItems
        .concat(videoItems);

    const itemsOrdered = itemsCombined
        .orderBy(x => x.orderIndex);

    return itemsOrdered as CourseItemDTO[];
    //throwNotImplemented();
    return [] as CourseItemDTO[];
}