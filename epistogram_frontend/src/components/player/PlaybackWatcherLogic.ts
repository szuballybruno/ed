import { useEffect, useRef, useState } from "react"
import { isBetweenThreshold } from "../../frontendHelpers";
import { usePostVideoPlaybackSample } from "../../services/playerService";

export const usePlaybackWatcher = (playedSeconds: number, isPlaying: boolean) => {

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
    const { postVideoPlaybackSampleAsync } = usePostVideoPlaybackSample();

    const samplePlayedSeconds = () => {

        setLastSampleSeconds(playedSeconds);

        const elapsedSeconds = Math.round((playedSeconds - lastSampleSeconds) * 10) / 10;

        if (elapsedSeconds < maxSampleSeconds
            && elapsedSeconds > 0
            && elapsedSeconds > minSampleSeconds) {

            console.log(`Watched ${elapsedSeconds}s`);
            postVideoPlaybackSampleAsync(lastSampleSeconds, playedSeconds);
        }
    }

    // force sample at playback changes
    useEffect(() => {

        samplePlayedSeconds();
    }, [isPlaying]);

    // sample
    useEffect(() => {

        // ordinary sample 
        if (isBetweenThreshold(playedSeconds, lastSampleSeconds, sampleRateSeconds))
            return;

        samplePlayedSeconds();

    }, [playedSeconds]);
}