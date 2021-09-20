import { Flex, FlexProps } from "@chakra-ui/layout"
import { Divider, Typography } from "@mui/material"

export const EpistoHeader = (props: {
    text: string,
    variant?: "main" | "sub"
    showDivider?: boolean
} & FlexProps) => {

    const { text, showDivider, variant, ...css } = props;

    return <Flex id="epistoHeaderRoot" direction="column" p="20px" {...css}>
        {variant === "sub"
            ? <Typography variant={"h6"} style={{ fontWeight: "normal", color: "var(--intenseGray)" }}>
                {text}
            </Typography>
            : <Typography variant={"h5"}>
                {text}
            </Typography>}

        {!!showDivider && <Divider />}
    </Flex>
}