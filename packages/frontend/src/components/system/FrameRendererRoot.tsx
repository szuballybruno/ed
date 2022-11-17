import { FC, PropsWithChildren, ReactNode, useEffect, useMemo } from 'react';
import { eventBus, GlobalEventManagerType } from '../../static/EventBus';
import { Logger } from '../../static/Logger';
import { XDialogHost } from '../lib/XDialog/XDialogHost';
import { VideoPlayerFullscreenContextFrame } from '../player/watch/videoPlayer/VideoPlayerFullscreenFrame';
import { AuthenticationFrame } from './AuthenticationFrame';
import { AutoScrollFrame } from './AutoScrollContext';
import { CurrentCourseItemFrame } from './CurrentCourseItemFrame';
import { ErrorDialogFrame } from './ErrorDialogFrame';
import { EventListener } from './EventListener';
import { InitFrame } from './InitFrame';
import { BusyBarFrame } from './LoadingFrame/BusyBarFrame';
import { ChakraProviderFrame, LocalizationFrame, QueryClienProviderFrame, RoutingFrame } from './MiscFrames';
import { MUISetupFrame } from './MUISetupFrame';
import { NotificationsFrame } from './NotificationsFrame';
import { ProgressierFrame } from './ProgressierFrame';
import { QuerySubscriptionFrame } from './QuerySubscriptionFrame';
import { ServiceContainerFrame } from './ServiceContainerFrame';
import { SessionWatcherFrame } from './SessionWatcher';
import { TawkToFrame } from './TawkToFrame';
import { TitleSetterFrame } from './TitleSetterFrame';
import { UserGuidingFrame } from './UserGuidingFrame';

type FrameType = FC<{ children: ReactNode, prevFrameNames: string[] }>;

const checkFrameDeps = (currentFrame: FrameType, prevFrameNames: string[], deps: (string | FrameType)[]) => {

    deps
        .forEach(dep => {

            const name = typeof dep === 'string' ? dep : dep.name;

            if (!prevFrameNames.includes(name))
                throw new Error(`${currentFrame.name} -> Dependency frame not found: ${name}!`);
        });
};

const getFrames = (globalEventManager: GlobalEventManagerType): FrameType[] => {

    const QuerySubscriptionFrameWrapper: FrameType = ({ children, prevFrameNames }) => {

        checkFrameDeps(QuerySubscriptionFrameWrapper, prevFrameNames, [CurrentCourseItemFrame]);

        return (
            <QuerySubscriptionFrame
                globalEventManager={globalEventManager}>
                {children}
            </QuerySubscriptionFrame>
        );
    };

    const ServiceContainerFrameWrapper = ({ children }: PropsWithChildren) => <ServiceContainerFrame
        globalEventManager={globalEventManager}>{children}</ServiceContainerFrame>;

    return [
        MUISetupFrame,
        ChakraProviderFrame,
        InitFrame,
        UserGuidingFrame,
        LocalizationFrame,
        QueryClienProviderFrame,
        RoutingFrame,
        TawkToFrame,
        XDialogHost,
        TitleSetterFrame,
        ServiceContainerFrameWrapper,
        SessionWatcherFrame,
        ErrorDialogFrame,
        NotificationsFrame,
        BusyBarFrame,
        AutoScrollFrame,
        EventListener,
        ProgressierFrame,
        VideoPlayerFullscreenContextFrame,
        AuthenticationFrame,
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
                    .filter((_, i) => i < currentFrameIndex)
                    .map(x => x.name);

                console.log(CurrentFrameElement.name, prevFrameNames);

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
    const frames = useMemo(() => getFrames(eventBus), []);
    const frameElements = useMemo(() => getFrameElements(frames), []);

    return <>
        {getNextFrame(frameElements, 0, children)}
    </>;
};