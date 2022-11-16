import { LeaderboardPeriodType } from '@episto/commontypes';
import { LeaderboardListItemDTO } from '@episto/communication';
import { useMemo, useState } from 'react';
import { useServiceContainerContext } from '../../../static/serviceContainer';
import { ContentPane } from '../../pageRootContainer/ContentPane';
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

type LeaderboardPeriodOptionType = {
    name: string,
    key: LeaderboardPeriodType
}

export const LeaderboardPage = () => {

    const { leaderboardService } = useServiceContainerContext();

    const options = useMemo((): LeaderboardPeriodOptionType[] => [
        {
            name: 'Napi',
            key: 'daily'
        },
        {
            name: 'Heti',
            key: 'weekly'
        },
        {
            name: 'Havi',
            key: 'monthly'
        },
    ], []);

    const [period, setPeriod] = useState<LeaderboardPeriodOptionType>(options[2]);

    const { leaderboardList } = leaderboardService
        .useLeaderboardList(period.key);

    return (
        <>
            <ContentPane>

                <EpistoFlex2
                    margin="0 auto 0 auto"
                    direction="column"
                    width="90%">

                    <EpistoSelect
                        items={options}
                        getCompareKey={x => x.key}
                        getDisplayValue={x => x.key}
                        selectedValue={period}
                        noUnselected
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