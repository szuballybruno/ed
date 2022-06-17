import { CourseItemService } from "../services/CourseItemService";
import { apiRoutes } from "../shared/types/apiRoutes";
import { ActionParams } from "../utilities/ActionParams";
import { XControllerAction } from "../utilities/XTurboExpress/XTurboExpressDecorators";

export class CourseItemController {

    constructor(private _courseItemService: CourseItemService) {

    }

    @XControllerAction(apiRoutes.courseItem.getCourseItemEditData)
    getCourseItemEditDataAction = async (params: ActionParams) => {

        const bod = params
            .getBody();

        const videoVersionId = bod
            .getValueOrNull(x => x.videoVersionId, 'int')

        const examVersionId = bod
            .getValueOrNull(x => x.examVersionId, 'int')

        return this._courseItemService
            .getCourseItemEditDataAsync(videoVersionId, examVersionId);
    }
}