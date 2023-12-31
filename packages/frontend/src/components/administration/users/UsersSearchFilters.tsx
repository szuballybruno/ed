import { EpistoFlex2 } from '../../controls/EpistoFlex';
import { EpistoSearch } from '../../controls/EpistoSearch';

export const UsersSearchFilters = ({
    setSearchKeyword
}: {
    setSearchKeyword: (keyword: string) => void,
}) => {

    return <EpistoFlex2
        maxWidth="500px"
        flex='1'>

        {/* keyword search */}
        <EpistoSearch
            onKeywordChanged={setSearchKeyword} />
    </EpistoFlex2>;
};