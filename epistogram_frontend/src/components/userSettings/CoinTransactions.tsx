import { Flex } from '@chakra-ui/layout';
import { useCoinTransactions } from '../../services/api/coinTransactionsApiService';
import { CoinTransactionReasonType } from '../../shared/types/sharedTypes';
import { dateTimeToString } from '../../static/frontendHelpers';
import { EpistoFont } from '../controls/EpistoFont';

const getReasonData = (reason: CoinTransactionReasonType) => {

    if (reason === 'activity')
        return ['#80e3cc', 'Aktivitas'];

    if (reason === 'activity_streak')
        return ['blue', 'Aktivitasi sorozat'];

    if (reason === 'answer_streak')
        return ['yellow', 'Helyes valasz sorozat'];

    if (reason === 'correct_answer')
        return ['green', 'Helyes valasz'];

    if (reason === 'gifted')
        return ['orange', 'Ajandek'];

    if (reason === 'shop_item_purchase')
        return ['purple', 'Vasarlasi bonusz'];

    if (reason === 'video_watched')
        return ['#82e8ff', 'Video megtekintes'];

    throw new Error(`Not reckognised: ${reason}!`);
};

export const CoinTransactions = () => {

    const { coinTransactions } = useCoinTransactions();

    return <Flex
        direction="column"
        px="50px">

        {coinTransactions
            .map((x, index) => {

                const [color, label] = getReasonData(x.reason);

                return (
                    <Flex
                        overflow="hidden"
                        key={index}
                        direction="row"
                        justify="space-between"
                        my="5px"
                        padding='10px'
                        borderRadius="10px"
                        bg='white'>

                        <Flex
                            align="center">

                            <Flex
                                className="circle square30"
                                border="solid 2px gold"
                                align="center"
                                justify="center"
                                bg="#ffea7a">
                                {x.amount}
                            </Flex>

                            <EpistoFont
                                margin={{
                                    left: 'px10'
                                }}>
                                {dateTimeToString(x.creationDate)}
                            </EpistoFont>
                        </Flex>

                        <Flex
                            justifySelf="flex-end"
                            borderRadius="5px"
                            align="center"
                            px="5px"
                            bg={color}>

                            <EpistoFont>
                                {label}
                            </EpistoFont>
                        </Flex>
                    </Flex>
                );
            })}
    </Flex>;
};