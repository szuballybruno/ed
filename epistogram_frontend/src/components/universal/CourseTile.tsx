import { Text } from '@chakra-ui/react';
import { AvailableCourseDTO } from '../../shared/dtos/AvailableCourseDTO';
import { Environment } from '../../static/Environemnt';
import { formatTimespan } from '../../static/frontendHelpers';
import { translatableTexts } from '../../static/translatableTexts';
import { EpistoButton } from '../controls/EpistoButton';
import { EpistoDiv } from '../controls/EpistoDiv';
import { EpistoFlex2, EpistoFlex2Props } from '../controls/EpistoFlex';
import { EpistoFont } from '../controls/EpistoFont';
import { FlexFloat } from '../controls/FlexFloat';
import { SmallStat } from './SmallStat';

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

    const courseTitle = course.title;
    const courseTeacherName = course.teacherName;
    const courseSubCategory = course.subCategoryName;
    const thumbnailImageUrl = course.thumbnailImageURL;
    const isComplete = course.isComplete;

    return <FlexFloat
        className="whall roundBorders"
        direction="column"
        position="relative"
        overflow="hidden"
        shadow="0 0 10px 1px #CCC"
        background="var(--transparentWhite70)"
        justifyContent="space-between"
        p="5px"
        {...css}>

        {/* cover image box  */}
        <EpistoDiv flex="1"
            position="relative"
            minH='150px'
            maxH='150px'>

            {/* cover image */}
            <img
                className="whall roundBorders"
                style={{
                    objectFit: 'cover',
                }}
                src={thumbnailImageUrl}
                alt="" />

            {/* is complete overlay */}
            {isComplete && <EpistoFlex2
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
            </EpistoFlex2>}
        </EpistoDiv>

        {/* content  */}
        <EpistoFlex2 p="10px"
            direction={'column'}
            flex="1">

            <EpistoFlex2 direction="column"
                flex="5">

                {/* category  */}
                <EpistoFont
                    style={{
                        fontSize: '13px',
                        color: 'gray'
                    }}>
                    {courseSubCategory}
                </EpistoFont>

                {/* title */}
                <EpistoFlex2 direction="column">
                    <Text fontWeight={'600'}
                        fontSize="15px">{courseTitle}</Text>
                </EpistoFlex2>
            </EpistoFlex2>

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
                    text={courseTeacherName} />

            </EpistoFlex2>

        </EpistoFlex2>

        {/* buttons */}
        <EpistoFlex2 mb="10px">

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

                {course.currentItemCode
                    ? translatableTexts.availableCourses.continueCourse
                    : translatableTexts.availableCourses.startCourse}
            </EpistoButton>
        </EpistoFlex2>
    </FlexFloat>;
};
