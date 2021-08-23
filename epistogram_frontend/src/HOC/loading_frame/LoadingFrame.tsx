import { ReactNode } from "react";
import { LoadingStateType } from "../../store/application/ApplicationRunningStateInterface";
import { FailedComponent, LoadingComponent, NullComponent } from "./loadingComponents/LoadingComponent";

type LoadingFrameProps = {
    // nullComponent: ReactNode,
    // loadingComponent: ReactNode,
    // failedComponent: ReactNode,
    children: ReactNode,
    loadingState: LoadingStateType
}

export const LoadingFrame = (props: LoadingFrameProps) => {

    const getLoadingComponent = () => {
        switch (props.loadingState) {

            case "idle":
                return <LoadingComponent></LoadingComponent>

            case "loading":
                return <LoadingComponent></LoadingComponent>

            case "error":
                return <FailedComponent></FailedComponent>

            case "success":
                return props.children;

            default:
                throw new Error(`Loading state is not reckognised: ${props.loadingState}!`);
        }
    }

    return <div>
        {getLoadingComponent()}
    </div>;
}
