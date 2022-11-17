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

type FrameType = FC<{ children: ReactNode }>;

const getFrames = (globalEventManager: GlobalEventManagerType): FrameType[] => {

    const QuerySubscriptionFrameWrapper = ({ children }: PropsWithChildren) => <QuerySubscriptionFrame
        globalEventManager={globalEventManager}>{children}</QuerySubscriptionFrame>;

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
        QuerySubscriptionFrameWrapper,
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
    ];
};

/**
 * Wrap frames
 */
const getFrameElements = (frames: FrameType[]) => {

    return frames
        .map(CurrentFrameElement => {

            const FrameElement = ({ children }: PropsWithChildren) => {

                Logger.logScoped('RENDER', `Rendering frame: ${CurrentFrameElement.name}`);

                useEffect(() => {

                    Logger.logScoped('RENDER', `Mounting frame: ${CurrentFrameElement.name}`);

                    return () => {

                        Logger.logScoped('RENDER', `Unmounting frame: ${CurrentFrameElement.name}`);
                    };
                }, []);

                return <CurrentFrameElement>
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

    // const globalEventManager = eventBus;

    // const QuerySubscriptionFrameWrapper = useMemo(() => ({ children }: PropsWithChildren) => <QuerySubscriptionFrame
    //     globalEventManager={globalEventManager}>
    //     {children}
    // </QuerySubscriptionFrame>, [globalEventManager]);

    // const ServiceContainerFrameWrapper = useMemo(() => ({ children }: PropsWithChildren) => <ServiceContainerFrame
    //     globalEventManager={globalEventManager}>
    //     {children}
    // </ServiceContainerFrame>, [globalEventManager]);

    /**
     * Get frames
     */
    const frames = useMemo(() => getFrames(eventBus), []);
    const frameElements = useMemo(() => getFrameElements(frames), []);

    return <>
        {getNextFrame(frameElements, 0, children)}
    </>;

    // return <>
    //     <MUISetupFrame>
    //         <ChakraProviderFrame>
    //             <InitFrame>
    //                 <UserGuidingFrame>
    //                     <LocalizationFrame>
    //                         <QueryClienProviderFrame>
    //                             <RoutingFrame>
    //                                 <TawkToFrame>
    //                                     <XDialogHost>
    //                                         <TitleSetterFrame>
    //                                             <ServiceContainerFrameWrapper>
    //                                                 <CurrentCourseItemFrame>
    //                                                     <QuerySubscriptionFrameWrapper>
    //                                                         <SessionWatcherFrame>
    //                                                             <ErrorDialogFrame>
    //                                                                 <NotificationsFrame>
    //                                                                     <BusyBarFrame>
    //                                                                         <AutoScrollFrame>
    //                                                                             <EventListener>
    //                                                                                 <ProgressierFrame>
    //                                                                                     <VideoPlayerFullscreenContextFrame>
    //                                                                                         <AuthenticationFrame>
    //                                                                                             {children}
    //                                                                                         </AuthenticationFrame>
    //                                                                                     </VideoPlayerFullscreenContextFrame>
    //                                                                                 </ProgressierFrame>
    //                                                                             </EventListener>
    //                                                                         </AutoScrollFrame>
    //                                                                     </BusyBarFrame>
    //                                                                 </NotificationsFrame>
    //                                                             </ErrorDialogFrame>
    //                                                         </SessionWatcherFrame>
    //                                                     </QuerySubscriptionFrameWrapper>
    //                                                 </CurrentCourseItemFrame>
    //                                             </ServiceContainerFrameWrapper>
    //                                         </TitleSetterFrame>
    //                                     </XDialogHost>
    //                                 </TawkToFrame>
    //                             </RoutingFrame>
    //                         </QueryClienProviderFrame>
    //                     </LocalizationFrame>
    //                 </UserGuidingFrame>
    //             </InitFrame>
    //         </ChakraProviderFrame>
    //     </MUISetupFrame>
    // </>;
};