import {Flex} from "@chakra-ui/react";
import React from "react";
import {Typography} from "@mui/material";

export const CourseDetailsBriefingInfoItem = (props: {
    icon?: string,
    title: string,
    subTitle?: string,
    iconComponent?: React.ReactNode
}) => {
    return <Flex direction={"row"}
                 w={200}
                 h={60}
                 bg={"white"}
                 borderWidth={1}
                 borderRadius={5}
                 shadow={"#00000024 0px 0px 3px 0px"}>

        {props.icon && <Flex w={60} h={60} alignItems={"center"} justifyContent={"center"}>
            <img src={props.icon} alt={""} style={{
                width: 50,
                height: 50
            }} />
        </Flex>}

        {props.iconComponent && <Flex w={60} alignItems={"center"} justifyContent={"center"}>
            {props.iconComponent}
        </Flex>}

        <Flex ml={5} w={135} direction={"column"} justifyContent={"center"} alignItems={"flex-start"}>
            <Typography fontSize={12} fontWeight={"bold"}>{props.title}</Typography>
            <Typography fontSize={12}>{props.subTitle}</Typography>
        </Flex>
    </Flex>
}
