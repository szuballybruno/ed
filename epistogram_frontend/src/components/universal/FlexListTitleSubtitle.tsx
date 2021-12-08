import { Flex } from "@chakra-ui/layout";
import { Typography } from "@mui/material";
import { ReactNode } from "react";
import { isString } from "../../static/frontendHelpers";

export const FlexListTitleSubtitle = (props: { title: string, subTitle: string | ReactNode }) => {

    return <Flex direction="column">

        <Typography variant={"button"}>
            {props.title}
        </Typography>

        {isString(props.subTitle)
            ? <Typography variant={"caption"}>
                {props.subTitle}
            </Typography>
            : props.subTitle}
    </Flex>;
}
