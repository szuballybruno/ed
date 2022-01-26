import { Flex, Text } from "@chakra-ui/react";
import React, { ReactNode } from "react";

export const ExamLayoutContent = (props: {
    children: ReactNode,
    title: string
}) => {

    const { children, title } = props;

    return (
        <Flex
            direction={"column"}
            alignItems={"center"}
            justifyContent={"center"}
            width={"80%"}
            flex={1}>

            {/* header */}
            <Flex
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
                direction={"row"}
                justifyContent={"center"}
                pt={10}
                width="100%"
                mx={200}>

                {children}
            </Flex>
        </Flex>
    )
}