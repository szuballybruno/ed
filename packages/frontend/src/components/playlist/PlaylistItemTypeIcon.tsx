import { EpistoFlex2, EpistoFlex2Props } from '../controls/EpistoFlex';

export const PlaylistItemTypeIcon = (props: {
    color: string
} & EpistoFlex2Props) => {

    const { color, ...css } = props;

    return <EpistoFlex2
        alignSelf="stretch"
        className="roundBorders"
        padding="3px"
        margin="7px 10px 7px 0px"
        bgColor={color}
        {...css} />;
};