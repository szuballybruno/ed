import { FC, PropsWithChildren, ReactNode, useEffect, useMemo } from 'react';
import { Logger } from '../../static/Logger';
import { XDialogHosterFrame } from '../lib/XDialog/XDialogHosterFrame';
import { VideoPlayerFullscreenContextFrame } from '../player/watch/videoPlayer/VideoPlayerFullscreenFrame';
import { AuthenticationFrame } from './AuthenticationFrame';
import { AutoScrollFrame } from './AutoScrollContext';
import { CurrentCourseItemFrame } from './CurrentCourseItemFrame';
import { ErrorDialogFrame } from './ErrorDialogFrame';
import { EventListener } from './EventListener';
import { EventManagerFrame } from './EventManagerFrame';
import { InitFrame } from './InitFrame';
import { BusyBarFrame } from './LoadingFrame/BusyBarFrame';
import { ChakraProviderFrame, LocalizationFrame, QueryClienProviderFrame, RoutingFrame } from './MiscFrames';
import { MUISetupFrame } from './MUISetupFrame';
import { NotificationsFrame } from './NotificationsFrame';
import { ProgressierFrame } from './ProgressierFrame';
import { QuerySubscriptionFrame } from './QuerySubscriptionFrame';
import { ServiceContainerFrame } from './ServiceContainerFrame';
import { SessionWatcherFrame } from './SessionWatcher';
import { TitleSetterFrame } from './TitleSetterFrame';
import { UserGuidingFrame } from './UserGuidingFrame';

type FrameType = FC<{ children: ReactNode, prevFrameNames: FrameType[] }>;

const checkFrameDeps = (currentFrame: FrameType, prevFrameNames: FrameType[], deps: (string | FrameType)[]) => {

    deps
        .forEach(dep => {

            const name = typeof dep === 'string' ? dep : dep.name;

            if (!prevFrameNames
                .map(x => x.name)
                .includes(name))
                throw new Error(`${currentFrame.name} -> Dependency frame not found: ${name}!`);
        });
};

const getFrames = (): FrameType[] => {

    const DepsWrapper = ({ children, frame, prevFrameNames, deps }: PropsWithChildren & { frame: FrameType, prevFrameNames: FrameType[], deps: FrameType[] }) => {

        const Frame = frame;
        checkFrameDeps(Frame, prevFrameNames, deps);

        return (
            <Frame prevFrameNames={[]}>
                {children}
            </Frame>
        );
    };

    const QuerySubscriptionFrameWrapper: FrameType = ({ children, prevFrameNames }) => <DepsWrapper
        prevFrameNames={prevFrameNames}
        deps={[CurrentCourseItemFrame, EventManagerFrame]}
        frame={QuerySubscriptionFrame}>
        {children}
    </DepsWrapper>;

    const AuthenticationFrameWrapper: FrameType = ({ children, prevFrameNames }) => <DepsWrapper
        prevFrameNames={prevFrameNames}
        deps={[EventManagerFrame]}
        frame={AuthenticationFrame}>
        {children}
    </DepsWrapper>;

    const ServiceContainerFrameWrapper: FrameType = ({ children, prevFrameNames }) => <DepsWrapper
        prevFrameNames={prevFrameNames}
        deps={[EventManagerFrame]}
        frame={ServiceContainerFrame}>
        {children}
    </DepsWrapper>;

    const SessionWatcherFrameWrapper: FrameType = ({ children, prevFrameNames }) => <DepsWrapper
        prevFrameNames={prevFrameNames}
        deps={[EventManagerFrame]}
        frame={SessionWatcherFrame}>
        {children}
    </DepsWrapper>;

    return [
        MUISetupFrame,
        ChakraProviderFrame,
        InitFrame,
        UserGuidingFrame,
        EventManagerFrame,
        LocalizationFrame,
        QueryClienProviderFrame,
        RoutingFrame,
        // TawkToFrame,
        XDialogHosterFrame,
        TitleSetterFrame,
        ServiceContainerFrameWrapper,
        SessionWatcherFrameWrapper,
        ErrorDialogFrame,
        NotificationsFrame,
        BusyBarFrame,
        AutoScrollFrame,
        EventListener,
        ProgressierFrame,
        VideoPlayerFullscreenContextFrame,
        AuthenticationFrameWrapper,
        CurrentCourseItemFrame,
        QuerySubscriptionFrameWrapper,
    ];
};

/**
 * Wrap frames
 */
const getFrameElements = (frames: FrameType[]) => {

    return frames
        .map((CurrentFrameElement, currentFrameIndex) => {

            const FrameElement = ({ children }: PropsWithChildren) => {

                Logger.logScoped('RENDER', `Rendering frame: ${CurrentFrameElement.name}`);

                useEffect(() => {

                    Logger.logScoped('RENDER', `Mounting frame: ${CurrentFrameElement.name}`);

                    return () => {

                        Logger.logScoped('RENDER', `Unmounting frame: ${CurrentFrameElement.name}`);
                    };
                }, []);

                const prevFrameNames = frames
                    .filter((_, i) => i < currentFrameIndex);

                return <CurrentFrameElement
                    prevFrameNames={prevFrameNames}>
                    {children}
                </CurrentFrameElement>;
            };

            return FrameElement;
        });
};

/**
 * Get next frame function
 */
const getNextFrame = (frameElements: any[], index: number, lastChild: ReactNode) => {

    if (index >= frameElements.length)
        return lastChild;

    const FrameElement = frameElements[index];

    return <FrameElement>
        {getNextFrame(frameElements, index + 1, lastChild)}
    </FrameElement>;
};

export const FrameRendererRoot = ({ children }: PropsWithChildren) => {

    /**
     * Get frames
     */
    const frames = useMemo(() => getFrames(), []);
    const frameElements = useMemo(() => getFrameElements(frames), []);

    return <>
        {getNextFrame(frameElements, 0, children)}
    </>;
};