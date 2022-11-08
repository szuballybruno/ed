import { CourseLearningDTO } from '@episto/communication';
import { Environment } from '../../static/Environemnt';
import { formatTimespan } from '../../static/frontendHelpers';
import { EpistoButton, EpistoButtonPropsType } from '../controls/EpistoButton';
import { EpistoFlex2, EpistoFlex2Props } from '../controls/EpistoFlex';
import { EpistoProgressBar } from '../controls/EpistoProgressBar';
import { CourseTileIsCompletedBadge } from '../universal/CourseTile';
import { SmallStat } from '../universal/SmallStat';
import { VerticalTile } from '../universal/verticalTile/VerticalTile';
import { VerticalTileImage } from '../universal/verticalTile/VerticalTileImage';

export const LearningCourseStatsTileInfo = (props: {
    spentTime: string,
    totalVideoCount: number,
    completedVideoCount: number,
    totalVideoQuestionCount: number,
    answeredVideoQuestionCount: number,
    progressPercentage: number
}) => {

    const {
        spentTime,
        totalVideoCount,
        completedVideoCount,
        totalVideoQuestionCount,
        answeredVideoQuestionCount,
        progressPercentage
    } = props;

    return <>

        {/* small stats */}
        <EpistoFlex2 mt={7}
            justify="space-evenly">

            {/* spent time  */}
            <SmallStat
                iconUrl={Environment.getAssetUrl('images/time3D.png')}
                text={spentTime} />

            {/* videos  */}
            <SmallStat
                iconUrl={Environment.getAssetUrl('images/videos3D.png')}
                text={`${totalVideoCount}/${completedVideoCount}`} />

            {/* video questions */}
            <SmallStat
                iconUrl={Environment.getAssetUrl('images/rightanswerontile3D.png')}
                text={`${totalVideoQuestionCount}/${answeredVideoQuestionCount}`} />
        </EpistoFlex2>

        {/* course progress bar chart */}
        <EpistoFlex2
            direction={'row'}
            alignItems={'center'}
            mt='7px'
            width="100%"
            height="10px">

            <EpistoProgressBar
                variant="determinate"
                style={{
                    width: '100%',
                }}
                value={progressPercentage} />

            <EpistoFlex2 m="0 5px 0 20px">

                {`${progressPercentage}%`}
            </EpistoFlex2>

        </EpistoFlex2>
    </>;
};

export const LearningCourseStatsTile = (props: {
    course: CourseLearningDTO,
    actionButtons: EpistoButtonPropsType[]
} & EpistoFlex2Props) => {

    const { course, children, actionButtons, ...css } = props;
    const {
        title,
        subCategoryName,
        thumbnailImageURL,
        isComplete,
        totalVideoCount,
        completedVideoCount,
        totalVideoQuestionCount,
        answeredVideoQuestionCount,
        totalSpentSeconds,
        completedCourseItemCount,
        totalCourseItemCount,
    } = course;

    const formattedSpentTime = formatTimespan(totalSpentSeconds);
    const progressPercentage = Math.floor(completedCourseItemCount / totalCourseItemCount * 100);

    return <VerticalTile
        title={title}
        subTitle={subCategoryName}
        imageComponent={<VerticalTileImage
            imageUrl={thumbnailImageURL}
            badgeComponent={isComplete && <CourseTileIsCompletedBadge />} />}
        infoComponent={<LearningCourseStatsTileInfo
            spentTime={formattedSpentTime}
            totalVideoCount={totalVideoCount}
            answeredVideoQuestionCount={answeredVideoQuestionCount}
            completedVideoCount={completedVideoCount}
            progressPercentage={progressPercentage}
            totalVideoQuestionCount={totalVideoQuestionCount} />}
        buttonsComponent={<EpistoFlex2 mt="10px">

            {actionButtons.map((button, index) => {
                return <EpistoButton
                    key={index}
                    style={{ flex: '1' }}
                    {...button}>

                    {button.children}
                </EpistoButton>;
            })}

        </EpistoFlex2>} />;
};
