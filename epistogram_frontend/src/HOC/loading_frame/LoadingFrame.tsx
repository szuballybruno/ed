import { FunctionComponent, ReactNode } from "react";
import { useState } from "@hookstate/core";
import applicationRunningState from "../../store/application/applicationRunningState";
import { LoadingState } from "../../store/application/ApplicationRunningStateInterface";

type LoadingFrameProps = {
    nullComponent: ReactNode,
    loadingComponent: ReactNode,
    failedComponent: ReactNode,
    children: ReactNode,
    loadingState: LoadingState
}

export const LoadingFrame = (props: LoadingFrameProps) => {

    switch (props.loadingState) {

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
