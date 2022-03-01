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

    async setTempomatModeAsync(userId: number, courseId: number, tempomatMode: TempomatModeType) {

        const bridge = await this._userCourseBridgeService
            .getOrFailAsync({
                courseId,
                userId
            });

        await this._userCourseBridgeService
            .updateAsync({
                id: bridge.id,
                tempomatMode
            });
    }

    async getTempomatModeAsync(userId: number, courseId: number) {

        const bridge = await this._userCourseBridgeService
            .getOrFailAsync({
                courseId,
                userId
            });

        return bridge.tempomatMode;
    }

    async evaluateUserProgressesAsync() {

        console.log("Evaluating user progresses...");
    }
}