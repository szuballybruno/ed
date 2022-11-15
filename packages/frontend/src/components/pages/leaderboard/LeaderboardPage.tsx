import { LeaderboardPeriodType } from '@episto/commontypes';
import { LeaderboardListItemDTO } from '@episto/communication';
import { useState } from 'react';
import { useServiceContainerContext } from '../../../static/serviceContainer';
import { ContentPane } from '../../ContentPane';
import { EpistoFlex2 } from '../../controls/EpistoFlex';
import { EpistoFont } from '../../controls/EpistoFont';
import { EpistoSelect } from '../../controls/EpistoSelect';
import { EpistoConinImage } from '../../universal/EpistoCoinImage';

const Item = ({ item }: { item: LeaderboardListItemDTO }) => {

    const bg = item.rank === 1
        ? 'gold'
        : item.rank === 2
            ? '#ffe7a5'
            : item.rank === 3
                ? '#e9c4aa'
                : undefined;

    return (
        <EpistoFlex2
            padding="10px"
            bg={bg}
            flex="1">

            {/* rank */}
            <EpistoFont
                style={{
                    flex: '1'
                }}>

                {item.rank}
            </EpistoFont>

            {/* name */}
            <EpistoFont
                style={{
                    flex: '4'
                }}>

                {item.name}
            </EpistoFont>

            {/* coins */}
            <EpistoFlex2
                flex='1'>

                <EpistoConinImage />

                <EpistoFont
                    margin={{
                        left: 'px10'
                    }}>
                    {item.acquiredCoins}
                </EpistoFont>
            </EpistoFlex2>

            {/* etc */}
            <EpistoFlex2
                flex='20'>
            </EpistoFlex2>

        </EpistoFlex2>
    );
};

export const LeaderboardPage = () => {

    const { leaderboardService } = useServiceContainerContext();

    const [period, setPeriod] = useState<LeaderboardPeriodType>('weekly');

    const { leaderboardList } = leaderboardService
        .useLeaderboardList(period);

    return (
        <>
            <ContentPane
                noMaxWidth>

                <EpistoFlex2
                    margin="0 auto 0 auto"
                    direction="column"
                    width="90%">

                    <EpistoSelect
                        items={[
                            'daily',
                            'weekly',
                            'monthly'
                        ] as LeaderboardPeriodType[]}
                        defaultValue={'weekly'}
                        getCompareKey={x => x}
                        getDisplayValue={x => x}
                        onSelected={setPeriod} />

                    <EpistoFlex2
                        className="whall"
                        bg="white"
                        direction="column">

                        {leaderboardList
                            .map((leaderboardItem, index) => <Item
                                key={index}
                                item={leaderboardItem} />)}
                    </EpistoFlex2>

                </EpistoFlex2>
            </ContentPane>
        </>
    );
};