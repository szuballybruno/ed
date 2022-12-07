import { AvailableCourseDTO } from '@episto/communication';
import { Environment } from '../../static/Environemnt';
import { toDateStringFormatted } from '../../static/frontendHelpers';
import { EpistoFlex2 } from '../controls/EpistoFlex';
import { EpistoImage } from '../controls/EpistoImage';
import { LinearProgressWithLabel } from '../survey/ProgressIndicator';
import { FlexListItem } from '../universal/FlexListItem';
import { FlexListTitleSubtitle } from '../universal/FlexListTitleSubtitle';
import { SmallStat } from '../universal/SmallStat';

export const MobileCourseTile = (props: {
    course: AvailableCourseDTO,
    navigateToDetailsPage: (course: AvailableCourseDTO) => void,
    handlePlayCourse: (course: AvailableCourseDTO) => void
}) => {

    const { course, navigateToDetailsPage, handlePlayCourse } = props;

    return <EpistoFlex2
        className='roundBorders tinyShadow'
        background='var(--transparentWhite70)'
        p='5px'
        mb='5px'
        direction='column'>

        <FlexListItem
            thumbnailContent={
                <EpistoFlex2
                    cursor='pointer'
                    onClick={() => handlePlayCourse(course)}
                    position='relative'
                    align='flex-start'
                    width='100px'>

                    <EpistoImage
                        style={{
                            filter: 'contrast(40%)'
                        }}
                        src={course.thumbnailImageURL} />

                    <EpistoFlex2
                        className='whall'
                        align='center'
                        justify='center'
                        position='absolute'>

                        <img
                            alt=""
                            src={Environment.getAssetUrl(
                                '/icons/play2.svg'
                            )}
                            style={{
                                width: '25px',
                                height: '25px',
                            }}
                        />
                    </EpistoFlex2>

                </EpistoFlex2>
            }
            midContent={
                <EpistoFlex2
                    onClick={() => {
                        navigateToDetailsPage(course);
                    }}
                    direction='column'>

                    <FlexListTitleSubtitle
                        title={course.title}
                        subTitle={course.categoryName} />

                    {/* length */}
                    {(course.requiredCompletionDate && !course.finalExamScorePercentage) && <SmallStat
                        title="Határidő"
                        iconUrl={Environment.getAssetUrl('images/weeklyquota.png')}
                        text={toDateStringFormatted(course.requiredCompletionDate)} />}

                    {/* videos count */}
                    {(course.isStarted && course.totalVideoCount && course.completedVideoCount) && <SmallStat
                        title="Ennyi videót tartalmaz a kurzus"
                        iconUrl={Environment.getAssetUrl('images/videos3D.png')}
                        text={'Még ' + (course.totalVideoCount - course.completedVideoCount) + ' videó van hátra.'} />}

                    {/* length */}
                    {course.finalExamScorePercentage && <SmallStat
                        title="Eredményed"
                        iconUrl={Environment.getAssetUrl('images/weeklyquota.png')}
                        text={course.finalExamScorePercentage + ''} />}
                </EpistoFlex2>
            } />

        <LinearProgressWithLabel
            value={course.completedVideoCount / course.totalVideoCount * 100 || 0} />
    </EpistoFlex2>;
};

