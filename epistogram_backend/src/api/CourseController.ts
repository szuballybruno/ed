import { UploadedFile } from 'express-fileupload';
import { CourseContentEditDataDTO } from '../shared/dtos/CourseContentEditDataDTO';
import { CourseDetailsEditDataDTO as CourseDetailsEditDataDTO } from '../shared/dtos/CourseDetailsEditDataDTO';
import { CreateCourseDTO } from '../shared/dtos/CreateCourseDTO';
import { IdResultDTO } from '../shared/dtos/IdResultDTO';
import { CourseModeType } from '../shared/types/sharedTypes';
import { CourseService } from '../services/CourseService';
import { ActionParams, withValueOrBadRequest } from '../utilities/helpers';
import { UserCourseBridgeService } from '../services/UserCourseBridgeService';

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

        const courseId = withValueOrBadRequest<number>(params.req?.query?.courseId, 'number');

        return await this._courseService.getCourseDetailsEditDataAsync(courseId);
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

        const courseId = withValueOrBadRequest<number>(params.req?.query?.courseId, 'number');

        return await this._courseService
            .getCourseBriefDataAsync(courseId);
    };

    getCourseDetailsAction = async (params: ActionParams) => {

        const courseId = params
            .getQuery<any>()
            .getValue(x => x.courseId, 'int');

        return await this._courseService.getCourseDetailsAsync(params.currentUserId, courseId);
    };

    saveCourseDetailsAction = async (params: ActionParams) => {

        const dto = withValueOrBadRequest<CourseDetailsEditDataDTO>(params.req?.body);

        await this._courseService.saveCourseDetailsAsync(dto);
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

        const courseId = withValueOrBadRequest<IdResultDTO>(params.req.body).id;

        await this._courseService.deleteCourseAsync(courseId);
    };

    createCourseAction = async (params: ActionParams) => {

        const dto = withValueOrBadRequest<CreateCourseDTO>(params.req.body);

        await this._courseService
            .createCourseAsync(dto);
    };

    setCourseModeAction = async (params: ActionParams) => {

        const dto = params
            .getBody<{ courseId: number, mode: CourseModeType }>();

        const courseId = dto.getValue(x => x.courseId);
        const courseMode = dto.getValue(x => x.mode, value => value === 'advanced' || value === 'beginner');

        return this._userCourseBridgeService
            .setCourseModeAsync(params.currentUserId, courseId, courseMode);
    };

    getCourseProgressShortAction = async (params: ActionParams) => {

        return this._courseService.getCourseProgressShortAsync(params.currentUserId);
    };

    getCourseProgressDataAction = async (params: ActionParams) => {

        return this._courseService.getCourseProgressDataAsync(params.currentUserId);
    };
}