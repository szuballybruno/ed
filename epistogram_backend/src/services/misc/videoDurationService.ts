import { getVideoDurationInSeconds } from 'get-video-duration';

export const getVideoLengthSecondsAsync = (url: string) => {

    return getVideoDurationInSeconds(url);
};