import { ExamVersion } from "../models/entity/exam/ExamVersion";
import { VideoVersion } from "../models/entity/video/VideoVersion";
import { CourseItemService } from "../services/CourseItemService";
import { apiRoutes } from "../shared/types/apiRoutes";
import { Id } from "../shared/types/versionId";
import { ServiceProvider } from "../startup/servicesDI";
import { ActionParams } from "../utilities/ActionParams";
import { XControllerAction } from "../utilities/XTurboExpress/XTurboExpressDecorators";

export class CourseItemController {

    private _courseItemService: CourseItemService;

    constructor(serviceProvider: ServiceProvider) {

        this._courseItemService = serviceProvider.getService(CourseItemService);
    }

    @XControllerAction(apiRoutes.courseItem.getCourseItemEditData)
    getCourseItemEditDataAction = async (params: ActionParams) => {

        const bod = params
            .getQuery();

        const videoVersionId = Id
            .create<'VideoVersion'>(bod
                .getValueOrNull(x => x.videoVersionId, 'int'))

        const examVersionId = Id
            .create<'ExamVersion'>(bod
                .getValueOrNull(x => x.examVersionId, 'int'))

        return this._courseItemService
            .getCourseItemEditDataAsync(videoVersionId, examVersionId);
    }
}