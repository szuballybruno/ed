import { ReplayCircleFilled } from '@mui/icons-material';
import { useNavigation } from '../../services/core/navigatior';
import { PlaylistItemDTO } from '../../shared/dtos/PlaylistItemDTO';
import { ChipSmall } from '../administration/courses/ChipSmall';
import { FlexListItem } from '../universal/FlexListItem';
import { FlexListTitleSubtitle } from '../universal/FlexListTitleSubtitle';
import { PlaylistItemTypeIcon } from './PlaylistItemTypeIcon';
import { useScrollIntoView } from '../system/AutoScrollContext';
import { useEffect } from 'react';
import { EpistoFlex2 } from '../controls/EpistoFlex';
import { Environment } from '../../static/Environemnt';
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
    const { scroll, setChild, childElement } = useScrollIntoView();

    useEffect(() => {

        if (state === 'current') {

            console.log('Current item in the moment before initiating scroll function: ' + title);
            scroll();
        }

    }, [childElement]);

    const navigate = () => {
        console.log('Playing unmute sound thing');
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

    return (
        <FlexListItem
            ref={el => {

                if (state === 'current' && el)
                    setChild(el);
            }}
            isLocked={isLocked}
            onClick={navigate}
            midContent={<EpistoFlex2 align="center">

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
