import { CourseItemEditView } from '../models/views/CourseItemEditView';
import { CourseItemEditDTO } from '../shared/dtos/CourseItemEditDTO';
import { MapperService } from './MapperService';
import { ORMConnectionService } from './ORMConnectionService/ORMConnectionService';

export class CourseItemService {

    private _ormService: ORMConnectionService;
    private _mapperService: MapperService;

    constructor(ormService: ORMConnectionService, mapperService: MapperService) {

        this._ormService = ormService;
        this._mapperService = mapperService;
    }

    /**
     * Returns the edit data for a course item (video / exam),
     * contains questions, answers as well,
     * this is not meat to be used to edit the title,
     * subtitle etc fields of the item,
     * just the questions & answers  
     */
    async getCourseItemEditDataAsync(videoVersionId: number | null, examVersionId: number | null) {

        const views = await this._ormService
            .query(CourseItemEditView, { videoVersionId, examVersionId })
            .where('examVersionId', '=', 'examVersionId')
            .and('videoVersionId', '=', 'videoVersionId')
            .getMany();

        return this._mapperService
            .mapTo(CourseItemEditDTO, [views]);
    }
}