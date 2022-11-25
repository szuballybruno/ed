import { VideoPlaybackSample } from '../models/entity/playback/VideoPlaybackSample';

export class SampleMergeService {

    private _SAMPLE_THRESHOLD_SECONDS = 1;

    mergeSamples(samples: VideoPlaybackSample[]) {

        let allOverlappingIndices: number[] = [];
        const resultSamples: VideoPlaybackSample[] = [];

        for (let sampleIndex = 0; sampleIndex < samples.length; sampleIndex++) {

            const currentSample = samples[sampleIndex];

            // ignore previously overlapping samples
            if (allOverlappingIndices.any(x => x === sampleIndex))
                continue;

            // samples that are overlapping with current 
            const overlappingSamples = samples
                .map((sample, index) => {

                    if (index <= sampleIndex)
                        return;

                    if (allOverlappingIndices
                        .any(overlappingIndex => overlappingIndex === index))
                        return;

                    return {
                        isOverlapping: this._isOverlapping(currentSample, sample),
                        sample: sample,
                        index
                    };
                })
                .filter(x => x?.isOverlapping);

            // save overlapping indices
            const overlappingIndices = overlappingSamples
                .map(x => x!.index);

            allOverlappingIndices = [...allOverlappingIndices, ...overlappingIndices];

            // to res -> squis overlapping or current sample 
            resultSamples
                .push(overlappingSamples.length > 0
                    ? this._squisOverlapping([currentSample, ...overlappingSamples.map(x => x!.sample)])
                    : currentSample);
        }

        return resultSamples;
    }

    private _squisOverlapping(overlappingSamples: VideoPlaybackSample[]) {

        const min = overlappingSamples
            .orderBy(x => x.fromSeconds)
            .first();

        const max = overlappingSamples
            .orderBy(x => x.toSeconds)
            .last();

        return {
            fromSeconds: min.fromSeconds,
            toSeconds: max.toSeconds
        } as VideoPlaybackSample;
    }

    private _isOverlapping(sampleA: VideoPlaybackSample, sampleB: VideoPlaybackSample) {

        // case 1
        const inRangeAndWatchedBefore = this
            ._inRange(sampleA.fromSeconds, sampleA.toSeconds, sampleB.toSeconds) && sampleB.fromSeconds < sampleA.fromSeconds;

        if (inRangeAndWatchedBefore)
            return true;

        // case 2
        const inRangeAndWatchedAfter = this
            ._inRange(sampleA.fromSeconds, sampleA.toSeconds, sampleB.fromSeconds) && sampleB.toSeconds > sampleA.toSeconds;

        if (inRangeAndWatchedAfter)
            return true;

        // case 3
        const superset = sampleB.fromSeconds < sampleA.fromSeconds && sampleB.toSeconds > sampleA.toSeconds;

        if (superset)
            return true;


        // case 3
        const subset = sampleB.fromSeconds > sampleA.fromSeconds && sampleB.toSeconds < sampleA.toSeconds;

        if (subset)
            return true;

        return false;
    }

    private _inRange(rangeMin: number, rangeMax: number, value: number) {

        return rangeMin - this._SAMPLE_THRESHOLD_SECONDS < value
            && rangeMax + this._SAMPLE_THRESHOLD_SECONDS > value;
    }
}