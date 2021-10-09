import { Flex, FlexProps } from "@chakra-ui/layout";
import { Box } from "@chakra-ui/react";
import { Checkbox } from "@mui/material";
import { ReactNode, useState } from "react";
import { FlexImage } from "./FlexImage";

export const FlexListItem = (props: FlexProps & {
    onClick?: () => void,
    isLocked?: boolean,
    thumbnail?: ReactNode,
    endContent?: ReactNode,
    midContent?: ReactNode,
    isChecked?: boolean,
    setIsChecked?: (isChecked: boolean) => void
}) => {

    const {
        onClick,
        isLocked,
        thumbnail,
        endContent,
        midContent,
        isChecked,
        setIsChecked,
        ...css } = props;

    return <Flex
        id="flexListItem"
        className="shadowOnHover"
        cursor="pointer"
        align="center"
        p="10px"
        pointerEvents={isLocked ? "none" : "all"}
        onClick={onClick}
        borderBottom="1px solid #eaeaea"
        {...css}>

        {setIsChecked && <Checkbox
            checked={isChecked}
            onChange={x => setIsChecked(x.currentTarget.checked)}
            style={{ alignSelf: "center" }} />}

        {thumbnail}

        <Box flex="1">
            {midContent}
        </Box>

        {endContent}
    </Flex>
}