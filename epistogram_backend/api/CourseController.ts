import { UploadedFile } from "express-fileupload";
import { CourseContentEditDataDTO } from "../models/shared_models/CourseContentEditDataDTO";
import { CourseDetailsEditDataDTO as CourseDetailsEditDataDTO } from "../models/shared_models/CourseDetailsEditDataDTO";
import { CreateCourseDTO } from "../models/shared_models/CreateCourseDTO";
import { IdResultDTO } from "../models/shared_models/IdResultDTO";
import { CourseModeType } from "../models/shared_models/types/sharedTypes";
import { CourseService } from "../services/CourseService";
import { ActionParams, withValueOrBadRequest } from "../utilities/helpers";

export class CourseController {

    private _courseService: CourseService;

    constructor(courseService: CourseService) {

        this._courseService = courseService;
    }

    startCourseAction = async (params: ActionParams) => {

        const courseId = withValueOrBadRequest<IdResultDTO>(params.req.body).id;

        return this._courseService.startCourseAsync(params.userId, courseId);
    };

    getAvailableCoursesAction = async (params: ActionParams) => {

        return this._courseService.getAvailableCoursesAsync(params.userId);
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

        const courseId = withValueOrBadRequest<number>(params.req.query.courseId, "number");

        return await this._courseService.getCourseDetailsAsync(courseId);
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

        const file = withValueOrBadRequest<UploadedFile>(params.req.files?.file);
        const courseId = withValueOrBadRequest<number>(params.req.body.courseId, "number");

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

        const courseId = withValueOrBadRequest<number>(params.req.query.courseId, "number");
        const modeType = withValueOrBadRequest<CourseModeType>(params.req.query.mode);

        return this._courseService.setCourseTypeAsync(params.userId, courseId, modeType);
    };

    getCourseProgressShortAction = async (params: ActionParams) => {

        return this._courseService.getCourseProgressShortAsync(params.userId);
    }

    getCourseProgressDataAction = async (params: ActionParams) => {

        return this._courseService.getCourseProgressDataAsync(params.userId);
    };
}