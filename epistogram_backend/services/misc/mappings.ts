import { Answer } from "../../models/entity/Answer";
import { Course } from "../../models/entity/Course";
import { CourseCategory } from "../../models/entity/CourseCategory";
import { CourseModule } from "../../models/entity/CourseModule";
import { Event } from "../../models/entity/Event";
import { Exam } from "../../models/entity/Exam";
import { JobTitle } from "../../models/entity/JobTitle";
import { Organization } from "../../models/entity/Organization";
import { Question } from "../../models/entity/Question";
import { Role } from "../../models/entity/Role";
import { ShopItemCategory } from "../../models/entity/ShopItemCategory";
import { Task } from "../../models/entity/Task";
import { TeacherInfo } from "../../models/entity/TeacherInfo";
import { User } from "../../models/entity/User";
import { Video } from "../../models/entity/Video";
import { AdminPageUserDTO } from "../../models/shared_models/AdminPageUserDTO";
import { AnswerDTO } from "../../models/shared_models/AnswerDTO";
import { AnswerEditDTO } from "../../models/shared_models/AnswerEditDTO";
import { CoinTransactionDTO } from "../../models/shared_models/CoinTransactionDTO";
import { CourseAdminItemShortDTO } from "../../models/shared_models/CourseAdminItemShortDTO";
import { CourseAdminListItemDTO } from "../../models/shared_models/CourseAdminListItemDTO";
import { CourseCategoryDTO } from "../../models/shared_models/CourseCategoryDTO";
import { CourseContentEditDataDTO } from "../../models/shared_models/CourseContentEditDataDTO";
import { CourseDetailsDTO } from "../../models/shared_models/CourseDetailsDTO";
import { CourseDetailsEditDataDTO } from "../../models/shared_models/CourseDetailsEditDataDTO";
import { CourseItemDTO } from "../../models/shared_models/CourseItemDTO";
import { CourseItemListDTO } from "../../models/shared_models/CourseItemListDTO";
import { CourseLearningDTO } from "../../models/shared_models/CourseLearningDTO";
import { CourseProgressShortDTO } from "../../models/shared_models/CourseProgressShortDTO";
import { CourseShortDTO } from "../../models/shared_models/CourseShortDTO";
import { CourseStatDTO } from "../../models/shared_models/CourseStatDTO";
import { DailyTipDTO } from "../../models/shared_models/DailyTipDTO";
import { EventDTO } from "../../models/shared_models/EventDTO";
import { ExamPlayerDataDTO } from "../../models/shared_models/ExamPlayerDataDTO";
import { ExamEditDataDTO } from "../../models/shared_models/ExamEditDataDTO";
import { ExamResultQuestionDTO } from "../../models/shared_models/ExamResultQuestionDTO";
import { ExamResultsDTO } from "../../models/shared_models/ExamResultsDTO";
import { JobTitleDTO } from "../../models/shared_models/JobTitleDTO";
import { ModuleAdminEditDTO } from "../../models/shared_models/ModuleAdminEditDTO";
import { ModuleAdminShortDTO } from "../../models/shared_models/ModuleAdminShortDTO";
import { ModuleDetailedDTO } from "../../models/shared_models/ModuleDetailedDTO";
import { ModuleShortDTO } from "../../models/shared_models/ModuleShortDTO";
import { OrganizationDTO } from "../../models/shared_models/OrganizationDTO";
import { QuestionDTO } from "../../models/shared_models/QuestionDTO";
import { ResultAnswerDTO } from "../../models/shared_models/ResultAnswerDTO";
import { RoleDTO } from "../../models/shared_models/RoleDTO";
import { ShopItemCategoryDTO } from "../../models/shared_models/ShopItemCategoryDTO";
import { ShopItemDTO } from "../../models/shared_models/ShopItemDTO";
import { SignupAnswerDTO } from "../../models/shared_models/SignupAnswerDTO";
import { SignupDataDTO } from "../../models/shared_models/SignupDataDTO";
import { SignupQuestionDTO } from "../../models/shared_models/SignupQuestionDTO";
import { TaskDTO } from "../../models/shared_models/TaskDTO";
import { TeacherInfoEditDTO } from "../../models/shared_models/TeacherInfoEditDTO";
import { CourseItemStateType } from "../../models/shared_models/types/sharedTypes";
import { UserActivityDTO } from "../../models/shared_models/UserActivityDTO";
import { UserDTO } from "../../models/shared_models/UserDTO";
import { UserEditDTO } from "../../models/shared_models/UserEditDTO";
import { UserStatsDTO } from "../../models/shared_models/UserStatsDTO";
import { VideoDTO } from "../../models/shared_models/VideoDTO";
import { VideoEditDTO } from "../../models/shared_models/VideoEditDTO";
import { CoinTransactionView } from "../../models/views/CoinTransactionView";
import { CourseAdminContentView } from "../../models/views/CourseAdminContentView";
import { CourseAdminDetailedView } from "../../models/views/CourseAdminDetailedView";
import { CourseAdminShortView } from "../../models/views/CourseAdminShortView";
import { CourseDetailsView } from "../../models/views/CourseDetailsView";
import { CourseItemStateView } from "../../models/views/CourseItemStateView";
import { CourseLearningStatsView } from "../../models/views/CourseLearningStatsView";
import { CourseModuleOverviewView } from "../../models/views/CourseModuleOverviewView";
import { CourseProgressView } from "../../models/views/CourseProgressView";
import { CourseView } from "../../models/views/CourseView";
import { DailyTipView } from "../../models/views/DailyTipView";
import { ExamResultView } from "../../models/views/ExamResultView";
import { SignupQuestionView } from "../../models/views/SignupQuestionView";
import { UserActivityFlatView } from "../../models/views/UserActivityFlatView";
import { UserStatsView } from "../../models/views/UserStatsView";
import { navPropNotNull, toFullName } from "../../utilities/helpers";
import { MapperService } from "../MapperService";
import { getItemCode } from "./encodeService";
import { ExamView } from "../../models/views/ExamView";
import { ShopItem } from "../../models/entity/ShopItem";
import { ShopItemAdminShortDTO } from "../../models/shared_models/ShopItemAdminShortDTO";
import { ShopItemBriefData } from "../../models/shared_models/ShopItemBriefData";
import { ShopItemEditDTO } from "../../models/shared_models/ShopItemEditDTO";
import { CourseBriefData } from "../../models/shared_models/CourseBriefData";
import { CourseShopItemListDTO } from "../../models/shared_models/CourseShopItemListDTO";
import { ShopItemStatefulView } from "../../models/views/ShopItemStatefulView";
import { ShopItemView } from "../../models/views/ShopItemView";
import { DiscountCode } from "../../models/entity/DiscountCode";
import { DiscountCodeDTO } from "../../models/shared_models/DiscountCodeDTO";

export const initializeMappings = (getAssetUrl: (path: string) => string, mapperService: MapperService) => {

    mapperService
        .addMap(CourseModule, ModuleDetailedDTO, courseModule => ({
            id: courseModule.id,
            name: courseModule.name,
            description: courseModule.description,
            imageFilePath: courseModule.imageFile
                ? getAssetUrl(courseModule.imageFile.filePath)
                : null
        }));

    mapperService
        .addMap(CourseModule, ModuleAdminEditDTO, courseModule => ({
            id: courseModule.id,
            name: courseModule.name,
            description: courseModule.description,
            imageFilePath: courseModule.imageFile
                ? getAssetUrl(courseModule.imageFile.filePath)
                : null
        }));

    mapperService
        .addMap(UserStatsView, UserStatsDTO, view => ({
            userId: view.userId,
            userEmail: view.userEmail,
            averageSessionLengthSeconds: view.averageSessionLengthSeconds,
            completedExamCount: view.completedExamCount,
            completedVideoCount: view.completedVideoCount,
            successfulExamCount: view.successfulExamCount,
            totalAnswerSessionSuccessRate: view.totalAnswerSessionSuccessRate,
            totalCorrectAnswerRate: view.totalCorrectAnswerRate,
            totalCorrectGivenAnswerCount: view.totalCorrectGivenAnswerCount,
            totalGivenAnswerCount: view.totalGivenAnswerCount,
            totalSessionLengthSeconds: view.totalSessionLengthSeconds,
            totalSuccessfulExamRate: view.totalSuccessfulExamRate,
            totalVideoPlaybackSeconds: view.totalVideoPlaybackSeconds
        }));

    mapperService
        .addMap(Event, EventDTO, event => ({
            data: JSON.parse(event.data),
            type: event.type
        }));

    mapperService
        .addMap(CoinTransactionView, CoinTransactionDTO, view => ({
            ...view
        }));

    mapperService
        .addMap(ShopItemStatefulView, ShopItemDTO, x => ({
            id: x.id,
            courseId: x.courseId,
            userId: x.userId,
            name: x.name,
            canPurchase: x.canPurchase,
            purchaseCount: x.purchaseCount,
            purchaseLimit: x.purchaseLimit,
            coinPrice: x.coinPrice,
            currencyPrice: x.currencyPrice,
            shopItemCategoryId: x.shopItemCategoryId,
            shopItemCategoryName: x.shopItemCategoryName,
            coverFilePath: getAssetUrl(x.coverFilePath)
        }));

    mapperService
        .addMap(ShopItemCategory, ShopItemCategoryDTO, x => ({
            id: x.id,
            name: x.name
        }));

    mapperService
        .addMap(CourseLearningStatsView, CourseLearningDTO, x => {

            const thumbnailImageURL = x.filePath
                ? getAssetUrl(x.filePath)
                : getAssetUrl("/images/defaultCourseCover.jpg");

            return {
                courseId: x.id,
                title: x.title,
                categoryName: x.categoryName,
                subCategoryName: x.subCategoryName,
                currentItemCode: x.currentItemCode,
                firstItemCode: x.firstItemCode,
                teacherName: toFullName(x.teacherFirstName, x.teacherLastName),
                thumbnailImageURL: thumbnailImageURL,
                isComplete: x.isCompleted,
                totalSpentTime: x.totalSpentTime,
                totalCourseItemCount: x.totalCourseItemCount,
                completedCourseItemCount: x.completedCourseItemCount,
                totalVideoCount: x.totalVideoCount,
                completedVideoCount: x.completedVideoCount,
                totalVideoQuestionCount: x.totalVideoQuestionCount,
                answeredVideoQuestionCount: x.answeredVideoQuestionCount,
                examSuccessRateAverage: x.examSuccessRateAverage,
                questionSuccessRate: x.questionSuccessRate,
                finalExamSuccessRate: x.finalExamSuccessRate
            };
        });

    mapperService
        .addMap(CourseProgressView, CourseProgressShortDTO, x => ({
            ...x
        }));

    mapperService
        .addMap(CourseAdminDetailedView, CourseDetailsEditDataDTO, (view, params) => {

            const { categories, teachers } = params as { categories: CourseCategory[], teachers: User[] };

            const courseCategoryDTOs = categories
                .map(x => toCourseCategoryDTO(x));

            const thumbnailImageURL = view.coverFilePath
                ? getAssetUrl(view.coverFilePath)
                : getAssetUrl("/images/defaultCourseCover.jpg");

            return {
                title: view.title,
                courseId: view.courseId,
                thumbnailURL: thumbnailImageURL,
                shortDescription: view.shortDescription,
                language: view.languageName,
                difficulty: view.difficulty,
                description: view.description,
                benchmark: view.benchmark,
                previouslyCompletedCount: view.previouslyCompletedCount,
                visibility: view.visibility,
                teacherId: view.teacherId,
                humanSkillBenefitsDescription: view.humanSkillBenefitsDescription,

                skillBenefits: parseCommaSeparatedStringList(view.skillBenefits),
                technicalRequirements: parseCommaSeparatedStringList(view.technicalRequirements),
                humanSkillBenefits: parseSkillBenefits(view.humanSkillBenefits),

                category: {
                    id: view.categoryId,
                    name: view.categoryName
                },
                subCategory: {
                    id: view.subCategoryId,
                    name: view.subCategoryName
                },
                teachers: teachers
                    .map(x => ({
                        fullName: toFullName(x.firstName, x.lastName),
                        id: x.id
                    })),
                categories: courseCategoryDTOs
            } as CourseDetailsEditDataDTO;
        });

    mapperService
        .addMap(CourseAdminContentView, CourseContentEditDataDTO, (view, params) => {

            const modules = params as CourseAdminContentView[];

            const moduleDTOs = modules
                .groupBy(x => x.moduleId)
                .map(grouping => {

                    const viewAsModule = grouping.items.first();

                    const items = grouping
                        .items
                        .filter(x => !!x.itemId)
                        .map(viewAsItem => mapperService
                            .map(CourseAdminContentView, CourseAdminItemShortDTO, viewAsItem));

                    return {
                        id: viewAsModule.moduleId,
                        name: viewAsModule.moduleName,
                        orderIndex: viewAsModule.moduleOrderIndex,
                        code: viewAsModule.moduleCode,
                        items: items
                    } as ModuleAdminShortDTO;
                });

            return {
                courseId: view.courseId,
                modules: moduleDTOs
            } as CourseContentEditDataDTO;
        });

    mapperService
        .addMap(CourseAdminContentView, CourseAdminItemShortDTO, view => ({
            id: view.itemId,
            subTitle: view.itemSubtitle,
            title: view.itemTitle,
            orderIndex: view.itemOrderIndex,
            descriptorCode: view.itemCode,
            type: view.videoId ? "video" : "exam",
            questionCount: view.itemQuestionCount,
            videoLength: view.videoLength,
            isFinalExam: view.itemIsFinalExam
        }));

    mapperService
        .addMap(CourseDetailsView, CourseDetailsDTO, (view, params) => {

            const moduleViews = params as CourseModuleOverviewView[];

            const thumbnailImageURL = view.coverFilePath
                ? getAssetUrl(view.coverFilePath)
                : getAssetUrl("/images/defaultCourseCover.jpg");

            const modules = moduleViews
                .groupBy(x => x.moduleId)
                .map(group => ({
                    name: group
                        .items
                        .first()
                        .moduleName,
                    videos: group
                        .items
                        .map(x => ({
                            title: x.videoTitle,
                            length: x.videoLengthSeconds
                        }))
                }) as ModuleShortDTO);

            return {
                title: view.title,
                modificationDate: view.modificationDate.toString(),
                description: view.description,
                categoryName: view.categoryName,
                subCategoryName: view.subCategoryName,
                thumbnailURL: thumbnailImageURL,
                courseId: view.courseId,
                shortDescription: view.shortDescription,
                language: view.languageName,
                difficulty: view.difficulty,
                benchmark: view.benchmark,
                previouslyCompletedCount: view.previouslyCompletedCount,
                visibility: view.visibility,
                humanSkillBenefitsDescription: view.humanSkillBenefitsDescription,

                skillBenefits: parseCommaSeparatedStringList(view.skillBenefits),
                technicalRequirements: parseCommaSeparatedStringList(view.technicalRequirements),
                humanSkillBenefits: parseSkillBenefits(view.humanSkillBenefits),

                modules: modules,

                teacherData: {
                    teacherFullName: toFullName(view.teacherFirstName, view.teacherLastName),
                    teacherFirstName: view.teacherFirstName,
                    teacherLastName: view.teacherLastName,
                    teacherBadges: parseCommaSeparatedStringList(view.teacherBadges),
                    teacherCourseCount: view.teacherCourseCount,
                    teacherDescription: view.teacherDescription,
                    teacherRating: view.teacherRating,
                    teacherSkills: view.teacherSkills,
                    teacherStudentCount: view.teacherStudentCount,
                    teacherVideoCount: view.teacherVideoCount,
                    teacherAvatarFilePath: view.teacherAvatarFilePath
                        ? getAssetUrl(view.teacherAvatarFilePath)
                        : null
                },

                totalModuleCount: view.totalModuleCount,
                totalVideoCount: view.totalVideoCount,
                totalVideoQuestionCount: view.totalVideoQuestionCount,
                totalVideoSumLengthSeconds: view.totalVideoSumLengthSeconds
            } as CourseDetailsDTO;
        });

    mapperService
        .addMap(User, UserEditDTO, user => {
            return {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                isTeacher: !!user.teacherInfo,

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
        });

    mapperService
        .addMap(User, UserDTO, user => {

            return {
                id: user.id,
                organizationId: user.organizationId,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                phoneNumber: user.phoneNumber,
                isTrusted: user.isTrusted,
                isInvitationAccepted: user.isInvitationAccepted,
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
        });

    mapperService
        .addMap(CourseView, CourseStatDTO, view => {

            return {
                title: view.title,
                coverImageUrl: view.filePath
                    ? getAssetUrl(view.filePath)
                    : getAssetUrl("/images/defaultCourseCover.jpg")
            } as CourseStatDTO;
        });

    mapperService
        .addMap(User, AdminPageUserDTO, user => {

            const userDTO = mapperService
                .map(User, UserDTO, user);

            return {
                ...userDTO,
                organizationName: user.organization ? user.organization.name : "",
                tasks: user.tasks.map(x => toTaskDTO(x)),
                roleId: user.roleId
            } as AdminPageUserDTO;
        });

    mapperService
        .addMap(Video, VideoDTO, (video, maxWatchedSeconds: number) => {

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
        });

    mapperService
        .addMap(Video, CourseItemDTO, (video, state: CourseItemStateType) => {

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
        });

    mapperService
        .addMap(Exam, CourseItemDTO, (exam, state: CourseItemStateType) => {

            return {
                id: exam.id,
                subTitle: exam.subtitle,
                thumbnailUrl: getAssetUrl("/images/examCover.jpg"),
                title: exam.title,
                orderIndex: exam.orderIndex,
                state: state ?? "available",
                descriptorCode: getItemCode(exam.id, "exam"),
                type: "exam"
            } as CourseItemDTO;
        });

    mapperService
        .addMap(Course, CourseItemListDTO, course => {

            navPropNotNull(course.videos);
            navPropNotNull(course.exams);

            const videoCourseItemDTOs = mapperService
                .mapMany(Video, CourseItemDTO, course.videos);

            const examCourseItemDTOs = mapperService
                .mapMany(Exam, CourseItemDTO, course.exams);

            const courseItemDTOs = videoCourseItemDTOs
                .concat(examCourseItemDTOs)
                .orderBy(x => x.orderIndex);

            return {
                courseItems: courseItemDTOs
            } as CourseItemListDTO;
        });

    mapperService
        .addMap(DailyTipView, DailyTipDTO, view => {

            return {
                description: view.description,
                videoUrl: getAssetUrl(view.videoFilePath)
            } as DailyTipDTO;
        });

    mapperService
        .addMap(CourseView, CourseShortDTO, course => {

            const thumbnailImageURL = course.filePath
                ? getAssetUrl(course.filePath)
                : getAssetUrl("/images/defaultCourseCover.jpg");

            const firstItemCode = course.isStarted
                ? course.currentItemCode
                : null;

            return {
                courseId: course.id,
                title: course.title,
                categoryName: course.categoryName,
                subCategoryName: course.subCategoryName,
                firstItemCode: firstItemCode,
                teacherName: toFullName(course.teacherFirstName, course.teacherLastName),
                thumbnailImageURL: thumbnailImageURL,
                isComplete: course.isCompleted
            } as CourseShortDTO;
        });

    mapperService
        .addMap(CourseAdminShortView, CourseAdminListItemDTO, view => {

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
        });

    mapperService
        .addMap(Video, VideoEditDTO, video => {

            return {
                id: video.id,
                title: video.title,
                description: video.description,
                subtitle: video.subtitle,
                videoLengthSeconds: video.lengthSeconds,

                questions: video
                    .questions
                    .map(x => toQuestionDTO(x)),

                videoFileUrl: video.videoFile
                    ? getAssetUrl(video.videoFile.filePath)
                    : null
            } as VideoEditDTO;
        });

    mapperService
        .addMap(TeacherInfo, TeacherInfoEditDTO, x => ({
            id: x.id,
            courseCount: x.courseCount,
            rating: x.rating,
            studentCount: x.studentCount,
            videoCount: x.videoCount,
            skills: x.skills,
            badges: parseCommaSeparatedStringList(x.badges),
            description: x.description
        }));

    mapperService
        .addMap(CourseItemStateView, CourseItemDTO, courseItemView => {

            return {
                id: courseItemView.itemId,
                subTitle: courseItemView.itemSubtitle,
                title: courseItemView.itemTitle,
                orderIndex: courseItemView.itemOrderIndex,
                state: courseItemView.state,
                descriptorCode: courseItemView.itemCode,
                type: courseItemView.itemIsVideo ? "video" : "exam"
            } as CourseItemDTO;
        });

    mapperService
        .addMap(Exam, ExamEditDataDTO, exam => {

            return {
                id: exam.id,
                title: exam.title,
                courseId: exam.courseId,
                subTitle: exam.subtitle,
                isFinalExam: exam.isFinalExam,
                reatakeLimit: exam.retakeLimit,
                questions: exam
                    .questions
                    .map(x => toQuestionDTO(x))
            } as ExamEditDataDTO;
        });

    mapperService
        .addMap(ExamView, ExamPlayerDataDTO, (exam, questions: Question[]) => {

            return {
                id: exam.examId,
                courseId: exam.courseId,
                subTitle: exam.subtitle,
                title: exam.title,
                thumbnailUrl: exam.thumbnailUrl,
                isFinalExam: exam.isFinalExam,
                canTakeAgain: exam.canRetake,
                correctAnswerCount: exam.correctAnswerCount,
                correctAnswerRate: exam.correctAnswerRate,
                isCompletedPreviously: exam.isCompletedPreviously,
                totalQuestionCount: exam.totalQuestionCount,
                questions: questions
                    .map(x => toQuestionDTO(x)),
            } as ExamPlayerDataDTO;
        });

    mapperService
        .addMap(ShopItem, ShopItemAdminShortDTO, x => ({

            id: x.id,
            coverFilePath: x.coverFile?.filePath ? getAssetUrl(x.coverFile.filePath) : null,
            coinPrice: x.coinPrice,
            currencyPrice: x.currencyPrice,
            name: x.name,
            purchaseLimit: x.purchaseLimit,
            shopItemCategoryId: x.shopItemCategoryId
        }));

    mapperService
        .addMap(DiscountCode, DiscountCodeDTO, x => ({
            id: x.id,
            code: x.code,
            isUsed: !!x.userId
        }));

    mapperService
        .addMap(ShopItem, ShopItemEditDTO, (shopItem, discountCodes: DiscountCode[]) => ({

            id: shopItem.id,
            coverFilePath: shopItem.coverFile?.filePath
                ? getAssetUrl(shopItem.coverFile.filePath)
                : null,
            coinPrice: shopItem.coinPrice,
            currencyPrice: shopItem.currencyPrice,
            name: shopItem.name,
            purchaseLimit: shopItem.purchaseLimit,
            shopItemCategoryId: shopItem.shopItemCategoryId,
            courseId: shopItem.courseId,
            discountCodes: mapperService
                .mapMany(DiscountCode, DiscountCodeDTO, discountCodes)
        }));

    mapperService
        .addMap(ShopItemView, ShopItemAdminShortDTO, x => ({
            id: x.id,
            name: x.name,
            purchaseLimit: x.purchaseLimit,
            coinPrice: x.coinPrice,
            currencyPrice: x.currencyPrice,
            shopItemCategoryId: x.shopItemCategoryId,
            coverFilePath: getAssetUrl(x.coverFilePath)
        }));

    mapperService
        .addMap(ShopItemView, ShopItemBriefData, x => ({
            name: x.name
        }));

    mapperService
        .addMap(Course, CourseBriefData, course => ({
            id: course.id,
            title: course.title
        }));

    mapperService
        .addMap(Course, CourseShopItemListDTO, course => ({
            id: course.id,
            title: course.title,
            coverImagePath: course.coverFile
                ? getAssetUrl(course.coverFile.filePath)
                : null
        }));
}

const parseCommaSeparatedStringList = (str: string) => {

    return (str ?? "").split(",").map(x => x.trim());
}

const parseSkillBenefits = (str: string) => {

    if (!str)
        return [];

    return (str ?? "")
        .split(',')
        .map(x => {

            const trimmed = x.trim();
            const split = trimmed.split(":");

            return {
                text: split[0].trim(),
                value: parseInt(split[1].trim())
            }
        })
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

export const toUserActivityDTO = (userRightsView: UserActivityFlatView) => {

    const { user, userId, ...activityFlags } = userRightsView;

    return {
        ...activityFlags
    } as UserActivityDTO;
}

export const toTaskDTO = (task: Task) => {

    return {
        name: task.name,
        dueDate: task.dueData,
        objective: task.objective
    } as TaskDTO;
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
