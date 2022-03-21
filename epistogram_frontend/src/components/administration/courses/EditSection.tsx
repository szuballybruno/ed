import { Flex, FlexProps } from "@chakra-ui/react";
import { ReactNode } from "react";
import { EpistoFont } from "../../controls/EpistoFont";
import { EpistoHeader } from "../../EpistoHeader";

export const EditSection = (props: {
    title: string,
    children: ReactNode,
    isFirst?: boolean,
    rightSideComponent?: ReactNode
} & FlexProps) => {

    const { children, title, isFirst, rightSideComponent, ...css } = props;

    return <Flex
        direction="column"
        p="20px"
        mt="10px"
        {...css}>

        <Flex align="flex-start" justify="space-between">

            <EpistoFont
                fontSize={"fontHuge"}
                style={{
                    marginTop: isFirst ? 10 : 50,
                    fontWeight: 600
                }}>

                {title}
            </EpistoFont>

            {rightSideComponent}
        </Flex>

        {/* <EpistoHeader
            text={title}
            showDivider
            variant="strongSub"
            m="5px 10px 0px 0" /> */}

        {children}
    </Flex>
}
