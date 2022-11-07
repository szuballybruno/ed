import { createContext, PropsWithChildren, useContext, useState } from 'react';

export type VideoPlayerFullscreenContextType = ReturnType<typeof useVideoPlayerFullscreenState>;

export const VideoPlayerFullscreenContext = createContext<VideoPlayerFullscreenContextType>({} as VideoPlayerFullscreenContextType);

export const useVideoPlayerFullscreenState = () => {

    return useState(false);
};

export const useVideoPlayerFullscreenContext = () => {

    return useContext(VideoPlayerFullscreenContext);
};

export const VideoPlayerFullscreenContextFrame = ({ children }: PropsWithChildren) => {

    const state = useVideoPlayerFullscreenState();

    return <VideoPlayerFullscreenContext.Provider
        value={state}>

        {children}
    </VideoPlayerFullscreenContext.Provider>;
};