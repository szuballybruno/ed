import { UserDailyProgressView } from "../models/views/UserDailyProgressView";
import { UserDailyProgressDTO } from "../shared/dtos/UserDailyProgressDTO";
import { MapperService } from "./MapperService";
import { ServiceBase } from "./misc/ServiceBase";
import { ORMConnectionService } from "./sqlServices/ORMConnectionService";

export class UserProgressService extends ServiceBase {

    constructor(mapperService: MapperService, ormservice: ORMConnectionService) {

        super(mapperService, ormservice);
    }

    async getProgressChartDataAsync(userId: number) {

        const courseId = 4;

        const views = await this._ormService
            .getRepository(UserDailyProgressView)
            .createQueryBuilder("udpv")
            .where("udpv.userId = :userId", { userId })
            .andWhere("udpv.courseId = :courseId", { courseId })
            .getMany();

        return this._mapperService
            .mapMany(UserDailyProgressView, UserDailyProgressDTO, views);
    }
}