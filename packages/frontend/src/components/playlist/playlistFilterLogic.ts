import { PlaylistModuleDTO } from '@episto/communication';
import { useMemo, useState } from 'react';

export const usePlaylistFilterLogic = (playlist: PlaylistModuleDTO[]) => {

    const [playlistFilters, setPlaylistFilters] = useState({
        keyword: ''
    });

    const normalizeToClosestEnglishWord = (str: string) => {

        return str
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '');
    };

    const normalize = (str: string) => {

        return normalizeToClosestEnglishWord(str
            .toLowerCase());
    };

    const playlistFiltered = useMemo(() => {

        // if no filters are present, 
        // return whole list
        if (!playlistFilters)
            return playlist;

        const filterKeyword = normalize(playlistFilters
            .keyword);

        return playlist
            .map(playlistModule => {

                // if no keyword filters are present, 
                // return module 
                if (!filterKeyword)
                    return playlistModule;

                // filter module via keyword
                const { items: moduleItems, moduleName } = playlistModule;

                const foundInModuleTitle = normalize(moduleName)
                    .includes(filterKeyword);

                return {
                    ...playlistModule,
                    items: foundInModuleTitle
                        ? moduleItems
                        : moduleItems
                            .filter(({ title, subTitle, videoAudioText }) => normalize(title)
                                .includes(filterKeyword) || normalize(subTitle)
                                    .includes(filterKeyword) || normalize(videoAudioText ?? '')
                                        .includes(filterKeyword))
                } as PlaylistModuleDTO;
            })
            .filter(x => x.items.any());
    }, [playlist, playlistFilters]);

    const setFilterKeyword = (kv: string) => {

        setPlaylistFilters({
            ...playlistFilters,
            keyword: kv
        });
    };

    return {
        playlistFilters,
        playlistFiltered,
        setPlaylistFilters,
        setFilterKeyword,
    };
};

export type PlaylistFilterLogicType = ReturnType<typeof usePlaylistFilterLogic>;