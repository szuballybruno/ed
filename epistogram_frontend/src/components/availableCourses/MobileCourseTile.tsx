import { AvailableCourseDTO } from '../../shared/dtos/AvailableCourseDTO';
import { translatableTexts } from '../../static/translatableTexts';
import { EpistoFlex2 } from '../controls/EpistoFlex';
import { EpistoFont } from '../controls/EpistoFont';
import { EpistoImage } from '../controls/EpistoImage';
import { LinearProgressWithLabel } from '../signup/ProgressIndicator';
import { FlexListItem } from '../universal/FlexListItem';
import { FlexListTitleSubtitle } from '../universal/FlexListTitleSubtitle';

export const MobileCourseTile = (props: {
    course: AvailableCourseDTO,
    handlePlayCourse: (course: AvailableCourseDTO) => void
}) => {

    const { course, handlePlayCourse } = props;

    //TODO: isStarted, completedVideoCount, requiredCompletionDate, finalExamSuccessRate

    return <EpistoFlex2
        direction='column'>

        <FlexListItem
            thumbnailContent={
                <EpistoFlex2
                    align='flex-start'
                    width='100px'>

                    <EpistoImage
                        src={course.thumbnailImageURL} />
                </EpistoFlex2>
            }
            midContent={
                <EpistoFlex2
                    direction='column'>

                    <FlexListTitleSubtitle
                        title={course.title}
                        subTitle={course.categoryName} />

                    {/* start course */}
                    <EpistoFont
                        onClick={() => handlePlayCourse(course)}
                        fontWeight='heavy'
                        fontSize='fontLarge'
                        style={{
                            flex: '1',
                            color: 'var(--epistoTeal)'
                        }}>

                        {translatableTexts.availableCourses.startCourse}
                    </EpistoFont>
                </EpistoFlex2>
            } />

        <LinearProgressWithLabel
            value={10} />
    </EpistoFlex2>;
};

