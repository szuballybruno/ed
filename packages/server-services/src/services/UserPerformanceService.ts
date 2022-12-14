import { Id } from '@episto/x-core';
import { TempomatCalculationDataModel } from '../models/TempomatCalculationDataModel';
import { TempomatCalculationDataView } from '../models/views/TempomatCalculationDataView';
import { MapperService } from './MapperService';
import { ORMConnectionService } from './ORMConnectionService/ORMConnectionService';
import { TempomatService } from './TempomatService';

export class UserPerformanceService {

    constructor(
        private _ormService: ORMConnectionService,
        private _mapperService: MapperService,
        private _tempomatService: TempomatService) {
    }
}