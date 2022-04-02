import { Flex } from '@chakra-ui/layout';
import { useCoinTransactions } from '../../services/api/coinTransactionsApiService';

export const CoinTransactions = () => {

    const { coinTransactions } = useCoinTransactions();

    return <Flex direction="column"
align="center">
        {coinTransactions
            .map((x, index) => <Flex
                key={index}
                direction="column"
                align="center"
                my="10px">

                <Flex
                    className="circle square50"
                    border="solid 2px gold"
                    align="center"
                    justify="center">
                    {x.amount}
                </Flex>

                <Flex>
                    {x.reason} {x.creationDate}
                </Flex>
            </Flex>)}
    </Flex>;
};