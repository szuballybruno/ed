import { EpistoFlex2, EpistoFlex2Props } from '../controls/EpistoFlex';

export const FlexList = (props: EpistoFlex2Props) => {

    return <EpistoFlex2
        id="courseItemListContainer"
        direction="column"
        {...props}>
        {props.children}
    </EpistoFlex2>;
};
