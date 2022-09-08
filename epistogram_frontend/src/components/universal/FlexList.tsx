import { FlexProps } from '@chakra-ui/react';
import { EpistoFlex2 } from '../controls/EpistoFlex';

export const FlexList = (props: FlexProps) => {

    return <EpistoFlex2
        id="courseItemListContainer"
        direction="column"
        {...props}>
        {props.children}
    </EpistoFlex2>;
};
