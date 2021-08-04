import {FunctionComponent, ReactNode} from "react";
import {useState} from "@hookstate/core";
import applicationRunningState from "../../store/application/applicationRunningState";

type LoadingFrameProps = {
    nullComponent: ReactNode,
    loadingComponent: ReactNode,
    failedComponent: ReactNode
}

export const LoadingFrame: FunctionComponent<LoadingFrameProps> = (props) => {
    const app = useState(applicationRunningState)
    switch (app.loadingIndicator.get()) {
        case "null":
            return props.nullComponent as JSX.Element
        case "loading":
            return props.loadingComponent as JSX.Element
        case "failed":
            return props.failedComponent as JSX.Element
        case "succeeded":
            return props.children as JSX.Element
        default:
            return props.nullComponent as JSX.Element
    }
}
