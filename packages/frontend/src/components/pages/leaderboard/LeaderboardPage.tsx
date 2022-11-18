import { instantiate } from '@episto/commonlogic';
import { Id, LeaderboardPeriodType } from '@episto/commontypes';
import { LeaderboardListItemDTO } from '@episto/communication';
import { useContext, useEffect, useMemo } from 'react';
import { applicationRoutes } from '../../../configuration/applicationRoutes';
import { Environment } from '../../../static/Environemnt';
import { usePaging } from '../../../static/frontendHelpers';
import { useRouteQuery, useSetQueryParams } from '../../../static/locationHelpers';
import { useServiceContainerContext } from '../../../static/serviceContainer';
import { EpistoDataGrid, EpistoDataGridColumnBuilder } from '../../controls/EpistoDataGrid';
import { EpistoFlex2 } from '../../controls/EpistoFlex';
import { EpistoFont } from '../../controls/EpistoFont';
import { SegmentedButton } from '../../controls/SegmentedButton';
import { segmentedButtonStyles } from '../../controls/segmentedButtonStyles';
import { EpistoHeader } from '../../EpistoHeader';
import { ContentPane } from '../../pageRootContainer/ContentPane';
import { ProfileImage } from '../../ProfileImage';
import { CurrentUserContext } from '../../system/AuthenticationFrame';
import { EpistoConinImage } from '../../universal/EpistoCoinImage';

type LeaderboardPeriodOptionType = {
    name: string,
    key: LeaderboardPeriodType
}

type LeaderboardGridRowType = {
    userId: Id<'User'>,
    rank: number,
    avatarUrl: string,
    username: string,
    acquiredCoins: number
}

const RankLabelCircle = (props: {
    rank: number
}) => {

    const { rank } = props;

    const rankBackground = (() => {

        if (rank === 1)
            return 'gold';

        if (rank === 2)
            return '#ffe7a5';

        if (rank === 3)
            return '#e9c4aa';

        return 'lightgrey';
    })();

    return <EpistoFlex2
        align='center'
        justify='center'
        pt='2px'
        fontWeight='bold'
        border='3px solid white'
        background={rankBackground}
        className='square40 circle'>

        {rank}
    </EpistoFlex2>;
};

export const LeaderboardPage = () => {

    const { leaderboardService } = useServiceContainerContext();
    const currentUser = useContext(CurrentUserContext);

    const { setQueryParams } = useSetQueryParams();

    const presets = useMemo(() =>
        instantiate<LeaderboardPeriodOptionType[]>([
            {
                name: 'Napi',
                key: 'daily' as LeaderboardPeriodType
            },
            {
                name: 'Heti',
                key: 'weekly' as LeaderboardPeriodType
            },
            {
                name: 'Havi',
                key: 'monthly' as LeaderboardPeriodType
            }
        ]), []);


    const leaderboardFilterPaging = usePaging<LeaderboardPeriodOptionType>({
        items: presets,
        onItemSet: ({ item }) => setQueryParams('preset', item.key)
    });

    const currentPreset = useRouteQuery(applicationRoutes.leaderboardRoute)
        .getValueOrNull(x => x.preset, 'string') ?? 'daily';

    const currentPresetIndex = presets
        .singleIndex(x => x.key === currentPreset);

    /**
     * sync paging selected item to url
     */
    useEffect(() => {

        leaderboardFilterPaging.setItem(currentPresetIndex);
    }, [currentPresetIndex]);

    const { leaderboardList } = leaderboardService
        .useLeaderboardList(leaderboardFilterPaging.currentItem?.key ?? 'daily');

    const rows = ((users: LeaderboardListItemDTO[]): LeaderboardGridRowType[] => {

        return users
            .map(user => ({
                userId: user.userId,
                avatarUrl: user.avatarUrl,
                username: user.username,
                acquiredCoins: user.acquiredCoins,
                rank: user.rank
            }));
    })(leaderboardList);

    const columns = new EpistoDataGridColumnBuilder<LeaderboardGridRowType, Id<'User'>>()
        .add({
            field: 'rank',
            headerName: 'Elért helyezés',
            width: 120,
            renderCell: ({ value }) => <RankLabelCircle rank={value} />
        })
        .add({
            field: 'username',
            headerName: 'Felhasználó',
            width: 250,
            renderCell: ({ row }) => (
                <EpistoFlex2
                    className='whall'
                    cursor='pointer'
                    //onClick={() => openUser(row.userId)}
                    direction="row"
                    align='center'
                    justify='flex-start'>

                    <ProfileImage
                        className={'square40'}
                        objectFit="contain"
                        firstName={row.username[0] || ''}
                        lastName={row.username[1] || ''}
                        url={row.avatarUrl
                            ? Environment.getAssetUrl(row.avatarUrl)
                            : null} />

                    <EpistoFont
                        style={{
                            marginLeft: '10px'
                        }}>

                        {row.username}
                    </EpistoFont>
                </EpistoFlex2>
            )
        })
        .add({
            field: 'acquiredCoins',
            headerName: 'Megszerzett EpistoCoin-ok',
            width: 250,
            renderCell: ({ row }) => (
                <EpistoFlex2
                    flex='1'>

                    <EpistoConinImage />

                    <EpistoFont
                        margin={{
                            left: 'px10'
                        }}>
                        {row.acquiredCoins}
                    </EpistoFont>
                </EpistoFlex2>
            )
        })
        .getColumns();

    return (
        <>
            <ContentPane
                showLogo>

                {/* Header */}
                <EpistoFlex2
                    px='20px'
                    mb='10px'
                    align='center'
                    justify='space-between'>

                    <EpistoHeader
                        variant='giant'
                        text='Ranglista' />

                    <SegmentedButton
                        paging={leaderboardFilterPaging}
                        stylePreset={segmentedButtonStyles.default}
                        buttonStyle={segmentedButtonStyles.default.toggleButtonStyle}
                        getDisplayValue={x => x.name} />
                </EpistoFlex2>

                <EpistoFlex2
                    className='whall'
                    margin="0 auto 0 auto"
                    direction="column"
                    pb='50px'
                    px='20px'>

                    <EpistoDataGrid
                        getRowClassName={({ row }) => row.userId === currentUser.id
                            ? 'dataGridHighlightedRow'
                            : ''}
                        getKey={(row) => row.userId}
                        columns={columns}
                        rows={rows} />

                </EpistoFlex2>
            </ContentPane>
        </>
    );
};