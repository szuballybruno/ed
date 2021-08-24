import { Flex, FlexProps } from "@chakra-ui/react";
import { isArray } from "../../frontendHelpers";
import { LoadingStateType } from "../../store/application/ApplicationRunningStateInterface";
import { FailedComponent, LoadingComponent } from "./loadingComponents/LoadingComponent";

export const LoadingFrame = (props: FlexProps & {
    loadingState: LoadingStateType | LoadingStateType[],
    error?: any | any[]
}) => {

    const { loadingState, error, ...flexProps } = props;

    console.log(loadingState);

    const getLoadingState = (loadingState: LoadingStateType | LoadingStateType[]) => {

        if (isArray(loadingState)) {

            const loadingStates = props.loadingState as LoadingStateType[];

            if (loadingStates.some(x => x == "error"))
                return "error" as LoadingStateType;

            if (loadingStates.some(x => x == "idle" || x == "loading"))
                return "loading" as LoadingStateType;

            return "success" as LoadingStateType;
        }
        else {

            return loadingState as LoadingStateType;
        }
    }

    const getError = (error?: any | any[]) => {

        if (!error)
            return error;

        if (isArray(error))
            return (error as any[])[0];

        return error;
    }

    const singleError = getError(error);
    const state = getLoadingState(loadingState);

    const getLoadingComponent = () => {
        switch (state) {

            case "idle":
                return <LoadingComponent></LoadingComponent>

            case "loading":
                return <LoadingComponent></LoadingComponent>

            case "error":
                return <FailedComponent error={singleError}></FailedComponent>

            case "success":
                return props.children;

            default:
                throw new Error(`Loading state is not reckognised: ${state}!`);
        }
    }

    return <Flex height="100%" width="100%" justify="center" align="center" {...flexProps}>
        {getLoadingComponent()}
    </Flex>;
}
