import { Flex, FlexProps } from "@chakra-ui/react";
import { ReactNode } from "react";
import { EpistoHeader } from "../../EpistoHeader";

export const EditSection = (props: {
    title: string,
    children: ReactNode
} & FlexProps) => {

    const { children, title, ...css } = props;

    return <Flex
        direction="column"
        bg="white"
        p="20px"
        mt="10px"
        border="1px solid var(--mildGrey)"
        {...css}>

        <EpistoHeader
            text={title}
            showDivider
            variant="strongSub"
            m="5px 10px 0px 0" />

        {children}
    </Flex>
}
