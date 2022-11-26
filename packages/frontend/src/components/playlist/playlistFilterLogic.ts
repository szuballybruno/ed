import { normalizeToEnglishLowercase } from '@episto/commonlogic';
import { PlaylistModuleDTO } from '@episto/communication';
import { useMemo, useState } from 'react';

export const usePlaylistFilterLogic = (playlist: PlaylistModuleDTO[]) => {

    const [playlistFilters, setPlaylistFilters] = useState({
        keyword: ''
    });

    const playlistFiltered = useMemo(() => {

        // if no filters are present, 
        // return whole list
        if (!playlistFilters)
            return playlist;

        const filterKeyword = normalizeToEnglishLowercase(playlistFilters
            .keyword);

        return playlist
            .map(playlistModule => {

                // if no keyword filters are present, 
                // return module 
                if (!filterKeyword)
                    return playlistModule;

                // filter module via keyword
                const { items: moduleItems, moduleName } = playlistModule;

                const foundInModuleTitle = normalizeToEnglishLowercase(moduleName)
                    .includes(filterKeyword);

                return {
                    ...playlistModule,
                    items: foundInModuleTitle
                        ? moduleItems
                        : moduleItems
                            .filter(({ title, subTitle, videoAudioText }) => normalizeToEnglishLowercase(title)
                                .includes(filterKeyword) || normalizeToEnglishLowercase(subTitle)
                                    .includes(filterKeyword) || normalizeToEnglishLowercase(videoAudioText ?? '')
                                        .includes(filterKeyword))
                } as PlaylistModuleDTO;
            })
            .filter(x => x.items.length > 0);
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