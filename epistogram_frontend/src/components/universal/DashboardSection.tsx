import { Box, FlexProps } from "@chakra-ui/react";
import { EpistoHeader } from "../EpistoHeader";
import { FlexFloat } from "./FlexFloat";

export const DashboardSection = (props: FlexProps & { title: string, variant?: "noShadow" | "normal" }) => {

    const { title, children, variant, ...css } = props;

    return <FlexFloat
        direction="column"
        borderRadius="none"
        p="10px"
        boxShadow={variant === "noShadow" ? "none" : undefined}
        {...css}>

        <EpistoHeader text={title} showDivider variant="strongSub" m="5px 10px 20px 10px" />

        <Box className="whall">
        
            {children}
        </Box>
    </FlexFloat>
}