import { CSSProperties, ReactNode } from "react";
import styles from "./css/EpistoFont.module.css";

export const EpistoFont = (params: {
    children: ReactNode,
    classes?: string[],
    style?: CSSProperties,
    isMultiline?: boolean
}) => {

    const { classes, style, isMultiline, children } = params;

    return <p
        style={{
           whiteSpace: isMultiline ? "pre-line" : undefined,
           ...style
        }}
        className={`${styles["episto-font-main"]} ${classes?.join(" ")}`}>

        {children}
    </p>
}