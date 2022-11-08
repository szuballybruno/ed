import { PlaylistItemDTO } from '@episto/communication';
import { apiRoutes } from '@episto/communication';
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