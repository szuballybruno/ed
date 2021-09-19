import { Flex, FlexProps } from "@chakra-ui/layout";
import { Box } from "@chakra-ui/react";
import { ReactNode } from "react";
import { FlexImage } from "./FlexImage";

export const FlexListItem = (props: FlexProps & {
    thumbnailUrl: string,
    onClick?: () => void,
    isLocked?: boolean,
    endContent?: ReactNode,
    midContent?: ReactNode,
    thumbnailBasis?: string
}) => {

    const { onClick, isLocked, thumbnailUrl, endContent, midContent, thumbnailBasis, ...css } = props;

    return <Flex
        id="flexListItem"
        className="leftBorderOnHover"
        cursor="pointer"
        align="stretch"
        p="10px"
        pointerEvents={isLocked ? "none" : "all"}
        onClick={onClick}
        borderBottom="1px solid #eaeaea"
        {...css}>

        <FlexImage url={thumbnailUrl} flexBasis={thumbnailBasis ?? "50px"}></FlexImage>

        <Box flex="1" pl="20px">
            {midContent}
        </Box>

        {endContent}
    </Flex>
}