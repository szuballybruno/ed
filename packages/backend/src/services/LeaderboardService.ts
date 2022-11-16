import { LeaderboardPeriodType } from "@episto/commontypes";
import { LeaderboardListItemDTO } from "@episto/communication";
import { LeaderboardView } from "../models/views/LeaderboardView";
import { PrincipalId } from "../utilities/XTurboExpress/ActionParams";
import { CompanyService } from "./CompanyService";
import { MapperService } from "./MapperService";
import { ORMConnectionService } from "./ORMConnectionService/ORMConnectionService";

export class LeaderboardService {

    constructor(
        private _ormService: ORMConnectionService,
        private _companyService: CompanyService,
        private _mapper: MapperService) {

    }

    async getLeaderboardListAsync(principalId: PrincipalId, period: LeaderboardPeriodType) {

        const companyId = await this
            ._companyService
            .getPrincipalCompanyId(principalId);

        const orderColumn: keyof LeaderboardView = period === 'daily'
            ? 'rankDay'
            : period === 'weekly'
                ? 'rankWeek'
                : 'rankMonth';

        const rows = await this
            ._ormService
            .query(LeaderboardView, { companyId })
            .where('companyId', '=', 'companyId')
            .orderBy([orderColumn])
            .getMany();

        const userIndex = rows
            .findIndex(x => x.userId === principalId.getId());

        const midpointClamp = (index: number, maxValue: number, range: number) => {

            const endCorrection = Math.max(0, index + range - maxValue);
            const startCorrection = Math.abs(Math.min(0, index - 5));
            const midpoint = index - endCorrection + startCorrection;
            const startIndex = midpoint - range;
            const endIndex = midpoint + range;

            return { midpoint, startIndex, endIndex };
        }

        const { endIndex, startIndex } = midpointClamp(userIndex, rows.length, 5);

        const clamped = rows
            .splice(startIndex, endIndex);

        const mapped = this
            ._mapper
            .mapTo(LeaderboardListItemDTO, [clamped, period]);

        return mapped;
    }
}