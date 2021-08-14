import { ReactNode } from "react";
import { LoadingState } from "../../store/application/ApplicationRunningStateInterface";
import { FailedComponent, LoadingComponent, NullComponent } from "./loadingComponents/LoadingComponent";

type LoadingFrameProps = {
    // nullComponent: ReactNode,
    // loadingComponent: ReactNode,
    // failedComponent: ReactNode,
    children: ReactNode,
    loadingState: LoadingState
}

export const LoadingFrame = (props: LoadingFrameProps) => {

    const getLoadingComponent = () => {
        switch (props.loadingState) {

            case "null":
                return <NullComponent></NullComponent>

            case "loading":
                return <LoadingComponent></LoadingComponent>

            case "failed":
                return <FailedComponent></FailedComponent>

            case "succeeded":
                return props.children;

            default:
                return <NullComponent></NullComponent>
        }
    }

    return <div>
        {getLoadingComponent()}
    </div>;
}
