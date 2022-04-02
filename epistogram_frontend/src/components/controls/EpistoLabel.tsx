import { Flex, FlexProps } from '@chakra-ui/react';
import { EpistoFont } from './EpistoFont';

export const EpistoLabel = (props: {
    text: string
    isOverline?: boolean
} & FlexProps) => {

    const { text, isOverline, ...css } = props;

    return <Flex mt="10px"
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
    </Flex>;
};