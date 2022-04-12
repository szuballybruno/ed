import ReactPlayer from 'react-player';

export type PlayerData = {
    played: number;
    playedSeconds: number;
    loaded: number;
    loadedSeconds: number;
}

type PropsType = React.ComponentProps<typeof ReactPlayer>;

export const EpistoReactPlayer = (params: {
    playerRef?: React.MutableRefObject<ReactPlayer | null>
} & PropsType) => {

    const { playerRef, ...asd } = params;
    const ReactPlayerWrapped = (ReactPlayer as any) as ((props: PropsType) => JSX.Element);

    return <ReactPlayerWrapped
        ref={playerRef}
        {...asd} />;
};