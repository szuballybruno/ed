import { instantiate } from '@episto/commonlogic';
import { Id, LeaderboardPeriodType, LeaderboardScopeType } from '@episto/commontypes';
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
import { EpistoHeader } from '../../EpistoHeader';
import { ContentPane } from '../../pageRootContainer/ContentPane';
import { ProfileImage } from '../../ProfileImage';
import { CurrentUserContext } from '../../system/AuthenticationFrame';
import { EpistoConinImage } from '../../universal/EpistoCoinImage';

type LeaderboardPeriodOptionType = {
    name: string,
    key: LeaderboardPeriodType
}
type LeaderboardScopeOptionType = {
    name: string,
    key: LeaderboardScopeType
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

    const scopes = useMemo<LeaderboardScopeOptionType[]>(() =>
        instantiate([
            {
                name: 'Top 10',
                key: 'top10'
            },
            {
                name: 'Verseny',
                key: 'competitive'
            }
        ]), []);

    const leaderboardPeriodPaging = usePaging<LeaderboardPeriodOptionType>({
        items: presets,
        defaultValue: null,
        onItemSet: ({ item }) => setQueryParams('period', item.key)
    });

    const leaderboardScopePaging = usePaging<LeaderboardScopeOptionType>({
        items: scopes,
        defaultValue: null,
        onItemSet: ({ item }) => setQueryParams('scope', item.key)
    });

    const periodFromURL = useRouteQuery(applicationRoutes.leaderboardRoute)
        .getValueOrNull(x => x.period, 'string') ?? 'daily';

    const scopeFromURL = useRouteQuery(applicationRoutes.leaderboardRoute)
        .getValueOrNull(x => x.scope, 'string') ?? 'top10';

    /**
     * sync paging selected item to url
     */
    useEffect(() => {

        if (leaderboardPeriodPaging.currentItem !== null)
            return;

        const currentPresetIndex = leaderboardPeriodPaging.items
            .singleIndex(x => x.key === periodFromURL);

        leaderboardPeriodPaging
            .setItem(currentPresetIndex);
    }, [leaderboardPeriodPaging, periodFromURL]);

    /**
     * sync paging selected item to url
     */
    useEffect(() => {

        if (leaderboardScopePaging.currentItem !== null)
            return;

        leaderboardScopePaging
            .setItem(leaderboardScopePaging.items.singleIndex(x => x.key === scopeFromURL));
    }, [leaderboardScopePaging, scopeFromURL]);

    const selectedPeriod = leaderboardPeriodPaging.currentItem?.key ?? periodFromURL;
    const selectedScope = leaderboardScopePaging.currentItem?.key ?? scopeFromURL;

    const { leaderboardList } = leaderboardService
        .useLeaderboardList(selectedPeriod, selectedScope);

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
                    direction="row"
                    align='center'
                    justify='flex-start'>

                    <ProfileImage
                        className={'square40'}
                        objectFit="contain"
                        firstName={row.username[1] || ''}
                        lastName={row.username[0] || ''}
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

                    <EpistoFlex2>

                        <SegmentedButton
                            paging={leaderboardScopePaging}
                            variant="default"
                            getDisplayValue={x => x.name} />

                        <EpistoFlex2
                            margin="2px" />

                        <SegmentedButton
                            paging={leaderboardPeriodPaging}
                            variant="default"
                            getDisplayValue={x => x.name} />
                    </EpistoFlex2>
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