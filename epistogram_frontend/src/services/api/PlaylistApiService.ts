import { PlaylistItemDTO } from '../../shared/dtos/PlaylistItemDTO';
import { apiRoutes } from '../../shared/types/apiRoutes';
import { useReactQuery2 } from '../../static/frontendHelpers';

export const PlaylistApiService = {

    usePlaylistData: (descriptorCode: string, isEnabled: boolean) => {

        const qr = useReactQuery2<PlaylistItemDTO[]>(apiRoutes.playlist.getPlaylist, { descriptorCode }, isEnabled);

        return {
            courseItemList: qr.data as PlaylistItemDTO[] ?? [],
            courseItemListStatus: qr.state,
            courseItemListError: qr.error,
            refetchCourseItemList: qr.refetch
        };
    }
};