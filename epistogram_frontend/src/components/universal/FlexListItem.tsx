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
        minH={100}
        pointerEvents={isLocked ? "none" : "all"}
        onClick={onClick}
        borderBottom="1px solid #eaeaea"
        {...css}>

        <Flex minW={60} alignItems={"center"} justifyContent={"center"}>
            {setIsChecked && <Checkbox
                checked={isChecked}
                onChange={x => setIsChecked(x.currentTarget.checked)}
                style={{ alignSelf: "center" }} />}
        </Flex>

        <Flex w={100} alignItems={"center"} justifyContent={"center"}>
            {thumbnail}
        </Flex>

        <Box flex="1">
            {midContent}
        </Box>

        {endContent}
    </Flex>
}
