import { CourseService } from '../services/CourseService';
import { UserCourseBridgeService } from '../services/UserCourseBridgeService';
import { CourseDetailsEditDataDTO } from '../shared/dtos/CourseDetailsEditDataDTO';
import { CreateCourseDTO } from '../shared/dtos/CreateCourseDTO';
import { IdResultDTO } from '../shared/dtos/IdResultDTO';
import { CourseModeType } from '../shared/types/sharedTypes';
import { ActionParams } from '../utilities/helpers';

export class CourseController {

    private _courseService: CourseService;
    private _userCourseBridgeService: UserCourseBridgeService;

    constructor(courseService: CourseService, userCourseBridgeService: UserCourseBridgeService) {

        this._courseService = courseService;
        this._userCourseBridgeService = userCourseBridgeService;
    }

    getAvailableCoursesAction = async (params: ActionParams) => {

        return this._courseService
            .getAvailableCoursesAsync(params.currentUserId);
    };

    getCourseDetailsEditDataAction = async (params: ActionParams) => {

        return await this._courseService
            .getCourseDetailsEditDataAsync(params
                .getQuery()
                .getValue(x => x.courseId, 'int'));
    };

    getCourseContentEditDataAction = async (params: ActionParams) => {

        const query = params
            .getQuery();

        return await this._courseService
            .getCourseContentAdminDataAsync(
                query.getValue(x => x.courseId, 'int'),
                query.getValue(x => x.loadDeleted, 'boolean'));
    };

    getAdminCourseListAction = (params: ActionParams) => {

        return this._courseService.getAdminCoursesAsync();
    };

    getCourseBriefDataAction = async (params: ActionParams) => {

        return await this._courseService
            .getCourseBriefDataAsync(params
                .getQuery()
                .getValue(x => x.courseId, 'int'));
    };

    getCourseDetailsAction = async (params: ActionParams) => {

        const courseId = params
            .getQuery<any>()
            .getValue(x => x.courseId, 'int');

        return await this._courseService.getCourseDetailsAsync(params.currentUserId, courseId);
    };

    saveCourseDetailsAction = async (params: ActionParams) => {

        await this._courseService
            .saveCourseDetailsAsync(params
                .getBody<CourseDetailsEditDataDTO>().data);
    };

    saveCourseContentAction = async (params: ActionParams) => {

        const mutations = params
            .getBody()
            .data;

        await this._courseService
            .saveCourseContentAsync(mutations);
    };

    saveCourseThumbnailAction = async (params: ActionParams) => {

        const file = params
            .getSingleFileOrFail();

        const courseId = params
            .getBody<{ courseId: number }>()
            .getValue(x => x.courseId, 'int');

        await this._courseService
            .saveCourseThumbnailAsync(file, courseId);
    };

    deleteCourseAction = async (params: ActionParams) => {

        await this._courseService.softDeleteCourseAsync(params
            .getBody<IdResultDTO>()
            .getValue(x => x.id, 'int'));
    };

    createCourseAction = async (params: ActionParams) => {

        await this._courseService
            .createCourseAsync(params.getBody<CreateCourseDTO>().data);
    };

    setCourseModeAction = async (params: ActionParams) => {

        const dto = params
            .getBody<{ courseId: number, mode: CourseModeType }>();

        const courseId = dto.getValue(x => x.courseId, 'int');
        const courseMode = dto.getValue(x => x.mode, 'custom', value => value === 'advanced' || value === 'beginner');

        return this._userCourseBridgeService
            .setCourseModeAsync(params.currentUserId, courseId, courseMode);
    };

    getCourseProgressShortAction = async (params: ActionParams) => {

        return this._courseService
            .getCourseProgressShortAsync(params.currentUserId);
    };

    getCourseProgressDataAction = async (params: ActionParams) => {

        return this._courseService
            .getCourseProgressDataAsync(params.currentUserId);
    };
}