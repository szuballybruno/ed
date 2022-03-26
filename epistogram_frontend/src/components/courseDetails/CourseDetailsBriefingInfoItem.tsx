import { Flex } from "@chakra-ui/react";
import React, { ReactNode } from "react";
import { isString } from "../../static/frontendHelpers";
import { EpistoFont } from "../controls/EpistoFont";

export const CourseDetailsBriefingInfoItem = (props: {
    icon?: string | ReactNode,
    title: string,
    subTitle?: string
}) => {

    const { title, icon, subTitle } = props;

    return <Flex
        direction={"row"}
        width={200}
        height={60}
        bg={"white"}
        mr="5px"
        borderWidth={1}
        borderRadius={5}
        shadow={"#00000024 0px 0px 3px 0px"}>

        <Flex
            width={60}
            align={"center"}
            justify={"center"}>

            {/* compontnt icon */}
            {!isString(icon) && icon}

            {/* icon path */}
            {isString(icon) && <img
                src={icon as any}
                alt={""}
                className="square50" />}
        </Flex>

        <Flex
            ml={5}
            width={135}
            direction={"column"}
            justify={"center"}
            align={"flex-start"}>

            <EpistoFont
                fontSize={"fontExtraSmall"}
                style={{
                    fontWeight: "bold"
                }}>

                {title}
            </EpistoFont>

            <EpistoFont
                fontSize={"fontExtraSmall"}>

                {subTitle}
            </EpistoFont>
        </Flex>
    </Flex>
}
