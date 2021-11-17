import { UserStatsDTO } from "../models/shared_models/UserStatsDTO";
import { UserStatsView } from "../models/views/UserStatsView";
import { DatabaseConnectionService } from "./databaseConnectionService";
import { MapperService } from "./mapperService";

export class UserStatsService {

    private _connection: DatabaseConnectionService;
    private _mapperService: MapperService;

    constructor(connection: DatabaseConnectionService, mapperSvc: MapperService) {

        this._connection = connection;
        this._mapperService = mapperSvc;
    }

    async getUserStatsAsync(userId: number) {

        const stats = await this._connection
            .getRepository(UserStatsView)
            .createQueryBuilder("usv")
            .where('"usv"."userId" = :userId', { userId })
            .getOneOrFail();

        return this._mapperService
            .useMapperFunction(UserStatsView, UserStatsDTO, stats);
    }
}