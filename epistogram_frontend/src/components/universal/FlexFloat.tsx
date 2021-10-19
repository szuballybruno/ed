import { Flex, FlexProps } from "@chakra-ui/react";

export const FlexFloat = (props: FlexProps & { elevation?: number, variant?: "normal" | "rect" }) => {

    const { elevation, variant, ...flexProps } = props;

    return <Flex
        id="flexFloat"
        borderRadius={variant === "rect" ? "none" : "7px"}
        boxShadow={`0 0 ${elevation ?? 8}px #0000001f`}
        bg="white"
        {...flexProps} >
        {props.children}
    </Flex>
}