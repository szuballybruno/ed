import { CSSProperties } from '@emotion/serialize';
import ReactPlayer from 'react-player';

export type PlayerData = {
    played: number;
    playedSeconds: number;
    loaded: number;
    loadedSeconds: number;
}

export const EpistoReactPlayer = (params: {
    url: string;
    width?: string;
    height?: string;
    controls?: boolean;
    progressInterval?: number;
    style?: CSSProperties;
    playbackRate?: number;
    ref?: any;
    volume?: number;
    muted?: boolean;
    playing?: boolean;
    config?: any;
    loop?: boolean;
    onProgress?: (data: PlayerData) => void;
    onReady?: (player: ReactPlayer) => void;
    onEnded?: () => void;
}) => {

    const { style, ...others } = params;
    const asd = { style: style as any, ...others };

    type PropsType = typeof asd;

    const RP = (ReactPlayer as any) as ((props: PropsType) => JSX.Element);

    return <RP {...asd} />;
};
// width={width}
// height={height}
// controls={controls}
// onProgress={onProgress}
// progressInterval={progressInterval}
// style={style as any}
// url={url} 