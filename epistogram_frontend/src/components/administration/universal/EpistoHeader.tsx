import { Flex, FlexProps } from "@chakra-ui/layout"
import { Divider, Typography } from "@mui/material"

export const EpistoHeader = (props: { text: string, showDivider?: boolean } & FlexProps) => {

    const { text, showDivider, ...css } = props;

    return <Flex id="epistoHeaderRoot" p="20px" {...css}>
        <Typography variant={"h5"}>
            {text}
        </Typography>
        {showDivider && <Divider />}
    </Flex>
}