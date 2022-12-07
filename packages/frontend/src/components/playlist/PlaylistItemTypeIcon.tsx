import { EpistoFlex2, EpistoFlex2Props } from '../controls/EpistoFlex';

export const PlaylistItemTypeIcon = (props: {
    color: string
} & EpistoFlex2Props) => {

    const { color, ...css } = props;

    return <EpistoFlex2
        alignSelf="stretch"
        className="roundBorders"
        boxShadow="inset -1px -1px 2px 1px rgba(0,0,0,0.10)"
        padding="3px"
        margin="7px 10px 7px 0px"
        bgColor={color}
        {...css} />;
};