import { PlaylistItemDTO } from '../../shared/dtos/PlaylistItemDTO';
import { apiRoutes } from '../../shared/types/apiRoutes';
import { QueryService } from '../../static/QueryService';

export const PlaylistApiService = {

    usePlaylistData: (descriptorCode: string, isEnabled: boolean) => {

        const qr = QueryService.useXQuery<PlaylistItemDTO[]>(apiRoutes.playlist.getPlaylist, { descriptorCode }, isEnabled);

        return {
            courseItemList: qr.data as PlaylistItemDTO[] ?? [],
            courseItemListStatus: qr.state,
            courseItemListError: qr.error,
            refetchCourseItemList: qr.refetch
        };
    }
};