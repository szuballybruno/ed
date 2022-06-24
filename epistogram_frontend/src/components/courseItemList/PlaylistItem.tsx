import { Flex } from '@chakra-ui/react';
import { ReplayCircleFilled } from '@mui/icons-material';
import { useNavigation } from '../../services/core/navigatior';
import { PlaylistItemDTO } from '../../shared/dtos/PlaylistItemDTO';
import { FlexListItem } from '../universal/FlexListItem';
import { FlexListTitleSubtitle } from '../universal/FlexListTitleSubtitle';
import { PlaylistItemTypeIcon } from './PlaylistItemTypeIcon';

export const PlaylistItem = ({ playlistItem }: { playlistItem: PlaylistItemDTO }) => {

    const {
        title,
        subTitle,
        state,
        playlistItemCode,
        shouldRepeatVideo,
        type
    } = playlistItem;

    const isLocked = state === 'locked';
    const { navigateToPlayer } = useNavigation();

    const navigate = () => navigateToPlayer(playlistItemCode);

    const borderWidth = state === 'current'
        ? 5
        : type === 'video'
            ? 0
            : 3;

    const borderColor = type === 'exam'
        ? 'var(--intenseOrange)'
        : 'var(--epistoTeal)';

    return (
        <FlexListItem
            isLocked={isLocked}
            onClick={navigate}
            midContent={<Flex align="center">

                {state === 'current' &&
                    <PlaylistItemTypeIcon
                        color='var(--deepGreen)' />}

                {state === 'locked' &&
                    <PlaylistItemTypeIcon
                        color='grey' />}

                {state === 'available' &&
                    <PlaylistItemTypeIcon
                        color='var(--epistoTeal)' />}

                {state === 'completed' &&
                    <PlaylistItemTypeIcon
                        color='var(--mildGreen)' />}

                <FlexListTitleSubtitle
                    title={title}
                    isSelected={state === 'current'}
                    subTitle={subTitle} />
            </Flex>}
            endContent={shouldRepeatVideo &&
                <ReplayCircleFilled
                    style={{
                        fontWeight: 'bold',
                        color: 'var(--intenseOrange)'
                    }} />
            }>
        </FlexListItem >
    );
};