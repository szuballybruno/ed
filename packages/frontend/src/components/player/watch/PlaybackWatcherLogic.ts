import { useEffect, useState } from 'react';
import { PlaybackApiService } from '../../../services/api/playbackApiService';
import { Id } from '@episto/commontypes';
import { isBetweenThreshold } from '../../../static/frontendHelpers';
import { Logger } from '../../../static/Logger';

export const usePlaybackWatcher = (
    playedSeconds: number,
    isPlaying: boolean,
    onVideoWatchedStateChanged: () => void,
    setMaxWatchedSeconds: (maxWatchedSeconds: number) => void,
    isSamplingEnabled: boolean,
    videoVersionId: Id<'VideoVersion'>,
    videoPlaybackSessionId: Id<'VideoPlaybackSession'>) => {

    // the rate in which new samples are taken
    const sampleRateSeconds = 5;

    // the maximum time that can pass between samples 
    // while the samples would still be considered valid 
    const maxSampleSeconds = sampleRateSeconds + (sampleRateSeconds / 2);

    // the minimum seconds that count as a valid sample
    const minSampleSeconds = 1;

    // the collection of taken samples
    const [lastSampleSeconds, setLastSampleSeconds] = useState(0);

    // post funciton
    const { postVideoPlaybackSample, videoSamplingResult } = PlaybackApiService.usePostVideoPlaybackSample();

    const samplePlayedSeconds = () => {

        if (!isSamplingEnabled)
            return;

        setLastSampleSeconds(playedSeconds);

        const elapsedSeconds = Math.round((playedSeconds - lastSampleSeconds) * 10) / 10;

        if (elapsedSeconds < maxSampleSeconds
            && elapsedSeconds > 0
            && elapsedSeconds > minSampleSeconds) {

            Logger.logScoped('PLAYBACK', `Watched ${elapsedSeconds}s`);

            postVideoPlaybackSample({
                fromSeconds: lastSampleSeconds,
                toSeconds: playedSeconds,
                videoVersionId,
                videoPlaybackSessionId
            });
        }
    };

    // force sample at playback changes
    useEffect(() => {

        samplePlayedSeconds();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isPlaying]);

    // sample
    useEffect(() => {

        // ordinary sample 
        if (isBetweenThreshold(playedSeconds, lastSampleSeconds, sampleRateSeconds))
            return;

        samplePlayedSeconds();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [playedSeconds]);

    // watched state changed 
    useEffect(
        () => {

            if (videoSamplingResult?.isWatchedStateChanged)
                onVideoWatchedStateChanged();

            if (videoSamplingResult?.maxWathcedSeconds)
                setMaxWatchedSeconds(videoSamplingResult.maxWathcedSeconds);

            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [videoSamplingResult?.isWatchedStateChanged, videoSamplingResult?.maxWathcedSeconds]);
};