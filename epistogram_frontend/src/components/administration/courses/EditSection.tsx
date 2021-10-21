import { Flex, FlexProps } from "@chakra-ui/react";
import { Typography } from "@mui/material";
import { ReactNode } from "react";


export const EditSection = (props: {
    title: string,
    children: ReactNode
} & FlexProps) => {

    const { children, title, ...css } = props;

    return <Flex direction="column" mt="20px" {...css}>

        <Typography variant={"overline"}>
            {title}
        </Typography>

        {children}

    </Flex>
}