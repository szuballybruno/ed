import { CourseService } from '../services/CourseService';
import { UserCourseBridgeService } from '../services/UserCourseBridgeService';
import { CourseContentItemAdminDTO } from '../shared/dtos/admin/CourseContentItemAdminDTO';
import { CourseDetailsEditDataDTO } from '../shared/dtos/CourseDetailsEditDataDTO';
import { CreateCourseDTO } from '../shared/dtos/CreateCourseDTO';
import { ModuleEditDTO } from '../shared/dtos/ModuleEditDTO';
import { Mutation } from '../shared/dtos/mutations/Mutation';
import { apiRoutes } from '../shared/types/apiRoutes';
import { CourseModeType } from '../shared/types/sharedTypes';
import { Id } from '../shared/types/versionId';
import { ServiceProvider } from '../startup/servicesDI';
import { ActionParams } from '../utilities/XTurboExpress/ActionParams';
import { XControllerAction } from '../utilities/XTurboExpress/XTurboExpressDecorators';
import { XController } from '../utilities/XTurboExpress/XTurboExpressTypes';

export class CourseController implements XController<CourseController> {

    private _courseService: CourseService;
    private _userCourseBridgeService: UserCourseBridgeService;

    constructor(serviceProvider: ServiceProvider) {

        this._courseService = serviceProvider.getService(CourseService);
        this._userCourseBridgeService = serviceProvider.getService(UserCourseBridgeService);
    }

    @XControllerAction(apiRoutes.course.getPermissionAssignCourses)
    getPermissionAssignCoursesAction = (parmas: ActionParams) => {

        const userId = Id.create<'User'>(parmas
            .getQuery()
            .getValue(x => x.userId, 'int'));

        return this._courseService
            .getPermissionAssignCoursesAsync(parmas.principalId, userId);
    };

    @XControllerAction(apiRoutes.course.getAvailableCourses)
    getAvailableCoursesAction = (params: ActionParams) => {

        const query = params
            .getQuery();

        const searchTerm: string = query.data.searchTerm || '';
        const filterCategoryId = query.getValueOrNull(x => x.filterCategoryId, 'int');
        const isFeatured = query.getValueOrNull(x => x.isFeatured, 'boolean');
        const isRecommended = query.getValueOrNull(x => x.isRecommended, 'boolean');
        const orderBy = query.getValueOrNull(x => x.orderBy, 'string');

        return this._courseService
            .getAvailableCoursesAsync(params.principalId, searchTerm, filterCategoryId, isFeatured, isRecommended, orderBy);
    };

    @XControllerAction(apiRoutes.course.getCourseDetailsEditData)
    async getCourseDetailsEditDataAction(params: ActionParams) {

        const courseId = params
            .getQuery()
            .getValue(x => x.courseId, 'int');

        return this._courseService
            .getCourseDetailsEditDataAsync(params.principalId, courseId);
    }

    @XControllerAction(apiRoutes.course.getCourseContentEditData)
    getCourseContentEditDataAction = (params: ActionParams) => {

        const query = params
            .getQuery();

        const courseId = Id
            .create<'Course'>(query
                .getValue(x => x.courseId, 'int'));

        return this._courseService
            .getCourseContentAdminDataAsync(
                params.principalId,
                courseId,
                query.getValue(x => x.loadDeleted, 'boolean'));
    };

    @XControllerAction(apiRoutes.course.getAdminCourseList)
    getAdminCourseListAction = (params: ActionParams) => {

        return this._courseService
            .getAdminCoursesAsync(params.principalId);
    };

    @XControllerAction(apiRoutes.course.getCourseBriefData)
    getCourseBriefDataAction = (params: ActionParams) => {

        const courseId = Id.create<'Course'>(params
            .getQuery()
            .getValue(x => x.courseId, 'int'));

        return this._courseService
            .getCourseBriefDataAsync(params.principalId, courseId);
    };

    @XControllerAction(apiRoutes.course.getCourseDetails)
    getCourseDetailsAction = (params: ActionParams) => {

        const courseId = Id.create<'Course'>(params
            .getQuery()
            .getValue(x => x.courseId, 'int'));

        return this._courseService
            .getCourseDetailsAsync(params.principalId, courseId);
    };

    @XControllerAction(apiRoutes.course.saveCourseDetails, { isPost: true })
    saveCourseDetailsAction = (params: ActionParams) => {

        const dto = params
            .getBody<CourseDetailsEditDataDTO>().data;

        return this._courseService
            .saveCourseDetailsAsync(
                params.principalId,
                dto
            );
    };

    @XControllerAction(apiRoutes.course.saveCourseContent, { isPost: true })
    saveCourseContentAction = (params: ActionParams) => {

        const bod = params
            .getBody();

        const itemMutations = bod
            .getValue<Mutation<CourseContentItemAdminDTO, 'versionCode'>>(x => x.itemMutations, 'any[]');

        const moduleMutations = bod
            .getValue<Mutation<ModuleEditDTO, 'versionId'>>(x => x.moduleMutations, 'any[]');

        const courseId = Id.create<'Course'>(bod
            .getValue(x => x.courseId, 'int'));

        return this._courseService
            .saveCourseContentAsync(
                params.principalId,
                courseId,
                itemMutations,
                moduleMutations
            );
    };

    @XControllerAction(apiRoutes.course.saveCourseThumbnail, { isPost: true, isMultipart: true })
    saveCourseThumbnailAction = (params: ActionParams) => {

        const file = params
            .getSingleFileOrFail();

        const courseId = Id
            .create<'Course'>(params
                .getBody<{ courseId: number }>()
                .getValue(x => x.courseId, 'int'));

        return this._courseService
            .saveCourseThumbnailAsync(
                params.principalId,
                file,
                courseId
            );
    };

    @XControllerAction(apiRoutes.course.deleteCourse, { isPost: true })
    deleteCourseAction = (params: ActionParams) => {

        const courseId = Id
            .create<'Course'>(params
                .getBody<any>()
                .getValue(x => x.id, 'int'));

        return this._courseService
            .softDeleteCourseAsync(params.principalId, courseId);
    };

    @XControllerAction(apiRoutes.course.createCourse, { isPost: true })
    createCourseAction = (params: ActionParams) => {

        return this._courseService
            .createCourseAsync(
                params.principalId,
                params.getBody<CreateCourseDTO>().data
            );
    };

    @XControllerAction(apiRoutes.course.setCourseMode, { isPost: true })
    setCourseModeAction = (params: ActionParams) => {

        const dto = params
            .getBody<{ courseId: number, mode: CourseModeType }>();

        const courseId = Id
            .create<'Course'>(dto.getValue(x => x.courseId, 'int'));

        const courseMode = dto.getValue(x => x.mode, 'custom', value => value === 'advanced' || value === 'beginner');

        return this
            ._userCourseBridgeService
            .setCourseModeAsync(
                params.principalId,
                courseId,
                courseMode
            );
    };

    @XControllerAction(apiRoutes.course.getAvailableCourseCategories)
    getAvailableCourseCategoriesAction = (params: ActionParams) => {

        return this
            ._courseService
            .getAvailableCourseCategoriesAsync(params.principalId);
    };
}