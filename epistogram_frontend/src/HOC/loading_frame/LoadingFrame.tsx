import { Box, Flex } from "@chakra-ui/react";
import { ReactNode } from "react";
import { LoadingStateType } from "../../store/application/ApplicationRunningStateInterface";
import { FailedComponent, LoadingComponent, NullComponent } from "./loadingComponents/LoadingComponent";

export const LoadingFrame = (props: {
    children: ReactNode,
    loadingState: LoadingStateType,
    error?: any
}) => {

    const getLoadingComponent = () => {
        switch (props.loadingState) {

            case "idle":
                return <LoadingComponent></LoadingComponent>

            case "loading":
                return <LoadingComponent></LoadingComponent>

            case "error":
                return <FailedComponent error={props.error}></FailedComponent>

            case "success":
                return props.children;

            default:
                throw new Error(`Loading state is not reckognised: ${props.loadingState}!`);
        }
    }

    return <Flex height="100%" width="100%" justify="center" align="center">
        {getLoadingComponent()}
    </Flex>;
}
