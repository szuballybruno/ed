import { Flex, FlexProps } from "@chakra-ui/react";
import { Typography } from "@mui/material";
import { ReactNode } from "react";
import {EpistoHeader} from "../../EpistoHeader";


export const EditSection = (props: {
    title: string,
    children: ReactNode
} & FlexProps) => {

    const { children, title, ...css } = props;

    return <Flex direction="column" mt="40px" {...css}>

        <EpistoHeader text={title} showDivider variant="strongSub" m="5px 10px 20px 0" />

        {/*<Typography variant={"overline"}>
            {title}
        </Typography>*/}

        {children}

    </Flex>
}
