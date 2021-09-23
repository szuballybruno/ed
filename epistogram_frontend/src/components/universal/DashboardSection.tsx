import { Box, FlexProps } from "@chakra-ui/react";
import { EpistoHeader } from "../administration/universal/EpistoHeader";
import { FlexFloat } from "./FlexFloat";

export const DashboardSection = (props: FlexProps & { title: string }) => {

    const { title, children, ...css } = props;

    return <FlexFloat
        direction="column"
        borderRadius="none"
        p="10px"
        mb="10px"
        {...css}>
        <EpistoHeader text={title} showDivider variant="strongSub" />
        <Box className="whall">
            {children}
        </Box>
    </FlexFloat>
}