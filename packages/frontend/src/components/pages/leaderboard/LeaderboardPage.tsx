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

    return (
        <EpistoFlex2>

            {/* name */}
            <EpistoFont>
                {item.name}
            </EpistoFont>

            {/* coins */}
            <EpistoFlex2>

                <EpistoConinImage />

                <EpistoFont>
                    {item.acquiredCoins}
                </EpistoFont>
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

            </ContentPane>
        </>
    );
};