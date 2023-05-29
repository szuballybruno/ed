import { useEffect } from 'react';
import { Id } from '@episto/commontypes';
import { EpistoIcons } from '../../../../static/EpistoIcons';
import { useStateObject } from '../../../../static/frontendHelpers';
import { XEventManager } from '../../../../static/XEventManager/XEventManager';
import { EpistoButton } from '../../../controls/EpistoButton';
import { EpistoFlex2 } from '../../../controls/EpistoFlex';
import { EpistoFont } from '../../../controls/EpistoFont';
import { EpistoProgressBar } from '../../../controls/EpistoProgressBar';

const trim = (str: string, len: number) => {

    if (str.length > len)
        return str.substring(0, len) + '...';

    return str;
};

export const VideoUploadProgressNotification = ({
    defaultPercentage,
    videoTitle,
    eventManager,
    videoVersionId,
    onClose
}: {
    videoVersionId: Id<'VideoVersion'>,
    videoTitle: string,
    defaultPercentage: number,
    eventManager: XEventManager<'onProgressChanged' | 'onError' | 'onDone'>,
    onClose: () => void
}) => {

    // const forceUpdate = useForceUpdate();
    const [{ percentage, buffer, isErroredOut, isDone, ...state }, setState] = useStateObject({
        percentage: defaultPercentage,
        buffer: 0,
        isErroredOut: false,
        isDone: false,
        videoVersionId,
    });

    const isLoading = !(isErroredOut || isDone);
    const subscriberId = `${VideoUploadProgressNotification.name}_${videoVersionId}`;

    useEffect(() => {

        eventManager
            .subscribeEvent('onProgressChanged', subscriberId, ({ progress, buffer, videoVersionId }: { progress: number, buffer: number, videoVersionId: Id<'VideoVersion'> }) => {

                if (state.videoVersionId !== videoVersionId)
                    return;

                setState({
                    percentage: progress,
                    buffer
                });
            });

        eventManager
            .subscribeEvent('onError', subscriberId, ({ videoVersionId }: { videoVersionId: Id<'VideoVersion'> }) => {

                if (state.videoVersionId !== videoVersionId)
                    return;

                setState({
                    isErroredOut: true
                });
            });

        eventManager
            .subscribeEvent('onDone', subscriberId, ({ videoVersionId }: { videoVersionId: Id<'VideoVersion'> }) => {

                if (state.videoVersionId !== videoVersionId)
                    return;

                console.log(`Immad headone state verid: ${state.videoVersionId} param verid: ${videoVersionId}`);

                setState({
                    isDone: true,
                    percentage: 100
                });
            });
    }, []);

    const stateIndicatorColor = isErroredOut
        ? 'var(--mildRed)'
        : 'var(--mildGreen)';

    return (
        <EpistoFlex2
            direction="column"
            className="whall">

            <EpistoFlex2
                align="center"
                marginBottom="5px">

                <EpistoIcons.Upload />

                <EpistoFont
                    margin='0 0 0 10px'
                    style={{
                        flex: 1
                    }}>

                    Video {`'${trim(videoTitle, 20)}'`}
                </EpistoFont>

                {!isLoading && <EpistoButton
                    onClick={onClose}>
                    <EpistoIcons.Close />
                </EpistoButton>}
            </EpistoFlex2>

            <EpistoFlex2
                width="100%"
                align="center">

                {!isLoading && <EpistoFont
                    style={{
                        borderRadius: '5px',
                        border: `1px solid ${stateIndicatorColor}`,
                        color: stateIndicatorColor,
                        marginRight: '5px',
                        padding: '0 3px 0 3px'
                    }}>
                    {isErroredOut ? 'Upload failed!' : 'Upload successful!'}
                </EpistoFont>}

                <EpistoFlex2
                    flex="1"
                    pos="relative">

                    {isLoading && <EpistoProgressBar
                        sx={{
                            width: '100%',
                            position: 'absolute',
                            top: 0
                        }}
                        color={isErroredOut ? 'error' : undefined} />}

                    <EpistoProgressBar
                        sx={{
                            width: '100%',
                            position: 'absolute',
                            top: 0,
                            background: 'transparent'
                        }}
                        color={isErroredOut
                            ? 'error'
                            : isDone
                                ? 'success'
                                : undefined}
                        variant="determinate"
                        value={percentage} />
                </EpistoFlex2>

                <EpistoFont>
                    {percentage}%
                </EpistoFont>
            </EpistoFlex2>
        </EpistoFlex2>
    );
};