import { ContentPane } from '../../ContentPane';
import { EpistoFlex2 } from '../../controls/EpistoFlex';
import { EpistoFont } from '../../controls/EpistoFont';
import { EpistoConinImage } from '../../universal/EpistoCoinImage';

const Item = ({ item }: { item: ItemType }) => {

    return (
        <EpistoFlex2>

            {/* name */}
            <EpistoFont>
                {item.fullName}
            </EpistoFont>

            {/* coins */}
            <EpistoFlex2>

                <EpistoConinImage />

                <EpistoFont>
                    {item.totalCoinsAcquired}
                </EpistoFont>
            </EpistoFlex2>
        </EpistoFlex2>
    );
};

type ItemType = {
    fullName: string;
    totalCoinsAcquired: number;
};

export const LeaderboardPage = () => {

    const leaderboardItems: ItemType[] = [
        {
            fullName: 'Manyoki Bence',
            totalCoinsAcquired: 1356,
        },
        {
            fullName: 'Suvalami Bruno',
            totalCoinsAcquired: 789,
        },
        {
            fullName: 'Spengler Manfred',
            totalCoinsAcquired: 551,
        },
    ];

    return (
        <>

            <ContentPane
                noMaxWidth>

                <EpistoFlex2
                    className="whall"
                    bg="white"
                    direction="column">

                    {leaderboardItems
                        .map((leaderboardItem, index) => <Item
                            key={index}
                            item={leaderboardItem} />)}
                </EpistoFlex2>

            </ContentPane>
        </>
    );
};