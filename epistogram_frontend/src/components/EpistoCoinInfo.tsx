import { FlexProps } from '@chakra-ui/layout';
import { useCoinBalance } from '../services/api/coinTransactionsApiService';
import { EpistoFlex2 } from './controls/EpistoFlex';
import { EpistoFont } from './controls/EpistoFont';
import { EpistoConinImage } from './universal/EpistoCoinImage';

export const EpistoConinInfo = (props: {} & FlexProps) => {

    const { coinBalance } = useCoinBalance();

    return <EpistoFlex2 align="center"
        {...props}>

        {/* coin value  */}
        <EpistoFont
            style={{ marginRight: '5px' }}
            fontSize="fontHuge">

            {coinBalance + '' || ''}
        </EpistoFont>

        {/* coin image */}
        <EpistoConinImage />
    </EpistoFlex2>;
};