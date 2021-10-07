import { Flex, FlexProps } from "@chakra-ui/layout"
import { Divider, Typography } from "@mui/material"

export const EpistoHeader = (props: {
    text: string,
    variant?: "main" | "sub" | "strongSub"
    showDivider?: boolean
} & FlexProps) => {

    const { text, showDivider, variant, ...css } = props;

    return <Flex id="epistoHeaderRoot" direction="column" {...css}>

        <Typography
            variant={variant === "main" ? "h5" : "h6"}
            className="fontLarge"
            style={{
                fontWeight: "normal",
                color: variant === "sub" ? "var(--intenseGray)" : "black"
            }}>
            {text}
        </Typography>

        {!!showDivider && <Divider style={{ marginTop: "10px" }} />}
    </Flex>
}