import { Flex } from '@chakra-ui/react';
import { useDailyTip } from '../../services/api/dailyTipApiService';
import { EpistoFont } from '../controls/EpistoFont';

export const GetTheMostOutOfYourselfSection = () => {

    const { dailyTipData } = useDailyTip();

    return <Flex
        minH='300px'>

        <Flex
            flex='1'
            p='20px'
            align='center'>

            <EpistoFont>
                {dailyTipData?.description
                    ? dailyTipData.description
                    : 'A napi tipped megtekintéséhez ki kell töltened a tanulási stílust felmérő kérdőívet.'}
            </EpistoFont>
        </Flex>

        <Flex flex='1'>

        </Flex>
    </Flex>;
}; 