import { Id } from '@episto/commontypes';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { HelperHooks } from '../../../helpers/hooks';
import { PlaybackApiService } from '../../../services/api/playbackApiService';
import { Logger } from '../../../static/Logger';

// the rate in which new samples are taken
const SAMPLE_RATE_SECONDS = 5;

// the minimum seconds that count as a valid sample
const MIN_SAMPLE_SIZE_SECONDS = 1;

export const usePlaybackWatcher = (props: {
    playedSeconds: number;
    isPlaying: boolean;
    onVideoWatchedStateChanged: () => void,
    setMaxWatchedSeconds: (maxWatchedSeconds: number) => void,
    isSamplingEnabled: boolean,
    videoVersionId: Id<'VideoVersion'>,
    videoPlaybackSessionId: Id<'VideoPlaybackSession'>
}) => {

    const {
        playedSeconds,
        isPlaying,
        onVideoWatchedStateChanged,
        setMaxWatchedSeconds,
        isSamplingEnabled,
        videoVersionId,
        videoPlaybackSessionId
    } = props;

    const [lastSamplePlayedSeconds, setLastSamplePlayedSeconds] = useState(0);

    // post funciton
    const { postVideoPlaybackSample, videoSamplingResult } = PlaybackApiService
        .usePostVideoPlaybackSample();

    const {
        isWatchedStateChanged,
        maxWathcedSeconds
    } = videoSamplingResult ?? {
        isWatchedStateChanged: false,
        maxWathcedSeconds: 0
    };

    /**
     * Calc elapsed seconds 
     */
    const elapsedSecondsFromLastSample = useMemo(() => {

        const elapsedSeconds = Math
            .abs(lastSamplePlayedSeconds - playedSeconds);

        const elapsedSecondsRound = Math
            .round(elapsedSeconds * 10) / 10;

        return elapsedSecondsRound;
    }, [playedSeconds, lastSamplePlayedSeconds]);

    /**
     * Save a playback sample 
     */
    const samplePlayedSeconds = useCallback(() => {

        if (!isSamplingEnabled)
            return;

        if (elapsedSecondsFromLastSample < MIN_SAMPLE_SIZE_SECONDS) {

            Logger.logScoped('PLAYBACK', `Sampling cancelled, size too small: ${elapsedSecondsFromLastSample}s.`);
            return;
        }

        setLastSamplePlayedSeconds(playedSeconds);

        Logger.logScoped('PLAYBACK', `Sampling... Size ${elapsedSecondsFromLastSample}s.`);

        postVideoPlaybackSample({
            fromSeconds: lastSamplePlayedSeconds,
            toSeconds: playedSeconds,
            videoVersionId,
            videoPlaybackSessionId
        });
    }, [
        isSamplingEnabled,
        lastSamplePlayedSeconds,
        elapsedSecondsFromLastSample,
        playedSeconds,
        postVideoPlaybackSample,
        videoPlaybackSessionId,
        videoVersionId
    ]);

    const isPlayingChanged = HelperHooks
        .useIsChanged(isPlaying);

    /**
     * force sample at playback changes
     */
    if (isPlayingChanged) {

        Logger.logScoped('PLAYBACK', `Sampling triggered by Start/stop... elapsed: ${elapsedSecondsFromLastSample} current: ${playedSeconds} last: ${lastSamplePlayedSeconds}`);
        samplePlayedSeconds();
    }

    /**
     * Sample playback when played seconds 
     * reaches a specific threshold from last sample  
     */
    useEffect(() => {

        const isRedyToSample = elapsedSecondsFromLastSample > SAMPLE_RATE_SECONDS;
        if (!isRedyToSample)
            return;

        Logger.logScoped('PLAYBACK', 'Sampling triggered by playback auto sampling...');

        samplePlayedSeconds();
    }, [lastSamplePlayedSeconds, samplePlayedSeconds, playedSeconds, elapsedSecondsFromLastSample]);

    /**
     * Watch for max watched seconds 
     */
    useEffect(() => {

        setMaxWatchedSeconds(maxWathcedSeconds);
    }, [setMaxWatchedSeconds, maxWathcedSeconds]);

    /**
     * Watch for video state changes
     */
    useEffect(() => {

        if (!isWatchedStateChanged)
            return;

        Logger.logScoped('PLAYBACK', 'Triggering is watched state change...');

        onVideoWatchedStateChanged();
    }, [onVideoWatchedStateChanged, isWatchedStateChanged]);
};