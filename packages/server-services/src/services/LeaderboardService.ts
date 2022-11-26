import { LeaderboardPeriodType, LeaderboardScopeType } from "@episto/commontypes";
import { LeaderboardListItemDTO } from "@episto/communication";
import { PrincipalId } from "@episto/x-core";
import { LeaderboardView } from "../models/views/LeaderboardView";
import { CompanyService } from "./CompanyService";
import { MapperService } from "./MapperService";
import { ORMConnectionService } from "./ORMConnectionService/ORMConnectionService";

const LIST_LENGTH = 10;

export class LeaderboardService {

    constructor(
        private _ormService: ORMConnectionService,
        private _companyService: CompanyService,
        private _mapper: MapperService) {

    }

    async getLeaderboardListAsync(
        principalId: PrincipalId,
        period: LeaderboardPeriodType,
        scope: LeaderboardScopeType) {

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

        const clamped = scope === 'competitive'
            ? this._getMidpointClamped({ userIndex, rows })
            : this._getTopTenList({ userIndex, rows });

        const mapped = this
            ._mapper
            .mapTo(LeaderboardListItemDTO, [clamped, period]);

        return mapped;
    }

    private _getTopTenList({ rows, userIndex }: { userIndex: number, rows: LeaderboardView[] }) {

        const filtered = rows
            .filter((_, i) => i < LIST_LENGTH);

        if (userIndex >= 10)
            filtered[9] = rows[userIndex];

        return filtered;
    }

    private _getMidpointClamped({ rows, userIndex }: { userIndex: number, rows: LeaderboardView[] }) {

        const threshold = LIST_LENGTH / 2;

        const midpointClamp = (index: number, maxValue: number, range: number) => {

            const endCorrection = Math.max(0, index + range - maxValue);
            const startCorrection = Math.abs(Math.min(0, index - range));
            const midpoint = index - endCorrection + startCorrection;
            const startIndex = midpoint - range;
            const endIndex = midpoint + range;

            return { midpoint, startIndex, endIndex };
        }

        const endIndexThreshold = rows.length - 1;
        const { endIndex, startIndex } = midpointClamp(userIndex, endIndexThreshold, threshold);

        const clamped = rows
            .filter((_, i) => i >= startIndex && i < endIndex);

        return clamped;
    }
}