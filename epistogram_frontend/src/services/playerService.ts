import { useReactQuery } from "../frontendHelpers";
import { GetPlayerDataDTO } from "../models/shared_models/GetPlayerDataDTO";
import { PlayerDataDTO } from "../models/shared_models/PlayerDataDTO";
import { CourseItemType } from "../models/shared_models/types/sharedTypes";
import { httpPostAsync } from "./httpClient";

export const usePlayerData = (courseItemId: number, courseItemType: CourseItemType) => {

    const dto = {
        courseItemId: courseItemId,
        courseItemType: courseItemType
    } as GetPlayerDataDTO;

    const qr = useReactQuery<PlayerDataDTO>(
        ["getPlayerData"],
        () => httpPostAsync(`player/get-player-data`, dto));

    return {
        playerData: qr.data,
        playerDataStatus: qr.status,
        playerDataError: qr.error,
        refetchPlayerData: qr.refetch
    }
}