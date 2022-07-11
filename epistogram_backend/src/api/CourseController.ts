import { Course } from '../models/entity/course/Course';
import { User } from '../models/entity/User';
import { CourseService } from '../services/CourseService';
import { UserCourseBridgeService } from '../services/UserCourseBridgeService';
import { CourseContentItemAdminDTO } from '../shared/dtos/admin/CourseContentItemAdminDTO';
import { CourseDetailsEditDataDTO } from '../shared/dtos/CourseDetailsEditDataDTO';
import { CreateCourseDTO } from '../shared/dtos/CreateCourseDTO';
import { IdResultDTO } from '../shared/dtos/IdResultDTO';
import { Mutation } from '../shared/dtos/mutations/Mutation';
import { apiRoutes } from '../shared/types/apiRoutes';
import { CourseModeType } from '../shared/types/sharedTypes';
import { Id } from '../shared/types/versionId';
import { ServiceProvider } from '../startup/servicesDI';
import { ActionParams } from '../utilities/ActionParams';
import { XControllerAction } from '../utilities/XTurboExpress/XTurboExpressDecorators';

export class CourseController {

    private _courseService: CourseService;
    private _userCourseBridgeService: UserCourseBridgeService;

    constructor(serviceProvider: ServiceProvider) {

        this._courseService = serviceProvider.getService(CourseService);
        this._userCourseBridgeService = serviceProvider.getService(UserCourseBridgeService);
    }

    @XControllerAction(apiRoutes.course.getPermissionAssignCourses)
    getPermissionAssignCoursesAction = async (parmas: ActionParams) => {

        const userId = Id.create<User>(parmas
            .getQuery()
            .getValue(x => x.userId, 'int'))

        return this._courseService
            .getPermissionAssignCoursesAsync(parmas.principalId, userId);
    };

    @XControllerAction(apiRoutes.course.getAvailableCourses)
    getAvailableCoursesAction = async (params: ActionParams) => {

        const query = params
            .getQuery()

        console.log(query)

        const searchTerm: string = query.data.searchTerm || ''
        const filterCategoryId = query.getValueOrNull(x => x.filterCategoryId, 'int')
        const isFeatured = query.getValueOrNull(x => x.isFeatured, 'boolean')
        const isRecommended = query.getValueOrNull(x => x.isRecommended, 'boolean')
        const orderBy = query.getValueOrNull(x => x.orderBy, 'string')

        return this._courseService
            .getAvailableCoursesAsync(params.principalId, searchTerm, filterCategoryId, isFeatured, isRecommended, orderBy);
    };

    @XControllerAction(apiRoutes.course.getCourseDetailsEditData)
    getCourseDetailsEditDataAction = async (params: ActionParams) => {

        return await this._courseService
            .getCourseDetailsEditDataAsync(params
                .getQuery()
                .getValue(x => x.courseId, 'int'));
    };

    @XControllerAction(apiRoutes.course.getCourseContentEditData)
    getCourseContentEditDataAction = async (params: ActionParams) => {

        const query = params
            .getQuery();

        const courseId = Id
            .create<Course>(query
                .getValue(x => x.courseId, 'int'))

        return await this._courseService
            .getCourseContentAdminDataAsync(
                courseId,
                query.getValue(x => x.loadDeleted, 'boolean'));
    };

    @XControllerAction(apiRoutes.course.getAdminCourseList)
    getAdminCourseListAction = (params: ActionParams) => {

        return this._courseService.getAdminCoursesAsync();
    };

    @XControllerAction(apiRoutes.course.getCourseBriefData)
    getCourseBriefDataAction = async (params: ActionParams) => {

        const courseId = Id.create<Course>(params
            .getQuery()
            .getValue(x => x.courseId, 'int'))

        return await this._courseService
            .getCourseBriefDataAsync(courseId);
    };

    @XControllerAction(apiRoutes.course.getCourseDetails)
    getCourseDetailsAction = async (params: ActionParams) => {

        const courseId = Id.create<Course>(params
            .getQuery()
            .getValue(x => x.courseId, 'int'))

        return await this._courseService
            .getCourseDetailsAsync(params.principalId, courseId);
    };

    @XControllerAction(apiRoutes.course.saveCourseDetails, { isPost: true })
    saveCourseDetailsAction = async (params: ActionParams) => {

        await this._courseService
            .saveCourseDetailsAsync(params
                .getBody<CourseDetailsEditDataDTO>().data);
    };

    @XControllerAction(apiRoutes.course.saveCourseContent, { isPost: true })
    saveCourseContentAction = async (params: ActionParams) => {

        const bod = params
            .getBody();

        const mutations = bod
            .getValue<Mutation<CourseContentItemAdminDTO, 'versionCode'>>(x => x.mutations, 'any[]');

        const courseId = Id.create<Course>(bod
            .getValue(x => x.courseId, 'int'));

        await this._courseService
            .saveCourseContentAsync(courseId, mutations);
    };

    @XControllerAction(apiRoutes.course.saveCourseThumbnail, { isPost: true, isMultipart: true })
    saveCourseThumbnailAction = async (params: ActionParams) => {

        const file = params
            .getSingleFileOrFail();

        const courseId = Id
            .create<Course>(params
                .getBody<{ courseId: number }>()
                .getValue(x => x.courseId, 'int'));

        await this._courseService
            .saveCourseThumbnailAsync(file, courseId);
    };

    @XControllerAction(apiRoutes.course.deleteCourse, { isPost: true })
    deleteCourseAction = async (params: ActionParams) => {

        const courseId = Id
            .create<Course>(params
                .getBody<IdResultDTO>()
                .getValue(x => x.id, 'int'))

        await this._courseService.softDeleteCourseAsync(courseId);
    };

    @XControllerAction(apiRoutes.course.createCourse, { isPost: true })
    createCourseAction = async (params: ActionParams) => {

        await this._courseService
            .createCourseAsync(params.getBody<CreateCourseDTO>().data);
    };

    @XControllerAction(apiRoutes.course.setCourseMode, { isPost: true })
    setCourseModeAction = async (params: ActionParams) => {

        const dto = params
            .getBody<{ courseId: number, mode: CourseModeType }>();

        const courseId = Id
            .create<Course>(dto.getValue(x => x.courseId, 'int'));

        const courseMode = dto.getValue(x => x.mode, 'custom', value => value === 'advanced' || value === 'beginner');

        return this._userCourseBridgeService
            .setCourseModeAsync(params.principalId, courseId, courseMode);
    };

    @XControllerAction(apiRoutes.course.setRequiredCompletionDate, { isPost: true })
    setRequiredCompletionDate = async (params: ActionParams) => {

        const dto = params
            .getBody<{ courseId: number, requiredCourseCompletionDate: string }>();

        const courseId = Id
            .create<Course>(dto.getValue(x => x.courseId, 'int'));
        const requiredCourseCompletionDate = dto.getValue(x => x.requiredCourseCompletionDate, 'string');

        return this._userCourseBridgeService
            .setRequiredCompletionDateAsync(params.principalId, courseId, requiredCourseCompletionDate);
    };

    @XControllerAction(apiRoutes.course.getCourseProgressShort)
    getCourseProgressShortAction = async (params: ActionParams) => {

        return this._courseService
            .getCourseProgressShortAsync(params.principalId);
    };

    @XControllerAction(apiRoutes.course.getCourseProgressData)
    getCourseProgressDataAction = async (params: ActionParams) => {

        return this._courseService
            .getCourseProgressDataAsync(params.principalId);
    };
}