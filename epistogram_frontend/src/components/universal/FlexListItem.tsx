import { Flex, FlexProps } from "@chakra-ui/layout";
import { Box } from "@chakra-ui/react";
import { Checkbox } from "@mui/material";
import { ReactNode, useState } from "react";
import { FlexImage } from "./FlexImage";

export const FlexListItem = (props: FlexProps & {
    thumbnailUrl?: string,
    onClick?: () => void,
    isLocked?: boolean,
    endContent?: ReactNode,
    midContent?: ReactNode,
    thumbnailBasis?: string,
    isChecked?: boolean,
    setIsChecked?: (isChecked: boolean) => void
}) => {

    const {
        onClick,
        isLocked,
        thumbnailUrl,
        endContent,
        midContent,
        thumbnailBasis,
        isChecked,
        setIsChecked,
        ...css } = props;

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

        {setIsChecked && <Checkbox
            checked={isChecked}
            onChange={x => setIsChecked(x.currentTarget.checked)}
            style={{ alignSelf: "center" }} />}

        {thumbnailUrl && <FlexImage height="100%" mr="10px" url={thumbnailUrl} flexBasis={thumbnailBasis ?? "50px"} />}

        <Box flex="1">
            {midContent}
        </Box>

        {endContent}
    </Flex>
}