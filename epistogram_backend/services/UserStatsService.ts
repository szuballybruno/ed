import { UserStatsDTO } from "../models/shared_models/UserStatsDTO";
import { UserStatsView } from "../models/views/UserStatsView";
import { MapperService } from "./MapperService";
import { ORMConnectionService } from "./sqlServices/ORMConnectionService";

export class UserStatsService {

    private _connection: ORMConnectionService;
    private _mapperService: MapperService;

    constructor(connection: ORMConnectionService, mapperSvc: MapperService) {

        this._connection = connection;
        this._mapperService = mapperSvc;
    }

    async getUserStatsAsync(userId: number) {

        const stats = await this._connection
            .getRepository(UserStatsView)
            .createQueryBuilder("usv")
            .where('"usv"."user_id" = :userId', { userId })
            .getOneOrFail();

        return this._mapperService
            .map(UserStatsView, UserStatsDTO, stats);
    }
}