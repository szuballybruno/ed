import { ReplayCircleFilled } from '@mui/icons-material';
import { useEffect } from 'react';
import { useNavigation } from '../../services/core/navigatior';
import { PlaylistItemDTO } from '../../shared/dtos/PlaylistItemDTO';
import { Environment } from '../../static/Environemnt';
import { Logger } from '../../static/Logger';
import { ChipSmall } from '../administration/courses/ChipSmall';
import { EpistoFlex2 } from '../controls/EpistoFlex';
import { useScrollIntoView } from '../system/AutoScrollContext';
import { FlexListItem } from '../universal/FlexListItem';
import { FlexListTitleSubtitle } from '../universal/FlexListTitleSubtitle';
import { PlaylistItemTypeIcon } from './PlaylistItemTypeIcon';

export const PlaylistItem = (
    {
        playlistItem
    }: {
        playlistItem: PlaylistItemDTO
    }
) => {

    const {
        title,
        subTitle,
        state,
        playlistItemCode,
        shouldRepeatVideo,
        type,
        correctAnswerRate
    } = playlistItem;

    const isLocked = state === 'locked';
    const { navigateToPlayer } = useNavigation();
    const { scroll, setChild, childElement } = useScrollIntoView();

    useEffect(() => {

        if (state === 'current') {

            scroll();
        }

    }, [childElement]);

    const navigate = () => {

        Logger.logScoped('PLAYER DEBUG', 'Playing unmute sound thing');

        new Audio(Environment.getAssetUrl('/sounds/testunmute.mp3'))
            .play();
        return navigateToPlayer(playlistItemCode);
    };

    const borderWidth = state === 'current'
        ? 5
        : type === 'video'
            ? 0
            : 3;

    const borderColor = type === 'exam'
        ? 'var(--intenseOrange)'
        : 'var(--epistoTeal)';

    const playlistItemTypeColor = (() => {

        if (state === 'current')
            return 'var(--deepGreen)';

        if (state === 'completed')
            return 'var(--mildGreen)';

        if (type === 'exam' || type === 'final')
            return 'var(--mildOrange)';

        if (state === 'locked')
            return 'var(--mildRed)';

        if (state === 'available')
            return 'lightgrey';

        return 'lightgrey';

    })();

    return (
        <FlexListItem
            ref={el => {

                if (state === 'current' && el)
                    setChild(el);
            }}
            isLocked={isLocked}
            onClick={navigate}
            midContent={<EpistoFlex2 align="center">

                <PlaylistItemTypeIcon
                    title='Elvégezve'
                    color={playlistItemTypeColor} />

                <FlexListTitleSubtitle
                    title={title}
                    isSelected={state === 'current'}
                    subTitle={subTitle} />
            </EpistoFlex2>}
            endContent={<EpistoFlex2>

                {shouldRepeatVideo &&
                    <ReplayCircleFilled
                        style={{
                            fontWeight: 'bold',
                            color: 'var(--intenseOrange)'
                        }} />}

                {(type === 'exam' && correctAnswerRate)
                    && <ChipSmall text={correctAnswerRate + '%'} />}
            </EpistoFlex2>
            }>
        </FlexListItem >
    );
};
