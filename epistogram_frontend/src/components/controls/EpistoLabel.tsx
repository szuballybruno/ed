import { FlexProps } from '@chakra-ui/react';
import { EpistoFlex2 } from './EpistoFlex';
import { EpistoFont } from './EpistoFont';

export const EpistoLabel = (props: {
    text: string
    isOverline?: boolean
} & FlexProps) => {

    const { text, isOverline, ...css } = props;

    return <EpistoFlex2 mt="10px"
direction="column"
{...css}>
        <EpistoFont
            isUppercase={isOverline}
            fontSize={isOverline ? 'fontExtraSmall' : undefined}
            style={{
                marginTop: isOverline ? '10px' : undefined,
                letterSpacing: isOverline ? '1.2px' : undefined
            }}>

            {text}
        </EpistoFont>

        {props.children}
    </EpistoFlex2>;
};