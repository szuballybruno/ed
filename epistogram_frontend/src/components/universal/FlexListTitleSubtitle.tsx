import { Flex } from "@chakra-ui/layout";
import { Typography } from "@mui/material";
import { ReactNode } from "react";
import { isString } from "../../static/frontendHelpers";
import { EpistoFont } from "../controls/EpistoFont";

export const FlexListTitleSubtitle = (props: { title: string, subTitle: string | ReactNode }) => {

    return <Flex direction="column">

        <EpistoFont
            fontSize="fontSmallPlus"
            isUppercase
            style={{
                fontWeight: 500
            }}>

            {props.title}
        </EpistoFont>

        {isString(props.subTitle)
            ? <EpistoFont fontSize={"fontExtraSmall"}>
                {props.subTitle}
            </EpistoFont>
            : props.subTitle}
    </Flex>;
}
