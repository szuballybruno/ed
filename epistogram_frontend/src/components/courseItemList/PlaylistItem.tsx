import {Flex} from '@chakra-ui/react';
import {ReplayCircleFilled} from '@mui/icons-material';
import {useNavigation} from '../../services/core/navigatior';
import {PlaylistItemDTO} from '../../shared/dtos/PlaylistItemDTO';
import {ChipSmall} from '../administration/courses/ChipSmall';
import {FlexListItem} from '../universal/FlexListItem';
import {FlexListTitleSubtitle} from '../universal/FlexListTitleSubtitle';
import {PlaylistItemTypeIcon} from './PlaylistItemTypeIcon';
import {useScrollIntoView} from '../system/AutoScrollContext';
import {useEffect} from 'react';
//import {useScrollIntoView} from '../system/AutoScrollContext';

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
    const { scroll, setChild  } = useScrollIntoView();

    useEffect(() => {

        if (state === 'current')
            scroll();

    }, [scroll, state]);

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
            ref={el => {

                if (state === 'current' && el)
                    setChild(el);
            }}
            isLocked={isLocked}
            onClick={navigate}
            midContent={<Flex align="center">

                {state === 'current' &&
                    <PlaylistItemTypeIcon
                        title='Kiválasztott'
                        color='var(--deepGreen)' />}

                {state === 'locked' &&
                    <PlaylistItemTypeIcon
                        title='Zárolva'
                        color='var(--mildRed)' />}

                {state === 'available' &&
                    <PlaylistItemTypeIcon
                        title='Felolva'
                        color='lightgrey' />}

                {state === 'completed' &&
                    <PlaylistItemTypeIcon
                        title='Elvégezve'
                        color='var(--mildGreen)' />}

                <FlexListTitleSubtitle
                    title={title}
                    isSelected={state === 'current'}
                    subTitle={subTitle} />
            </Flex>}
            endContent={<Flex>

                {shouldRepeatVideo &&
                    <ReplayCircleFilled
                        style={{
                            fontWeight: 'bold',
                            color: 'var(--intenseOrange)'
                        }} />}

                {(type === 'exam' && correctAnswerRate)
                    && <ChipSmall text={correctAnswerRate + '%'} />}
            </Flex>
            }>
        </FlexListItem >
    );
};
