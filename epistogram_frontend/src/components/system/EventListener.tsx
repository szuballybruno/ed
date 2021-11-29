import { ReactNode, useEffect } from "react"

export const EventListener = (props: { children: ReactNode }) => {

    const { children } = props;


    return <>
        {children}
    </>
}