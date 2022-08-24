import {Flex} from '@chakra-ui/react';
import {ReplayCircleFilled} from '@mui/icons-material';
import {useNavigation} from '../../services/core/navigatior';
import {PlaylistItemDTO} from '../../shared/dtos/PlaylistItemDTO';
import {ChipSmall} from '../administration/courses/ChipSmall';
import {FlexListItem} from '../universal/FlexListItem';
import {FlexListTitleSubtitle} from '../universal/FlexListTitleSubtitle';
import {PlaylistItemTypeIcon} from './PlaylistItemTypeIcon';
import {createRef, RefObject, useEffect} from 'react';

export const scrollIntoView = (parent, child) => {

    const parentBounding = parent.getBoundingClientRect(),
        clientBounding = child.getBoundingClientRect();

    const parentBottom = parentBounding.bottom,
        parentTop = parentBounding.top,
        clientBottom = clientBounding.bottom,
        clientTop = clientBounding.top;

    if (parentTop >= clientTop) {
        scrollTo(parent, -(parentTop - clientTop), 300);
    } else if (clientBottom > parentBottom) {
        scrollTo(parent, clientBottom - parentBottom + 300, 300);
    }

};

function easeInOutQuad(time, startPos, endPos, duration) {
    time /= duration / 2;

    if (time < 1) return (endPos / 2) * time * time + startPos;
    time--;
    return (-endPos / 2) * (time * (time - 2) - 1) + startPos;
}

const scrollTo = (element: any, to: number, duration: number) => {

    const start = element.scrollTop;
    let currentTime = 0;
    const increment = 20;

    const animateScroll = function() {
        currentTime += increment;

        const val = easeInOutQuad(currentTime, start, to, duration);
        element.scrollTop = val;

        if (currentTime < duration) {
            setTimeout(animateScroll, increment);
        }
    };

    animateScroll();
};

export const PlaylistItem = ({ playlistItem, parentRef }: {playlistItem: PlaylistItemDTO, parentRef?: RefObject<HTMLDivElement>}) => {

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

    const ref = createRef<HTMLDivElement>();

    useEffect(() => {

        console.log('Effect runs');

        if(ref.current && state === 'current' && parentRef) {

            console.log('scrolling...');
            console.log(ref.current);
            console.log(parentRef.current);
            scrollIntoView(parentRef.current, ref.current);
            /*ref.current.scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
                inline: 'start'
            });*/
        }
    }, [parentRef]);

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
            ref={ref}
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
