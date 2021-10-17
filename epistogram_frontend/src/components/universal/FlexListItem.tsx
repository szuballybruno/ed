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

        <Flex minW={60} h={"100%"} direction={"column"} alignItems={"center"} justifyContent={"flex-start"}>
            {setIsChecked && <Checkbox
                checked={isChecked}
                onChange={x => setIsChecked(x.currentTarget.checked)}
                style={{ alignSelf: "center", marginTop: 23 }} />}
        </Flex>

        <Flex
            w={100}
            h={"100%"}
            direction={"column"}
            alignItems={"center"}
            justifyContent={"flex-start"}
        >
            {thumbnail}
        </Flex>

        <Flex flex="1" direction={"column"} alignItems={"center"} justifyContent={"flex-start"}>
            {midContent}
        </Flex>

        {endContent}
    </Flex>
}
