import { Text } from '@chakra-ui/react';
import { AvailableCourseDTO } from '../../shared/dtos/AvailableCourseDTO';
import { Environment } from '../../static/Environemnt';
import { formatTimespan } from '../../static/frontendHelpers';
import { translatableTexts } from '../../static/translatableTexts';
import { EpistoButton } from '../controls/EpistoButton';
import { EpistoFlex2, EpistoFlex2Props } from '../controls/EpistoFlex';
import { SmallStat } from './SmallStat';
import { VerticalTile } from './verticalTile/VerticalTile';
import { VerticalTileImage } from './verticalTile/VerticalTileImage';

export const CourseTileIsCompletedBadge = () => {

    return <EpistoFlex2
        position="absolute"
        top={10}
        right={0}
        justify="flex-end">

        <EpistoFlex2
            direction="row"
            justifyContent="space-around"
            alignItems="center"
            padding="4px"
            width='130px'
            bg="#97CC9B"
            borderRadius="7px 0 0 7px">

            <img
                src={Environment.getAssetUrl('course_exam_tile_icons/tile_badge_completed.svg')}
                alt={''}
                style={{
                    width: 20,
                    height: 20
                }}
            />
            <Text
                textTransform={'uppercase'}
                color="white">

                {translatableTexts.availableCourses.courseDone}
            </Text>
        </EpistoFlex2>
    </EpistoFlex2>;
};

export const CourseTileStats = (props: {
    course: AvailableCourseDTO
}) => {

    const { course } = props;

    {/* content  */ }
    return <>

        {/* small stats  */}
        <EpistoFlex2 mt='7px'
            mb="3px"
            justify="space-between">

            {/* length */}
            <SmallStat
                title="Ennyi idő alatt tudod elvégezni a kurzust"
                iconUrl={Environment.getAssetUrl('images/time3D.png')}
                text={formatTimespan(course.totalVideoSumLengthSeconds)} />

            {/* videos count */}
            <SmallStat
                title="Ennyi videót tartalmaz a kurzus"
                iconUrl={Environment.getAssetUrl('images/videos3D.png')}
                text={course.totalVideoCount + ''} />

            {/* difficulty */}
            <SmallStat
                title="A kurzus nehézsége 1-5-ig értékelve"
                iconUrl={Environment.getAssetUrl('images/difficulty3D.png')}
                text={course.difficulty + ''} />

            {/* rating */}
            <SmallStat
                title="1-5-ig ennyire érékelték a hallgatók a tanfolyamot"
                iconUrl={Environment.getAssetUrl('images/star3D.png')}
                text={course.benchmark + ''} />
        </EpistoFlex2>

        {/* rating */}
        <EpistoFlex2
            alignItems={'center'}
            mt='7px'>

            {/* teacher name */}
            <SmallStat
                title="A kurzus nyelve"
                iconUrl={Environment.getAssetUrl('images/flag3D.png')}
                text={course.teacherName} />

        </EpistoFlex2>

    </>;
};

export const CourseTileButtons = (props: {
    onDetails: () => void,
    onPlay: () => void,
    isStartedCourse: boolean | string
}) => {

    const {
        onDetails,
        onPlay,
        isStartedCourse
    } = props;

    return <EpistoFlex2 mb="10px">

        {/* details */}
        <EpistoButton
            onClick={onDetails}
            style={{ flex: '1' }}>
            {translatableTexts.availableCourses.courseDataSheet}
        </EpistoButton>

        {/* start course */}
        <EpistoButton
            onClick={onPlay}
            variant="colored"
            style={{ flex: '1' }}>

            {isStartedCourse
                ? translatableTexts.availableCourses.continueCourse
                : translatableTexts.availableCourses.startCourse}
        </EpistoButton>
    </EpistoFlex2>;
};

export const CourseTile = ({
    course,
    children,
    onDetails,
    onPlay,
    ...css
}: {
    course: AvailableCourseDTO,
    onPlay: () => void,
    onDetails: () => void
} & EpistoFlex2Props) => {

    const thumbnailImageUrl = course.thumbnailImageURL;
    const isComplete = course.isComplete;
    const isStartedCourse = course.currentItemCode || (course.stageName !== null && course.stageName !== 'assigned');

    return <VerticalTile
        title={course.title}
        subTitle={course.categoryName}
        imageComponent={<VerticalTileImage
            imageUrl={thumbnailImageUrl}
            badgeComponent={isComplete && <CourseTileIsCompletedBadge />} />
        }
        infoComponent={<CourseTileStats course={course} />}
        buttonsComponent={<CourseTileButtons
            onPlay={onPlay}
            onDetails={onDetails}
            isStartedCourse={isStartedCourse} />
        } />;
};
