import { Box, BoxProps } from "@chakra-ui/react";

export const FlexImage = (props: BoxProps & { url: string, fit?: "cover" | "contain" }) => {

    const { url, fit, ...boxProps } = props;

    return <Box position="relative"
{...boxProps}>
        <Box position="absolute"
top="0"
height="100%"
width="100%">
            <img style={{ width: "100%", height: "100%", objectFit: fit ? fit : "contain" }}
src={url}
alt="" />
        </Box>
    </Box>;
};