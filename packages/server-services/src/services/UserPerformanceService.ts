import { MapperService } from './MapperService';
import { ORMConnectionService } from './ORMConnectionService';
import { TempomatService } from './TempomatService';

export class UserPerformanceService {

    constructor(
        private _ormService: ORMConnectionService,
        private _mapperService: MapperService,
        private _tempomatService: TempomatService) {
    }
}
