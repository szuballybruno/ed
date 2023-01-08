import { AdminCourseCarouselDataDTO } from '@episto/communication';
import { Id, PrincipalId } from '@thinkhub/x-core';
import { AdminCourseCarouselDataView } from '../models/views/AdminCourseCarouselDataView';
import { CompanyService } from './CompanyService';
import { MapperService } from './MapperService';
import { ORMConnectionService } from './ORMConnectionService';

/**
 * This service exists to provide
 * admin level statistics. Do not confuse it with user level/scoped stats, 
 * these stats are never about a single user, 
 * rather about all users in a company, or all users on a course.   
 */
export class AdminStatsService {

    constructor(
        private _ormService: ORMConnectionService,
        private _mapperSvc: MapperService) {
    }

    async getCourseStatsCarouselDataAsync(principalId: PrincipalId, companyId: Id<'Company'>) {

        const views = await this._ormService
            .query(AdminCourseCarouselDataView, { principalId, companyId })
            .where('userId', '=', 'principalId')
            .and('companyId', '=', 'companyId')
            .getMany();

        return this
            ._mapperSvc
            .mapTo(AdminCourseCarouselDataDTO, [views]);
    }
}
