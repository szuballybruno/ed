import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { useNavigation } from '../../services/core/navigatior';
import { EpistoButton } from '../controls/EpistoButton';
import { EpistoFlex2, EpistoFlex2Props } from '../controls/EpistoFlex';
import { EpistoFont } from '../controls/EpistoFont';
import { EpistoProgressBar } from '../controls/EpistoProgressBar';

export const CourseProgressDisplay = (props: {
    value: number,
    label: string,
    continueItemCode: string
} & EpistoFlex2Props) => {

    const { value, label, continueItemCode, ...css } = props;
    const roundValue = Math.round(value);

    const { navigateToPlayer } = useNavigation();

    const continueCourse = () => {

        navigateToPlayer(continueItemCode);
    };

    return (
        <EpistoFlex2
            direction="column"
            {...css}>

            <EpistoFlex2 align="center">

                {/* title  */}
                <EpistoFont>
                    {label}
                </EpistoFont>

                {/* start button */}
                <EpistoButton onClick={continueCourse}>
                    <PlayArrowIcon
                        style={{
                            color: 'var(--epistoTeal)'
                        }} />
                </EpistoButton>
            </EpistoFlex2>

            <EpistoFlex2 align="center">

                {/* progress bar */}
                <EpistoProgressBar
                    variant="determinate"
                    value={value}
                    style={{
                        flex: '1',
                        marginRight: '10px'
                    }} />

                {/* progress percentage */}
                <EpistoFont>
                    {`${roundValue}%`}
                </EpistoFont>
            </EpistoFlex2>
        </EpistoFlex2>
    );
};