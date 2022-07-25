import { Flex, FlexProps } from '@chakra-ui/layout';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { LinearProgress } from '@mui/material';
import { useNavigation } from '../../services/core/navigatior';
import { EpistoButton } from '../controls/EpistoButton';
import { EpistoFont } from '../controls/EpistoFont';

export const CourseProgressDisplay = (props: {
    value: number,
    label: string,
    continueItemCode: string
} & FlexProps) => {

    const { value, label, continueItemCode, ...css } = props;
    const roundValue = Math.round(value);

    const { navigateToPlayer } = useNavigation();

    const continueCourse = () => {

        navigateToPlayer(continueItemCode);
    };

    return (
        <Flex
            direction="column"
            {...css}>

            <Flex align="center">

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
            </Flex>

            <Flex align="center">

                {/* progress bar */}
                <LinearProgress
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
            </Flex>
        </Flex>
    );
};