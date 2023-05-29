import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { useNavigation } from '../../services/core/navigatior';
import { CourseProgressDTO } from '@episto/communication';
import { EpistoButton } from '../controls/EpistoButton';
import { EpistoFlex2, EpistoFlex2Props } from '../controls/EpistoFlex';
import { EpistoFont } from '../controls/EpistoFont';
import { EpistoProgressBar } from '../controls/EpistoProgressBar';

export const CourseProgressDisplay = ({
    dto,
    ...css
}: {
    dto: CourseProgressDTO,
} & EpistoFlex2Props) => {

    const {
        courseId,
        currentItemCode,
        currentStageName,
        progressPercentage,
        title
    } = dto;

    const roundProgressPercentage = Math.round(progressPercentage);

    const { continueCourse: playCourse } = useNavigation();

    return (
        <EpistoFlex2
            direction="column"
            {...css}>

            <EpistoFlex2 align="center">

                {/* title  */}
                <EpistoFont>
                    {title}
                </EpistoFont>

                {/* start button */}
                <EpistoButton
                    onClick={() => playCourse(courseId, currentStageName, currentItemCode)}>

                    <PlayArrowIcon
                        style={{
                            color: 'var(--eduptiveYellowGreen)'
                        }} />
                </EpistoButton>
            </EpistoFlex2>

            <EpistoFlex2 align="center">

                {/* progress bar */}
                <EpistoProgressBar
                    variant="determinate"
                    value={roundProgressPercentage}
                    style={{
                        flex: '1',
                        marginRight: '10px'
                    }} />

                {/* progress percentage */}
                <EpistoFont>
                    {`${roundProgressPercentage}%`}
                </EpistoFont>
            </EpistoFlex2>
        </EpistoFlex2>
    );
};