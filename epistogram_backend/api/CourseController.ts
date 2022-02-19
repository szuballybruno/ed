import { UploadedFile } from "express-fileupload";
import { CourseContentEditDataDTO } from "../sharedd/dtos/CourseContentEditDataDTO";
import { CourseDetailsEditDataDTO as CourseDetailsEditDataDTO } from "../sharedd/dtos/CourseDetailsEditDataDTO";
import { CreateCourseDTO } from "../sharedd/dtos/CreateCourseDTO";
import { IdResultDTO } from "../sharedd/dtos/IdResultDTO";
import { CourseModeType } from "../sharedd/types/sharedTypes";
import { CourseService } from "../services/CourseService";
import { ActionParams, withValueOrBadRequest } from "../utilities/helpers";

export class CourseController {

    private _courseService: CourseService;

    constructor(courseService: CourseService) {

        this._courseService = courseService;
    }

    getAvailableCoursesAction = async (params: ActionParams) => {

        return this._courseService.getAvailableCoursesAsync(params.currentUserId);
    };

    getCourseDetailsEditDataAction = async (params: ActionParams) => {

        const courseId = withValueOrBadRequest<number>(params.req?.query?.courseId, "number");

        return await this._courseService.getCourseDetailsEditDataAsync(courseId);
    };

    getCourseContentEditDataAction = async (params: ActionParams) => {

        const courseId = withValueOrBadRequest<number>(params.req?.query?.courseId, "number");

        return await this._courseService.getCourseContentEditDataAsync(courseId);
    };

    getAdminCourseListAction = (params: ActionParams) => {

        return this._courseService.getAdminCoursesAsync();
    }

    getCourseBriefDataAction = async (params: ActionParams) => {

        const courseId = withValueOrBadRequest<number>(params.req?.query?.courseId, "number");

        return await this._courseService
            .getCourseBriefDataAsync(courseId);
    };

    getCourseDetailsAction = async (params: ActionParams) => {

        const courseId = params
            .getQuery<any>()
            .getValue(x => x.courseId, "int");

        return await this._courseService.getCourseDetailsAsync(params.currentUserId, courseId);
    }

    saveCourseDetailsAction = async (params: ActionParams) => {

        const dto = withValueOrBadRequest<CourseDetailsEditDataDTO>(params.req?.body);

        await this._courseService.saveCourseDetailsAsync(dto);
    };

    saveCourseContentAction = async (params: ActionParams) => {

        const dto = withValueOrBadRequest<CourseContentEditDataDTO>(params.req?.body);

        await this._courseService
            .saveCourseContentAsync(dto);
    };

    saveCourseThumbnailAction = async (params: ActionParams) => {

        const file = params
            .getSingleFileOrFail();

        const courseId = params
            .getBody<{ courseId: number }>()
            .getValue(x => x.courseId, "int");

        await this._courseService
            .saveCourseThumbnailAsync(file, courseId);
    }

    deleteCourseAction = async (params: ActionParams) => {

        const courseId = withValueOrBadRequest<IdResultDTO>(params.req.body).id;

        await this._courseService.deleteCourseAsync(courseId);
    }

    createCourseAction = async (params: ActionParams) => {

        const dto = withValueOrBadRequest<CreateCourseDTO>(params.req.body);

        await this._courseService
            .createCourseAsync(dto);
    }

    setCourseModeAction = async (params: ActionParams) => {

        const dto = params
            .getBody<{ courseId: number, mode: CourseModeType }>();

        const courseId = dto.getValue(x => x.courseId);
        const courseMode = dto.getValue(x => x.mode, value => value === "advanced" || value === "beginner");

        return this._courseService
            .setCourseModeAsync(params.currentUserId, courseId, courseMode);
    };

    getCourseProgressShortAction = async (params: ActionParams) => {

        return this._courseService.getCourseProgressShortAsync(params.currentUserId);
    }

    getCourseProgressDataAction = async (params: ActionParams) => {

        return this._courseService.getCourseProgressDataAsync(params.currentUserId);
    };
}