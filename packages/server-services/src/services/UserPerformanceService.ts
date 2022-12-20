import { Id } from '@thinkhub/x-core';
import { TempomatDataModel } from '../models/misc/TempomatDataModel';
import { TempomatCalculationDataView } from '../models/views/TempomatCalculationDataView';
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
