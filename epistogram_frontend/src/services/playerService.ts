import { useReactQuery } from "../frontendHelpers";
import { PlayerDataDTO } from "../models/shared_models/PlayerDataDTO";
import { httpPostAsync } from "./httpClient";

export const usePlayerData = (descriptorCode: string) => {

    const qr = useReactQuery<PlayerDataDTO>(
        ["getPlayerData", descriptorCode],
        () => httpPostAsync(`player/get-player-data?descriptorCode=${descriptorCode}`));

    return {
        playerData: qr.data,
        playerDataStatus: qr.status,
        playerDataError: qr.error,
        refetchPlayerData: qr.refetch
    }
}