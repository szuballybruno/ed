import { Flex } from '@chakra-ui/react';
import { ReplayCircleFilled } from '@mui/icons-material';
import { useNavigation } from '../../services/core/navigatior';
import { PlaylistItemDTO } from '../../shared/dtos/PlaylistItemDTO';
import { FlexListItem } from '../universal/FlexListItem';
import { FlexListTitleSubtitle } from '../universal/FlexListTitleSubtitle';
import { VideoListSausageIndicator } from './VideoListSausageIndicator';

export const PlaylistElement = ({ playlistItem }: { playlistItem: PlaylistItemDTO }) => {

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
                    <VideoListSausageIndicator
                        color='var(--deepGreen)' />}

                {state === 'locked' &&
                    <VideoListSausageIndicator
                        color='grey' />}

                {state === 'available' &&
                    <VideoListSausageIndicator
                        color='var(--epistoTeal)' />}

                {state === 'completed' &&
                    <VideoListSausageIndicator
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