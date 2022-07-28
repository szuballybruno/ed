import { MapperService } from './MapperService';
import { ORMConnectionService } from './ORMConnectionService/ORMConnectionService';

export class CourseCompletionService {

    constructor(
        private _mapperService: MapperService,
        private _ormService: ORMConnectionService) {
    }


}