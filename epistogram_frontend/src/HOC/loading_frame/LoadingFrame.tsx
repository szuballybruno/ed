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

            case "loading":
                return <LoadingComponent></LoadingComponent>

            case "failed":
                return <FailedComponent></FailedComponent>

            case "succeeded":
                return props.children;

            default:
                throw new Error("!!");
        }
    }

    return <div>
        {getLoadingComponent()}
    </div>;
}
