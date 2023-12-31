import { ReactTimerType } from '../../helpers/reactTimer';
import { EpistoDiv } from '../controls/EpistoDiv';
import { EpistoFlex2, EpistoFlex2Props } from '../controls/EpistoFlex';

export const TimeoutFrame = (props: { reactTimer: ReactTimerType } & EpistoFlex2Props) => {

    const { reactTimer, children, ...css } = props;

    const pauseTimeout = () => {

        reactTimer.pause();
    };

    const resumeTimeout = () => {

        reactTimer.start();
    };

    return <EpistoFlex2
        position="relative"
        onMouseEnter={() => pauseTimeout()}
        onMouseLeave={() => resumeTimeout()}
        {...css}>

        <EpistoDiv
            position="absolute"
            top="0"
            className="whall pauseAnimation"
            bg="var(--mildGrey)"
            style={{
                animationName: reactTimer.isIdle ? '' : 'rightSlideAnimation',
                animationDuration: `${reactTimer.maxMiliseconds / 1000}s`,
                animationTimingFunction: 'linear',
                animationPlayState: reactTimer.isRunning ? 'running' : 'paused'
            }} />

        <EpistoDiv position="relative">
            {children}
        </EpistoDiv>
    </EpistoFlex2>;
};