import { Flex, FlexProps } from "@chakra-ui/react";
import { Typography } from "@mui/material";

export const EpistoLabel = (props: { text: string } & FlexProps) => {

    const { text, ...css } = props;

    return <Flex mt="10px" direction="column" {...css}>
        <Typography
            variant={"overline"}>

            {text}
        </Typography>

        {props.children}
    </Flex>
}