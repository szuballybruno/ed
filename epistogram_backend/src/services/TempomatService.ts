import { TempomatModeType } from "../shared/types/sharedTypes";
import { MapperService } from "./MapperService";
import { ServiceBase } from "./misc/ServiceBase";
import { ORMConnectionService } from "./sqlServices/ORMConnectionService";
import { UserCourseBridgeService } from "./UserCourseBridgeService";

export class TempomatService extends ServiceBase {

    private _userCourseBridgeService: UserCourseBridgeService;

    constructor(
        ormService: ORMConnectionService,
        mapperService: MapperService,
        courseBridgeServie: UserCourseBridgeService) {

        super(mapperService, ormService);

        this._userCourseBridgeService = courseBridgeServie;
    }

    async setTempomatMode(userId: number, courseId: number, tempomatMode: TempomatModeType) {

        await this._userCourseBridgeService
            .updateAsync({
                courseId,
                userId,
                tempomatMode
            });
    }

    async getTempomatMode(userId: number, courseId: number) {

        const bridge = await this._userCourseBridgeService
            .getOrFailAsync({
                courseId,
                userId
            });

        return bridge.tempomatMode;
    }
}