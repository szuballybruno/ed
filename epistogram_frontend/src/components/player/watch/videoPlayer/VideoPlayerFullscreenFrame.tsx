import { PropsWithChildren } from 'react';
import { useVideoPlayerFullscreenState, VideoPlayerFullscreenContext } from './videoPlayerState';

export const VideoPlayerFullscreenContextFrame = ({ children }: PropsWithChildren) => {

    const state = useVideoPlayerFullscreenState();

    return <VideoPlayerFullscreenContext.Provider
        value={state}>

        {children}
    </VideoPlayerFullscreenContext.Provider>;
};