import { Flex, Box } from "@chakra-ui/layout";
import { Typography } from "@mui/material";
import { ReactNode } from "react";
import { isString } from "../../frontendHelpers";

export const FlexListTitleSubtitle = (props: { title: string, subTitle: string | ReactNode }) => {

    return <Flex className="whall" direction="column">
        <Flex>
            <Typography variant={"button"}>
                {props.title}
            </Typography>
        </Flex>
        <Box>
            {isString(props.subTitle)
                ? <Typography variant={"caption"}>
                    {props.subTitle}
                </Typography>
                : props.subTitle}
        </Box>
    </Flex>;
}