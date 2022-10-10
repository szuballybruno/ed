import { Select } from '@mui/material';
import { OrderType } from '../../../shared/types/sharedTypes';
import { translatableTexts } from '../../../static/translatableTexts';
import { EpistoFlex2 } from '../../controls/EpistoFlex';
import { EpistoSearch } from '../../controls/EpistoSearch';

export const UsersSearchFilters = ({
    setOrderBy,
    hideOrdering
}: {
    setOrderBy: (order: OrderType | null) => void,
    hideOrdering: boolean
}) => {

    return <EpistoFlex2 flex='1'>

        {/* keyword search */}
        <EpistoSearch />

        {/* ordering */}
        {!hideOrdering && <Select
            native
            onChange={(e) => {
                setOrderBy(e.target.value as OrderType | null);
            }}
            className='roundBorders fontSmall mildShadow'
            inputProps={{
                name: 'A-Z',
                id: 'outlined-age-native-simple',
            }}
            sx={{
                '& .MuiOutlinedInput-notchedOutline': {
                    border: 'none'
                }
            }}
            style={{
                background: 'var(--transparentWhite70)',
                border: 'none',
                height: 50,
                color: '3F3F3F',
                minWidth: '100px',
                margin: '0 10px',
                flex: 1
            }}>
            <option value={'nameASC'}>{translatableTexts.availableCourses.sortOptions.aToZ}</option>
            <option value={'nameDESC'}>{translatableTexts.availableCourses.sortOptions.zToA}</option>
        </Select>}
    </EpistoFlex2>;
};