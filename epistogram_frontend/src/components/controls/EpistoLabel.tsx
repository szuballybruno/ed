import { Flex, FlexProps } from "@chakra-ui/react";
import { EpistoFont } from "./EpistoFont";

export const EpistoLabel = (props: { text: string } & FlexProps) => {

    const { text, ...css } = props;

    return <Flex mt="10px" direction="column" {...css}>
        <EpistoFont>

            {text}
        </EpistoFont>

        {props.children}
    </Flex>
}