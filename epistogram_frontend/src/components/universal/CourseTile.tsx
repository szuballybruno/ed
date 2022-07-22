import { Box, Flex, FlexProps, Text } from '@chakra-ui/react';
import { AvailableCourseDTO } from '../../shared/dtos/AvailableCourseDTO';
import { Environment } from '../../static/Environemnt';
import { formatTimespan } from '../../static/frontendHelpers';
import { translatableTexts } from '../../static/translatableTexts';
import { EpistoFont } from '../controls/EpistoFont';
import { FlexFloat } from '../controls/FlexFloat';
import { SmallStat } from './SmallStat';

const CourseTile = (props: {
    course: AvailableCourseDTO
} & FlexProps) => {

    const { course, children, ...css } = props;
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
        <Box flex="1"
            position="relative"
            minH={150}
            maxH={150}>

            {/* cover image */}
            <img
                className="whall roundBorders"
                style={{
                    objectFit: 'cover',
                }}
                src={thumbnailImageUrl}
                alt="" />

            {/* is complete overlay */}
            {isComplete && <Flex
                position="absolute"
                top={10}
                right={0}
                justify="flex-end">

                <Flex
                    direction="row"
                    justifyContent="space-around"
                    alignItems="center"
                    padding="4px"
                    width={130}
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
                </Flex>
            </Flex>}
        </Box>

        {/* content  */}
        <Flex p="10px"
            direction={'column'}
            flex="1">

            <Flex direction="column"
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
                <Flex direction="column">
                    <Text fontWeight={'600'}
                        fontSize="15px">{courseTitle}</Text>
                </Flex>
            </Flex>

            {/* small stats  */}
            <Flex mt={7}
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
            </Flex>

            {/* rating */}
            <Flex
                alignItems={'center'}
                mt={7}>

                {/* teacher name */}
                <SmallStat
                    title="A kurzus nyelve"
                    iconUrl={Environment.getAssetUrl('images/flag3D.png')}
                    text={courseTeacherName} />

            </Flex>

        </Flex>

        {/* buttons */}
        {props.children}
    </FlexFloat>;
};

export default CourseTile;
