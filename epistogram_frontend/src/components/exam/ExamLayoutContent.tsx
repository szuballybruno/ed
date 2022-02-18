import { Flex, Text } from "@chakra-ui/react";
import React, { CSSProperties, ReactNode } from "react";

export const ExamLayoutContent = (props: {
    children: ReactNode,
    title: string,
    style?: CSSProperties
}) => {

    const { children, title, style } = props;

    return (
        <Flex
            id="examLayoutContentRoot"
            direction={"column"}
            alignItems={"center"}
            justifyContent={"center"}
            width={"80%"}
            flex={1}
            style={style}>

            {/* header */}
            <Flex
                id="examLayoutContentHeader"
                p="20px"
                align="center">

                <img
                    style={{
                        borderRadius: "50%",
                        padding: "8px",
                        width: "50px",
                        height: "50px",
                        marginRight: "30px"
                    }}
                    alt=""
                    src="https://static.thenounproject.com/png/92068-200.png"
                    className="tinyShadow" />

                <Text
                    as="text"
                    fontSize={"1.3rem"}>
                    {title}
                </Text>
            </Flex>

            {/* answers */}
            <Flex
                id="examLayoutContentContainer"
                direction={"row"}
                justifyContent={"center"}
                pt={10}
                width="100%">

                {children}
            </Flex>
        </Flex>
    )
}