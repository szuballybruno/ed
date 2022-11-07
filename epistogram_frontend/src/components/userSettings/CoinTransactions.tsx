import { useCoinTransactions } from '../../services/api/coinTransactionsApiService';
import { EpistoFlex2 } from '../controls/EpistoFlex';

export const CoinTransactions = () => {

    const { coinTransactions } = useCoinTransactions();

    return <EpistoFlex2 direction="column"
align="center">
        {coinTransactions
            .map((x, index) => <EpistoFlex2
                key={index}
                direction="column"
                align="center"
                my="10px">

                <EpistoFlex2
                    className="circle square50"
                    border="solid 2px gold"
                    align="center"
                    justify="center">
                    {x.amount}
                </EpistoFlex2>

                <EpistoFlex2>
                    {`${x.reason} ${x.creationDate}`}
                </EpistoFlex2>
            </EpistoFlex2>)}
    </EpistoFlex2>;
};