import { Flex } from '@chakra-ui/react';
import { useNavigation } from '../../services/core/navigatior';
import { CourseItemDTO } from '../../shared/dtos/CourseItemDTO';
import { ChipSmall } from '../administration/courses/ChipSmall';
import { FlexListItem } from '../universal/FlexListItem';
import { FlexListTitleSubtitle } from '../universal/FlexListTitleSubtitle';
import { VideoListSausageIndicator } from './VideoListSausageIndicator';

export const CourseItemListElement = (props: { courseItem: CourseItemDTO }) => {

    const { title, subTitle, state, descriptorCode, shouldRepeatVideo, type } = props.courseItem;
    const isLocked = state === 'locked';
    const { navigateToPlayer } = useNavigation();

    const navigate = () => navigateToPlayer(descriptorCode);

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
                <ChipSmall
                    text='Ismétlés ajánlott'
                    color='var(--intenseOrange)' />}>
        </FlexListItem>
    );
};