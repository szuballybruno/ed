import { Flex, FlexProps } from "@chakra-ui/layout";
import { Box } from "@chakra-ui/react";
import { ReactNode } from "react";
import { FlexImage } from "./FlexImage";

export const FlexListItem = (props: FlexProps & {
    thumbnailUrl?: string,
    onClick?: () => void,
    isLocked?: boolean,
    endContent?: ReactNode,
    midContent?: ReactNode,
    thumbnailBasis?: string
}) => {

    const { onClick, isLocked, thumbnailUrl, endContent, midContent, thumbnailBasis, ...css } = props;

    return <Flex
        id="flexListItem"
        className="shadowOnHover"
        cursor="pointer"
        align="stretch"
        p="10px"
        pointerEvents={isLocked ? "none" : "all"}
        onClick={onClick}
        borderBottom="1px solid #eaeaea"
        {...css}>

        {thumbnailUrl && <FlexImage mr="10px" url={thumbnailUrl} flexBasis={thumbnailBasis ?? "50px"} />}

        <Box flex="1">
            {midContent}
        </Box>

        {endContent}
    </Flex>
}