import { Answer } from '../../models/entity/Answer';
import { Permission } from '../../models/entity/authorization/Permission';
import { Role } from '../../models/entity/authorization/Role';
import { Company } from '../../models/entity/Company';
import { Course } from '../../models/entity/Course';
import { CourseCategory } from '../../models/entity/CourseCategory';
import { CourseModule } from '../../models/entity/CourseModule';
import { DailyTip } from '../../models/entity/DailyTip';
import { DiscountCode } from '../../models/entity/DiscountCode';
import { Event } from '../../models/entity/Event';
import { Exam } from '../../models/entity/Exam';
import { JobTitle } from '../../models/entity/JobTitle';
import { PersonalityTraitCategory } from '../../models/entity/PersonalityTraitCategory';
import { Question } from '../../models/entity/Question';
import { ShopItem } from '../../models/entity/ShopItem';
import { ShopItemCategory } from '../../models/entity/ShopItemCategory';
import { Task } from '../../models/entity/Task';
import { TeacherInfo } from '../../models/entity/TeacherInfo';
import { User } from '../../models/entity/User';
import { Video } from '../../models/entity/Video';
import { AdminUserListView } from '../../models/views/AdminUserListView';
import { AvailableCourseView } from '../../models/views/AvailableCourseView';
import { CoinTransactionView } from '../../models/views/CoinTransactionView';
import { CommentListView } from '../../models/views/CommentListView';
import { CompanyView } from '../../models/views/CompanyView';
import { CourseAdminContentView } from '../../models/views/CourseAdminContentView';
import { CourseAdminDetailedView } from '../../models/views/CourseAdminDetailedView';
import { CourseAdminShortView } from '../../models/views/CourseAdminShortView';
import { CourseDetailsView } from '../../models/views/CourseDetailsView';
import { CourseItemQuestionEditView } from '../../models/views/CourseItemQuestionEditView';
import { CourseItemStateView } from '../../models/views/CourseItemStateView';
import { CourseLearningStatsView } from '../../models/views/CourseLearningStatsView';
import { CourseModuleOverviewView } from '../../models/views/CourseModuleOverviewView';
import { CourseOverviewView } from '../../models/views/CourseOverviewView';
import { CourseProgressView } from '../../models/views/CourseProgressView';
import { CourseRatingQuestionView } from '../../models/views/CourseRatingQuestionView';
import { DailyTipView } from '../../models/views/DailyTipView';
import { ExamResultView } from '../../models/views/ExamResultView';
import { ExamView } from '../../models/views/ExamView';
import { ModuleView } from '../../models/views/ModuleView';
import { PersonalityTraitCategoryView } from '../../models/views/PersonalityTraitCategoryView';
import { PrequizQuestionView } from '../../models/views/PrequizQuestionView';
import { PretestResultView } from '../../models/views/PretestResultView';
import { ShopItemStatefulView } from '../../models/views/ShopItemStatefulView';
import { ShopItemView } from '../../models/views/ShopItemView';
import { SignupQuestionView } from '../../models/views/SignupQuestionView';
import { UserActiveCourseView } from '../../models/views/UserActiveCourseView';
import { UserCourseStatsView } from '../../models/views/UserCourseStatsView';
import { UserDailyProgressView } from '../../models/views/UserDailyProgressView';
import { UserStatsView } from '../../models/views/UserStatsView';
import { UserVideoStatsView } from '../../models/views/UserVideoStatsView';
import { AdminPageUserDTO } from '../../shared/dtos/admin/AdminPageUserDTO';
import { CourseAdminListItemDTO } from '../../shared/dtos/admin/CourseAdminListItemDTO';
import { CourseContentItemAdminDTO } from '../../shared/dtos/admin/CourseContentItemAdminDTO';
import { CourseContentItemIssueDTO } from '../../shared/dtos/admin/CourseContentItemIssueDTO';
import { AdminModuleShortDTO } from '../../shared/dtos/AdminModuleShortDTO';
import { AnswerDTO } from '../../shared/dtos/AnswerDTO';
import { AnswerEditDTO } from '../../shared/dtos/AnswerEditDTO';
import { CoinTransactionDTO } from '../../shared/dtos/CoinTransactionDTO';
import { CommentListDTO } from '../../shared/dtos/CommentListDTO';
import { CompanyDTO } from '../../shared/dtos/company/CompanyDTO';
import { CompanyEditDataDTO } from '../../shared/dtos/company/CompanyEditDataDTO';
import { CourseBriefData } from '../../shared/dtos/CourseBriefData';
import { CourseCategoryDTO } from '../../shared/dtos/CourseCategoryDTO';
import { CourseDetailsDTO } from '../../shared/dtos/CourseDetailsDTO';
import { CourseDetailsEditDataDTO } from '../../shared/dtos/CourseDetailsEditDataDTO';
import { CourseItemDTO } from '../../shared/dtos/CourseItemDTO';
import { CourseItemListDTO } from '../../shared/dtos/CourseItemListDTO';
import { CourseLearningDTO } from '../../shared/dtos/CourseLearningDTO';
import { CourseOverviewDataDTO } from '../../shared/dtos/CourseOverviewDataDTO';
import { CourseProgressShortDTO } from '../../shared/dtos/CourseProgressShortDTO';
import { CourseRatingGroupDTO } from '../../shared/dtos/CourseRatingGroupDTO';
import { CourseRatingQuestionDTO } from '../../shared/dtos/CourseRatingQuestionDTO';
import { CourseShopItemListDTO } from '../../shared/dtos/CourseShopItemListDTO';
import { CourseShortDTO } from '../../shared/dtos/CourseShortDTO';
import { CourseStatDTO } from '../../shared/dtos/CourseStatDTO';
import { DailyTipDTO } from '../../shared/dtos/DailyTipDTO';
import { DailyTipEditDataDTO } from '../../shared/dtos/DailyTipEditDataDTO';
import { DiscountCodeDTO } from '../../shared/dtos/DiscountCodeDTO';
import { EventDTO } from '../../shared/dtos/EventDTO';
import { ExamEditDataDTO } from '../../shared/dtos/ExamEditDataDTO';
import { ExamPlayerDataDTO } from '../../shared/dtos/ExamPlayerDataDTO';
import { ExamQuestionEditDTO } from '../../shared/dtos/ExamQuestionEditDTO';
import { ExamResultQuestionDTO } from '../../shared/dtos/ExamResultQuestionDTO';
import { ExamResultsDTO } from '../../shared/dtos/ExamResultsDTO';
import { JobTitleDTO } from '../../shared/dtos/JobTitleDTO';
import { ModuleAdminEditDTO } from '../../shared/dtos/ModuleAdminEditDTO';
import { ModuleDetailedDTO } from '../../shared/dtos/ModuleDetailedDTO';
import { ModuleShortDTO } from '../../shared/dtos/ModuleShortDTO';
import { PersonalityTraitCategoryDTO } from '../../shared/dtos/PersonalityTraitCategoryDTO';
import { PersonalityTraitCategoryShortDTO } from '../../shared/dtos/PersonalityTraitCategoryShortDTO';
import { PrequizAnswerDTO } from '../../shared/dtos/PrequizAnswerDTO';
import { PrequizQuestionDTO } from '../../shared/dtos/PrequizQuestionDTO';
import { PretestResultDTO } from '../../shared/dtos/PretestResultDTO';
import { QuestionDTO } from '../../shared/dtos/QuestionDTO';
import { QuestionEditDataDTO } from '../../shared/dtos/QuestionEditDataDTO';
import { ResultAnswerDTO } from '../../shared/dtos/ResultAnswerDTO';
import { PermissionListDTO } from '../../shared/dtos/role/PermissionListDTO';
import { RoleDTO } from '../../shared/dtos/RoleDTO';
import { ShopItemAdminShortDTO } from '../../shared/dtos/ShopItemAdminShortDTO';
import { ShopItemBriefData } from '../../shared/dtos/ShopItemBriefData';
import { ShopItemCategoryDTO } from '../../shared/dtos/ShopItemCategoryDTO';
import { ShopItemDTO } from '../../shared/dtos/ShopItemDTO';
import { ShopItemEditDTO } from '../../shared/dtos/ShopItemEditDTO';
import { SignupAnswerDTO } from '../../shared/dtos/SignupAnswerDTO';
import { SignupDataDTO } from '../../shared/dtos/SignupDataDTO';
import { SignupQuestionDTO } from '../../shared/dtos/SignupQuestionDTO';
import { TaskDTO } from '../../shared/dtos/TaskDTO';
import { TeacherInfoEditDTO } from '../../shared/dtos/TeacherInfoEditDTO';
import { UserActiveCourseDTO } from '../../shared/dtos/UserActiveCourseDTO';
import { UserCourseStatsDTO } from '../../shared/dtos/UserCourseStatsDTO';
import { UserDailyProgressDTO } from '../../shared/dtos/UserDailyProgressDTO';
import { UserDTO } from '../../shared/dtos/UserDTO';
import { UserStatsDTO } from '../../shared/dtos/UserStatsDTO';
import { UserVideoStatsDTO } from '../../shared/dtos/UserVideoStatsDTO';
import { VideoEditDTO } from '../../shared/dtos/VideoEditDTO';
import { VideoQuestionEditDTO } from '../../shared/dtos/VideoQuestionEditDTO';
import { CourseItemStateType } from '../../shared/types/sharedTypes';
import { navPropNotNull, toFullName } from '../../utilities/helpers';
import { MapperService } from '../MapperService';
import { UrlService } from '../UrlService';
import { getItemCode } from './encodeService';
import { XMappingsBuilder } from './XMapperService/XMapperService';
import { Mutable } from './XMapperService/XMapperTypes';

export const epistoMappingsBuilder = new XMappingsBuilder<[UrlService]>();

const marray = [
    epistoMappingsBuilder.addMapping(UserVideoStatsDTO, ([url]) => (blah: number) => ({ courseId: blah, videoTitle: url.getAssetUrl('asd') } as UserVideoStatsDTO)),
    epistoMappingsBuilder.addMapping(UserCourseStatsDTO, () => () => ({} as UserCourseStatsDTO)),
] as const;

export type EpistoMappingsType = Mutable<typeof marray>;

export const initializeMappings = (getAssetUrl: (path: string) => string, mapperService: MapperService) => {

    mapperService
        .addMap(UserVideoStatsView, UserVideoStatsDTO, (stats) => {
            return {
                userId: stats.userId,
                videoId: stats.videoId,
                videoTitle: stats.videoTitle,
                courseId: stats.courseId,
                lengthSeconds: stats.lengthSeconds,
                totalSpentTimeSeconds: stats.totalSpentTimeSeconds,
                videoReplaysCount: stats.videoReplaysCount,
                isRecommendedForRetry: stats.isRecommendedForRetry,
                lastThreeAnswerAverage: stats.lastThreeAnswerAverage,
                averageReactionTime: stats.averageReactionTime,
                lastWatchTime: stats.lastWatchTime
            }
        })

    mapperService
        .addMap(UserCourseStatsView, UserCourseStatsDTO, (stats) => {
            return {
                userId: stats.userId,
                courseId: stats.courseId,
                courseName: stats.title,
                thumbnailImageUrl: getAssetUrl(stats.coverFilePath),
                differenceFromAveragePerformancePercentage: stats.differenceFromAveragePerformancePercentage,
                courseProgressPercentage: stats.courseProgressPercentage,
                performancePercentage: stats.performancePercentage,
                completedVideoCount: stats.completedVideoCount,
                completedExamCount: stats.completedExamCount,
                totalSpentSeconds: stats.totalSpentSeconds,
                averagePerformanceOnCourse: stats.averagePerformanceOnCourse,
                answeredVideoQuestionCount: stats.answeredVideoQuestionCount,
                answeredPractiseQuestionCount: stats.answeredPractiseQuestionCount,
                isFinalExamCompleted: stats.isFinalExamCompleted,
                recommendedItemsPerWeek: stats.recommendedItemsPerWeek,
                lagBehindPercentage: stats.lagBehindPercentage,
                previsionedCompletionDate: stats.previsionedCompletionDate,
                tempomatMode: stats.tempomatMode,
            };
        });

    mapperService
        .addMap(CommentListView, CommentListDTO, (comment) => {

            return {
                id: comment.id,
                userId: comment.userId,
                threadId: comment.threadId,
                fullName: comment.fullName,
                commentText: comment.commentText,
                creationDate: comment.creationDate,
                parentCommentId: comment.parentCommentId,
                avatarUrl: comment.avatarUrl,
                commentLikeCount: comment.commentLikeCount,
                isCurrentUserLikedComment: comment.isLike,
                isQuestion: comment.isQuestion
            };
        });

    mapperService
        .addMap(Question, QuestionEditDataDTO, question => ({
            questionId: question.id,
            questionText: question.questionText,
            answers: question.answers
                .map(answer => toAnswerEditDTO(answer))
        }));

    mapperService
        .addMap(ModuleView, AdminModuleShortDTO, view => ({
            id: view.id,
            name: view.name,
            canDelete: view.itemCount === 0
        }));

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
            coverFilePath: getAssetUrl(x.coverFilePath),
            detailsUrl: x.detailsUrl
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
                : getAssetUrl('/images/defaultCourseCover.jpg');

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
                totalSpentSeconds: x.totalSpentSeconds,
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
                : getAssetUrl('/images/defaultCourseCover.jpg');

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
                technicalRequirementsDescription: view.technicalRequirementsDescription,

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
        .addMap(CourseAdminContentView, CourseContentItemAdminDTO, x => {

            const getIssueList = (issues: string) => issues
                .split('\n')
                .filter(x => !!x)
                .map((x): CourseContentItemIssueDTO => {

                    if (x.includes(': ')) {
                        const parts = x.split(': ');
                        return {
                            code: parts[1] as any,
                            questionName: parts[0]
                        };
                    }

                    return {
                        code: x as any
                    };
                });

            const errors = getIssueList(x.errors);
            const warnings = getIssueList(x.warnings);

            return {
                courseId: x.courseId,
                examId: x.examId,
                itemCode: x.itemCode,
                itemId: x.itemId,
                itemOrderIndex: x.itemOrderIndex,
                itemSubtitle: x.itemSubtitle,
                itemTitle: x.itemTitle,
                moduleCode: x.moduleCode,
                moduleId: x.moduleId,
                moduleName: x.moduleName,
                moduleOrderIndex: x.moduleOrderIndex,
                videoId: x.videoId,
                errors,
                warnings,
                videoLength: x.videoLength,
                itemType: x.itemType
            };
        });

    mapperService
        .addMap(CourseDetailsView, CourseDetailsDTO, (detailsView, params) => {

            const moduleViews = params as CourseModuleOverviewView[];

            const thumbnailImageURL = detailsView.coverFilePath
                ? getAssetUrl(detailsView.coverFilePath)
                : getAssetUrl('/images/defaultCourseCover.jpg');

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
                title: detailsView.title,
                modificationDate: detailsView.modificationDate.toString(),
                description: detailsView.description,
                categoryName: detailsView.categoryName,
                subCategoryName: detailsView.subCategoryName,
                thumbnailURL: thumbnailImageURL,
                canStartCourse: detailsView.canStartCourse,
                courseId: detailsView.courseId,
                shortDescription: detailsView.shortDescription,
                language: detailsView.languageName,
                difficulty: detailsView.difficulty,
                benchmark: detailsView.benchmark,
                previouslyCompletedCount: detailsView.previouslyCompletedCount,
                visibility: detailsView.visibility,
                humanSkillBenefitsDescription: detailsView.humanSkillBenefitsDescription,
                currentItemCode: detailsView.currentItemCode,
                stageName: detailsView.stageName,

                skillBenefits: parseCommaSeparatedStringList(detailsView.skillBenefits),
                technicalRequirements: parseCommaSeparatedStringList(detailsView.technicalRequirements),
                humanSkillBenefits: parseSkillBenefits(detailsView.humanSkillBenefits),

                modules: modules,

                teacherData: {
                    teacherFullName: toFullName(detailsView.teacherFirstName, detailsView.teacherLastName),
                    teacherFirstName: detailsView.teacherFirstName,
                    teacherLastName: detailsView.teacherLastName,
                    teacherBadges: parseCommaSeparatedStringList(detailsView.teacherBadges),
                    teacherCourseCount: detailsView.teacherCourseCount,
                    teacherDescription: detailsView.teacherDescription,
                    teacherRating: detailsView.teacherRating,
                    teacherSkills: detailsView.teacherSkills,
                    teacherStudentCount: detailsView.teacherStudentCount,
                    teacherVideoCount: detailsView.teacherVideoCount,
                    teacherAvatarFilePath: detailsView.teacherAvatarFilePath
                        ? getAssetUrl(detailsView.teacherAvatarFilePath)
                        : null
                },

                totalModuleCount: detailsView.totalModuleCount,
                totalVideoCount: detailsView.totalVideoCount,
                totalVideoQuestionCount: detailsView.totalVideoQuestionCount,
                totalVideoSumLengthSeconds: detailsView.totalVideoSumLengthSeconds
            } as CourseDetailsDTO;
        });

    mapperService
        .addMap(User, UserDTO, user => {

            return {
                id: user.id,
                companyId: user.companyId,
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
                    : null
            } as UserDTO;
        });

    mapperService
        .addMap(Company, CompanyEditDataDTO, x => ({
            id: x.id,
            name: x.name
        }));

    mapperService
        .addMap(AvailableCourseView, CourseStatDTO, view => {

            return {
                title: view.title,
                coverImageUrl: view.filePath
                    ? getAssetUrl(view.filePath)
                    : getAssetUrl('/images/defaultCourseCover.jpg')
            } as CourseStatDTO;
        });

    mapperService
        .addMap(AdminUserListView, AdminPageUserDTO, v => ({
            id: v.userId,
            name: toFullName(v.firstName, v.lastName, 'hu'),
            firstName: v.firstName,
            lastName: v.lastName,
            avatarUrl: v.avatarFilePath
                ? getAssetUrl(v.avatarFilePath)
                : null,
            email: v.email,
            isInvitationAccepted: v.isInvitationAccepted,
            isTrusted: v.isTrusted,
            jobTitleId: v.jobTitleId,
            jobTitleName: v.jobTitleName,
            companyId: v.companyId,
            companyName: v.companyName,
            canAccessApplication: true,
            latestActivityDate: v.latestActivityDate,
            totalSpentTimeSeconds: v.totalSpentSeconds,
            coinBalance: v.coinBalance,
        }));

    mapperService
        .addMap(Video, CourseItemDTO, (video, state: CourseItemStateType) => {

            return {
                id: video.id,
                subTitle: video.subtitle,
                thumbnailUrl: getAssetUrl(video.thumbnailFile?.filePath) ?? getAssetUrl('images/videoImage.jpg'),
                title: video.title,
                orderIndex: video.orderIndex,
                state: state ?? 'available',
                descriptorCode: getItemCode(video.id, 'video'),
                type: 'video'
            } as CourseItemDTO;
        });

    mapperService
        .addMap(Exam, CourseItemDTO, (exam, state: CourseItemStateType) => {

            return {
                id: exam.id,
                subTitle: exam.subtitle,
                thumbnailUrl: getAssetUrl('/images/examCover.jpg'),
                title: exam.title,
                orderIndex: exam.orderIndex,
                state: state ?? 'available',
                descriptorCode: getItemCode(exam.id, 'exam'),
                type: 'exam'
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
                id: view.dailyTipId,
                description: view.description,
                videoUrl: getAssetUrl(view.videoFilePath)
            } as DailyTipDTO;
        });

    mapperService
        .addMap(AvailableCourseView, CourseShortDTO, course => {

            const thumbnailImageURL = course.filePath
                ? getAssetUrl(course.filePath)
                : getAssetUrl('/images/defaultCourseCover.jpg');

            const currentItemCode = course.isStarted
                ? course.currentItemCode
                : null;

            return {
                courseId: course.id,
                title: course.title,
                categoryName: course.categoryName,
                subCategoryName: course.subCategoryName,
                currentItemCode: currentItemCode,
                stageName: course.stageName,
                teacherName: toFullName(course.teacherFirstName, course.teacherLastName),
                thumbnailImageURL: thumbnailImageURL,
                isComplete: course.isCompleted
            } as CourseShortDTO;
        });

    mapperService
        .addMap(CourseAdminShortView, CourseAdminListItemDTO, view => {

            const thumbnailImageURL = view.coverFilePath
                ? getAssetUrl(view.coverFilePath)
                : getAssetUrl('/images/defaultCourseCover.jpg');

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
                type: courseItemView.itemType === 'video' ? 'video' : 'exam',
                shouldRepeatVideo: courseItemView.shouldRepeatVideo
            } as CourseItemDTO;
        });

    mapperService
        .addMap(Exam, ExamEditDataDTO, exam => {

            return {
                id: exam.id,
                title: exam.title,
                courseId: exam.courseId,
                subTitle: exam.subtitle,
                isFinalExam: exam.type === 'final',
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
            detailsUrl: shopItem.detailsUrl,
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

    mapperService
        .addMap(CourseOverviewView, CourseOverviewDataDTO, c => ({
            answeredVideoQuestionCount: c.answeredVideoQuestionCount,
            coinsAcquired: c.coinsAcquired,
            completedVideoCount: c.completedVideoCount,
            examSuccessRateAverage: c.examSuccessRateAverage,
            finalExamSuccessRate: c.finalExamSuccessRate,
            questionSuccessRate: c.questionSuccessRate,
            totalSpentSeconds: c.totalSpentSeconds
        }));

    mapperService
        .addMap(PersonalityTraitCategoryView, PersonalityTraitCategoryShortDTO, (x, isMax: boolean): PersonalityTraitCategoryShortDTO => {

            return {
                id: x.id,
                title: x.title,
                label: isMax ? x.maxLabel : x.minLabel,
                isMax,
                tipCount: isMax ? x.maxTipsCount : x.minTipsCount
            };
        });

    mapperService
        .addMap(DailyTip, DailyTipDTO, x => ({
            description: x.description,
            id: x.id,
            videoUrl: ''
        }));

    mapperService
        .addMap(PersonalityTraitCategory, PersonalityTraitCategoryDTO, (category, tips: DailyTip[]) => ({
            id: category.id,
            maxDescription: category.maxDescription,
            maxLabel: category.maxLabel,
            minDescription: category.minDescription,
            minLabel: category.minLabel,
            title: category.title,
            tips: mapperService
                .mapMany(DailyTip, DailyTipDTO, tips)
        }));

    mapperService
        .addMap(DailyTip, DailyTipEditDataDTO, x => ({
            description: x.description,
            id: x.id,
            isLive: x.isLive
        }));

    mapperService
        .addMap(PrequizQuestionView, PrequizQuestionDTO, (x, answers) => ({
            id: x.questionId,
            isNumeric: x.isNumericAnswer,
            text: x.questionText,
            minValue: x.minValue,
            maxValue: x.maxValue,
            stepValue: x.stepValue,
            maxLabel: x.maxLabel,
            minLabel: x.minLabel,
            valuePostfix: x.valuePostfix,
            answers
        }));

    mapperService
        .addMap(PrequizQuestionView, PrequizAnswerDTO, x => ({
            id: x.answerId,
            text: x.answerText
        }));

    mapperService
        .addMap(PretestResultView, PretestResultDTO, (x, cv: AvailableCourseView) => ({
            isCompleted: x.isCompleted,
            correctAnswerRate: x.correctAnswerRate,
            firstItemCode: cv.firstItemCode
        }));

    mapperService
        .addMap(CourseRatingQuestionView, CourseRatingQuestionDTO, x => ({
            id: x.questionId,
            text: x.questionText,
            type: x.questionType,
            answerText: x.answerText,
            answerValue: x.answerValue
        }));

    mapperService
        .addMap(CourseRatingQuestionView, CourseRatingGroupDTO, (x, questions: CourseRatingQuestionDTO[]) => ({
            id: x.groupId,
            name: x.groupName,
            questions
        }));

    mapperService
        .addMap(UserDailyProgressView, UserDailyProgressDTO, view => ({
            date: view.creationDate,
            spentSeconds: view.spentSeconds
        }));

    mapperService
        .addMap(UserActiveCourseView, UserActiveCourseDTO, view => ({
            courseId: view.courseId,
            coverFilePath: getAssetUrl(view.coverFilePath),
            title: view.title
        }));

    mapperService
        .addMap(CompanyView, CompanyDTO, x => ({
            id: x.companyId,
            name: x.companyName,
            canManage: x.canManage
        }));

    mapperService
        .addMap(Company, CompanyDTO, x => ({
            id: x.id,
            name: x.name
        }));

    mapperService
        .addMap(Permission, PermissionListDTO, x => ({
            code: x.code,
            scope: x.scope,
            id: x.id
        }));

    return marray;
};

const separationChar = '|';

export const createCharSeparatedList = (list: string[]) => {

    return list.join(` ${separationChar} `);
};

const parseCommaSeparatedStringList = (str: string) => {

    return (str ?? '')
        .split(separationChar)
        .map(x => x
            .trim());
};

const parseSkillBenefits = (str: string) => {

    if (!str)
        return [];

    return (str ?? '')
        .split(separationChar)
        .map(x => {

            const trimmed = x.trim();
            const split = trimmed.split(':');

            return {
                text: split[0].trim(),
                value: parseInt(split[1].trim())
            };
        });
};

export const toRoleDTO = (role: Role) => {

    return {
        id: role.id,
        name: role.name
    } as RoleDTO;
};

export const toJobTitleDTO = (jobTitle: JobTitle) => {

    return {
        id: jobTitle.id,
        name: jobTitle.name
    } as JobTitleDTO;
};

export const toTaskDTO = (task: Task) => {

    return {
        name: task.name,
        dueDate: task.dueData,
        objective: task.objective
    } as TaskDTO;
};

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
        });

    return {
        isSuccessful: viewAsExam.isCompletedSession,
        correctAnswerCount: viewAsExam.correctGivenAnswerCount,
        questionCount: viewAsExam.questionCount,
        questions: questionDTOs,
        isCompletedPrevoiusly: !viewAsExam.onlySuccessfulSession,
        isFinalExam: viewAsExam.isFinalExam,
        shouldShowCourseCompleted: viewAsExam.onlySuccessfulSession && viewAsExam.isFinalExam
    } as ExamResultsDTO;
};

export const toResultAnswerDTO = (view: ExamResultView) => {

    return {
        answerId: view.answerId,
        answerText: view.answerText,
        isCorrect: view.isAnswerCorrect,
        isGiven: view.isGivenAnswer
    } as ResultAnswerDTO;
};

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
};

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
};

export const toAnswerDTO = (a: Answer) => {

    return {
        answerId: a.id,
        answerText: a.text
    } as AnswerDTO;
};

export const toAnswerEditDTO = (a: Answer) => {

    return {
        id: a.id,
        isCorrect: a.isCorrect,
        text: a.text
    } as AnswerEditDTO;
};

export const toCourseCategoryDTO = (cc: CourseCategory): CourseCategoryDTO => {

    return {
        id: cc.id,
        name: cc.name,
        childCategories: cc.childCategories
            ? cc.childCategories
                .map(x => toCourseCategoryDTO(x))
            : []
    } as CourseCategoryDTO;
};

export const toVideoQuestionEditDTO = (
    ci: CourseItemQuestionEditView[],
    getAssetUrl: (path: string) => string
): VideoQuestionEditDTO => {

    const questionGroup = ci
        .groupBy(x => x.questionId);

    const {
        videoId,
        videoTitle,
        videoSubtitle,
        courseTitle,
        videoFilePath,
        videoLengthSeconds,
    } = questionGroup.first().first;

    const videoFileUrl = getAssetUrl(videoFilePath);

    return {
        id: videoId,
        title: videoTitle,
        subtitle: videoSubtitle,
        courseName: courseTitle,
        videoLengthSeconds: videoLengthSeconds,
        videoUrl: videoFileUrl,
        questions: questionGroup
            .map(q => {

                return {
                    videoId: q.first.videoId,
                    examId: null,
                    questionId: q.first.questionId,
                    questionText: q.first.questionText,
                    questionShowUpTimeSeconds: q.first.questionShowUpTimeSeconds,
                    answers: q.items.map(qi => ({
                        id: qi.answerId,
                        text: qi.answerText,
                        isCorrect: qi.answerIsCorrect
                    }))
                };
            })
    };
};

export const toExamQuestionEditDTO = (
    ci: CourseItemQuestionEditView[]
): ExamQuestionEditDTO => {

    const questionGroup = ci
        .groupBy(x => x.questionId);

    const {
        examId,
        examTitle,
        courseTitle
    } = questionGroup.first().first;

    return {
        id: examId,
        courseName: courseTitle,
        title: examTitle,
        questions: questionGroup
            .map(q => {

                return {
                    videoId: null,
                    examId: q.first.examId,
                    questionId: q.first.questionId,
                    questionText: q.first.questionText,
                    answers: q.items.map(qi => ({
                        id: qi.answerId,
                        text: qi.answerText,
                        isCorrect: qi.answerIsCorrect
                    }))
                };
            })
    };
};

