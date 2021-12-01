import { UserStatsDTO } from "../models/shared_models/UserStatsDTO";
import { UserStatsView } from "../models/views/UserStatsView";
import { DbConnectionService } from "./sqlServices/DatabaseConnectionService";
import { MapperService } from "./mapperService";

export class UserStatsService {

    private _connection: DbConnectionService;
    private _mapperService: MapperService;

    constructor(connection: DbConnectionService, mapperSvc: MapperService) {

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
            .useMapperFunction(UserStatsView, UserStatsDTO, stats);
    }
}