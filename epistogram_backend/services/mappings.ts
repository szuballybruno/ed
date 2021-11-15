import { Answer } from "../models/entity/Answer";
import { Course } from "../models/entity/Course";
import { CourseCategory } from "../models/entity/CourseCategory";
import { Exam } from "../models/entity/Exam";
import { JobTitle } from "../models/entity/JobTitle";
import { Organization } from "../models/entity/Organization";
import { Question } from "../models/entity/Question";
import { Role } from "../models/entity/Role";
import { Task } from "../models/entity/Task";
import { User } from "../models/entity/User";
import { Video } from "../models/entity/Video";
import { AdminPageUserDTO } from "../models/shared_models/AdminPageUserDTO";
import { AnswerDTO } from "../models/shared_models/AnswerDTO";
import { AnswerEditDTO } from "../models/shared_models/AnswerEditDTO";
import { CourseAdminItemShortDTO } from "../models/shared_models/CourseAdminItemShortDTO";
import { CourseAdminListItemDTO } from "../models/shared_models/CourseAdminListItemDTO";
import { CourseCategoryDTO } from "../models/shared_models/CourseCategoryDTO";
import { CourseDetailsDTO } from "../models/shared_models/CourseDetailsDTO";
import { CourseEditDataDTO } from "../models/shared_models/CourseEditDataDTO";
import { CourseItemDTO } from "../models/shared_models/CourseItemDTO";
import { CourseShortDTO } from "../models/shared_models/CourseShortDTO";
import { CourseStatDTO } from "../models/shared_models/CourseStatDTO";
import { DailyTipDTO } from "../models/shared_models/DailyTipDTO";
import { ExamDTO } from "../models/shared_models/ExamDTO";
import { ExamResultQuestionDTO } from "../models/shared_models/ExamResultQuestionDTO";
import { ExamResultsDTO } from "../models/shared_models/ExamResultsDTO";
import { JobTitleDTO } from "../models/shared_models/JobTitleDTO";
import { ModuleEditDTO } from "../models/shared_models/ModuleEditDTO";
import { OrganizationDTO } from "../models/shared_models/OrganizationDTO";
import { QuestionDTO } from "../models/shared_models/QuestionDTO";
import { ResultAnswerDTO } from "../models/shared_models/ResultAnswerDTO";
import { RoleDTO } from "../models/shared_models/RoleDTO";
import { SignupAnswerDTO } from "../models/shared_models/SignupAnswerDTO";
import { SignupDataDTO } from "../models/shared_models/SignupDataDTO";
import { SignupQuestionDTO } from "../models/shared_models/SignupQuestionDTO";
import { TaskDTO } from "../models/shared_models/TaskDTO";
import { CourseItemStateType } from "../models/shared_models/types/sharedTypes";
import { UserActivityDTO } from "../models/shared_models/UserActivityDTO";
import { UserDTO } from "../models/shared_models/UserDTO";
import { UserEditDTO } from "../models/shared_models/UserEditDTO";
import { VideoDTO } from "../models/shared_models/VideoDTO";
import { ClassType } from "../models/Types";
import { CourseAdminDetailedView } from "../models/views/CourseAdminDetailedView";
import { CourseAdminShortView } from "../models/views/CourseAdminShortView";
import { CourseItemStateView } from "../models/views/CourseItemStateView";
import { CourseView } from "../models/views/CourseView";
import { DailyTipView } from "../models/views/DailyTipView";
import { ExamResultView } from "../models/views/ExamResultView";
import { SignupQuestionView } from "../models/views/SignupQuestionView";
import { UserActivityFlatView } from "../models/views/UserActivityFlatView";
import { navPropNotNull, toFullName } from "../utilities/helpers";
import { getItemCode } from "./encodeService";
import { getAssetUrl, getExamCoverImageUrl } from "./misc/urlProvider";

const mapperFunctions = [] as {
    fromTypeName: string;
    toTypeName: string;
    func: (from: any) => any;
}[];

const addMapperFunction = <TFrom, TTo>(fromType: ClassType<TFrom>, toType: ClassType<TTo>, func: (from: TFrom) => TTo) => {

    const mapping = mapperFunctions
        .filter(x => x.fromTypeName === fromType.name && x.toTypeName === toType.name)[0];

    if (mapping)
        throw new Error(`Mapping '${fromType.name}' -> ${toType.name} already exists!`);

    mapperFunctions
        .push({
            fromTypeName: fromType.name,
            toTypeName: toType.name,
            func
        });
}

export const useMapperFunction = <TFrom, TTo>(fromType: ClassType<TFrom>, toType: ClassType<TTo>, fromObj: TFrom): TTo => {

    const mapping = mapperFunctions
        .filter(x => x.fromTypeName === fromType.name && x.toTypeName === toType.name)[0];

    if (!mapping)
        throw new Error(`Mapping '${fromType.name} -> ${toType.name}' not found!`);

    return mapping.func(fromObj);
}

addMapperFunction(CourseAdminDetailedView, CourseAdminItemShortDTO, view => ({
    id: view.itemId,
    subTitle: view.itemSubtitle,
    title: view.itemTitle,
    orderIndex: view.itemOrderIndex,
    descriptorCode: view.itemCode,
    type: view.videoId ? "video" : "exam",
    questionCount: view.itemQuestionCount,
    videoLength: view.videoLength
}));

export const toUserDTO = (user: User) => {

    return {
        id: user.id,
        organizationId: user.organizationId,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        isTrusted: user.isTrusted,
        isPendingInvitation: user.isPendingInvitation,
        name: `${user.lastName} ${user.firstName}`,

        jobTitle: user.jobTitle
            ? toJobTitleDTO(user.jobTitle)
            : null,

        avatarUrl: user.avatarFile
            ? getAssetUrl(user.avatarFile.filePath)
            : null,

        userActivity: user.userActivity
            ? toUserActivityDTO(user.userActivity)
            : null
    } as UserDTO;
}

export const toUserEditDTO = (user: User) => {

    return {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,

        jobTitle: user.jobTitle
            ? toJobTitleDTO(user.jobTitle)
            : null,

        organization: user.organization
            ? toOrganizationDTO(user.organization)
            : null,

        role: user.role
            ? toRoleDTO(user.role)
            : null
    } as UserEditDTO;
}

export const toRoleDTO = (role: Role) => {

    return {
        id: role.id,
        name: role.name
    } as RoleDTO;
}

export const toJobTitleDTO = (jobTitle: JobTitle) => {

    return {
        id: jobTitle.id,
        name: jobTitle.name
    } as JobTitleDTO;
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
        tasks: user.tasks.map(x => toTaskDTO(x)),
        roleId: user.roleId
    } as AdminPageUserDTO;
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

export const toSimpleCourseItemDTOs = (course: Course) => {

    navPropNotNull(course.videos);
    navPropNotNull(course.exams);

    const videoCourseItemDTOs = course
        .videos
        .map(x => toCourseItemDTOVideo(x));

    const examCourseItemDTOs = course
        .exams
        .map(x => toCourseItemDTOExam(x));

    const courseItemDTOs = videoCourseItemDTOs
        .concat(examCourseItemDTOs)
        .orderBy(x => x.orderIndex);

    return courseItemDTOs;
}

export const toExamResultDTO = (views: ExamResultView[]) => {

    const viewAsExam = views.first();

    const questionDTOs = views
        .groupBy(x => x.questionId)
        .map(questsionGroup => {

            const viewAsQuestion = questsionGroup.items.first();

            return {
                text: viewAsQuestion.questionText,
                isCorrect: viewAsQuestion.isCorrect,
                answers: questsionGroup
                    .items
                    .map(x => toResultAnswerDTO(x)),
            } as ExamResultQuestionDTO;
        })

    return {
        isSuccessful: viewAsExam.isCompletedSession,
        correctAnswerCount: viewAsExam.correctGivenAnswerCount,
        questionCount: viewAsExam.questionCount,
        questions: questionDTOs,
        isCompletedPrevoiusly: !viewAsExam.onlySuccessfulSession,
        isFinalExam: viewAsExam.isFinalExam,
        shouldShowCourseCompleted: viewAsExam.onlySuccessfulSession && viewAsExam.isFinalExam
    } as ExamResultsDTO;
}

export const toResultAnswerDTO = (view: ExamResultView) => {

    return {
        answerId: view.answerId,
        answerText: view.answerText,
        isCorrect: view.isAnswerCorrect,
        isGiven: view.isGivenAnswer
    } as ResultAnswerDTO;
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

    return {
        id: courseItemView.itemId,
        subTitle: courseItemView.itemSubtitle,
        title: courseItemView.itemTitle,
        orderIndex: courseItemView.itemOrderIndex,
        state: courseItemView.state,
        descriptorCode: courseItemView.itemCode,
        type: courseItemView.itemIsVideo ? "video" : "exam"
    } as CourseItemDTO;
}

export const toCourseItemDTOExam = (exam: Exam, state?: CourseItemStateType) => {

    return {
        id: exam.id,
        subTitle: exam.subtitle,
        thumbnailUrl: getExamCoverImageUrl(),
        title: exam.title,
        orderIndex: exam.orderIndex,
        state: state ?? "available",
        descriptorCode: getItemCode(exam.id, "exam"),
        type: "exam"
    } as CourseItemDTO;
}

export const toCourseItemDTOVideo = (video: Video, state?: CourseItemStateType) => {

    return {
        id: video.id,
        subTitle: video.subtitle,
        thumbnailUrl: getAssetUrl(video.thumbnailFile?.filePath) ?? getAssetUrl("images/videoImage.jpg"),
        title: video.title,
        orderIndex: video.orderIndex,
        state: state ?? "available",
        descriptorCode: getItemCode(video.id, "video"),
        type: "video"
    } as CourseItemDTO;
}

export const toDailyTipDTO = (view: DailyTipView) => {

    return {
        description: view.description,
        videoUrl: getAssetUrl(view.videoFilePath)
    } as DailyTipDTO;
}

export const toCourseShortDTO = (course: CourseView) => {

    const thumbnailImageURL = course.filePath
        ? getAssetUrl(course.filePath)
        : getAssetUrl("/images/defaultCourseCover.jpg");

    const firstItemCode = course.isStarted
        ? course.currentItemCode
        : null;

    const teacher = course.teacher;

    return {
        courseId: course.id,
        title: course.title,
        categoryName: course.categoryName,
        subCategoryName: course.subCategoryName,
        firstItemCode: firstItemCode,
        teacherName: teacher.lastName + " " + teacher.firstName,
        thumbnailImageURL: thumbnailImageURL,
        isComplete: course.isCompleted
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
        orderIndex: q.orderIndex,
        questionText: q.questionText,
        imageUrl: q.imageUrl,
        showUpTimeSeconds: q.showUpTimeSeconds,
        typeId: q.typeId,
        answers: q.answers
            .map(x => toAnswerDTO(x))

    } as QuestionDTO;
}

export const toSignupDataDTO = (questions: SignupQuestionView[], isCompletedSignup: boolean) => {

    return {
        questions: questions
            .groupBy(x => x.questionId)
            .map(questionGrouping => {

                const viewAsQuestion = questionGrouping.items.first();

                return {
                    questionId: viewAsQuestion.questionId,
                    questionText: viewAsQuestion.questionText,
                    imageUrl: viewAsQuestion.imageUrl,
                    typeId: viewAsQuestion.typeId,
                    answers: questionGrouping
                        .items
                        .map(viewAsAnswer => {

                            return {
                                answerId: viewAsAnswer.answerId,
                                answerText: viewAsAnswer.answerText,
                                isGiven: viewAsAnswer.isGivenAnswer
                            } as SignupAnswerDTO;
                        })
                } as SignupQuestionDTO;
            }),
        isCompleted: isCompletedSignup
    } as SignupDataDTO;
}

export const toCourseEditDataDTO = (
    courseViews: CourseAdminDetailedView[],
    categories: CourseCategory[]) => {

    const viewAsCourse = courseViews.first();

    const thumbnailImageURL = viewAsCourse.coverFilePath
        ? getAssetUrl(viewAsCourse.coverFilePath)
        : getAssetUrl("/images/defaultCourseCover.jpg");

    const modules = courseViews
        .groupBy(x => x.moduleId)
        .map(grouping => {

            const viewAsModule = grouping.items.first();

            const items = grouping
                .items
                .filter(x => !!x.itemId)
                .map(viewAsItem => useMapperFunction(CourseAdminDetailedView, CourseAdminItemShortDTO, viewAsItem));

            return {
                id: viewAsModule.moduleId,
                name: viewAsModule.moduleName,
                orderIndex: viewAsModule.moduleOrderIndex,
                code: viewAsModule.moduleCode,
                items: items
            } as ModuleEditDTO;
        });

    return {
        title: viewAsCourse.title,
        courseId: viewAsCourse.id,
        thumbnailURL: thumbnailImageURL,
        category: {
            id: viewAsCourse.categoryId,
            name: viewAsCourse.categoryName
        },
        subCategory: {
            id: viewAsCourse.subCategoryId,
            name: viewAsCourse.subCategoryName
        },
        teacher: {
            id: viewAsCourse.teacherId,
            name: toFullName(viewAsCourse.teacherFirstName, viewAsCourse.teacherLastName),
            firstName: viewAsCourse.teacherFirstName,
            lastName: viewAsCourse.teacherLastName,
        },
        modules: modules,
        categories: categories.map(x => toCourseCategoryDTO(x)),
    } as CourseEditDataDTO;
}

export const toAnswerDTO = (a: Answer) => {

    return {
        answerId: a.id,
        answerText: a.text
    } as AnswerDTO;
}

export const toAnswerEditDTO = (a: Answer) => {

    return {
        id: a.id,
        isCorrect: a.isCorrect,
        text: a.text
    } as AnswerEditDTO;
}

export const toCourseAdminShortDTO = (view: CourseAdminShortView) => {

    const thumbnailImageURL = view.coverFilePath
        ? getAssetUrl(view.coverFilePath)
        : getAssetUrl("/images/defaultCourseCover.jpg");

    return {
        title: view.title,
        courseId: view.id,
        videosCount: view.videoCount,
        examCount: view.examCount,
        thumbnailImageURL,
        category: {
            id: view.categoryId,
            name: view.categoryName
        },
        subCategory: {
            id: view.subCategoryId,
            name: view.subCategoryName
        },
        teacher: {
            id: view.teacherId,
            name: toFullName(view.teacherFirstName, view.teacherLastName),
            firstName: view.teacherFirstName,
            lastName: view.teacherLastName,
        }
    } as CourseAdminListItemDTO;
}

export const toCourseDetailsDTO = (course: Course) => {

    const thumbnailImageURL = course.coverFile
        ? getAssetUrl(course.coverFile.filePath)
        : getAssetUrl("/images/defaultCourseCover.jpg");

    return {
        title: course.title,
        description: "",
        categoryName: course.category.name,
        subCategoryName: course.subCategory.name,
        thumbnailURL: thumbnailImageURL
    } as CourseDetailsDTO;
}

export const toCourseCategoryDTO = (cc: CourseCategory): CourseCategoryDTO => {

    return {
        id: cc.id,
        name: cc.name,
        childCategories: cc.childCategories
            ? cc.childCategories
                .map(x => toCourseCategoryDTO(x))
            : []
    } as CourseCategoryDTO;
}
