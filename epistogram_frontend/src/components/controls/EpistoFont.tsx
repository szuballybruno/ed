import { CSSProperties, ReactNode } from "react";
import styles from "./css/EpistoFont.module.css";

export const EpistoFont = (params: {
    children: ReactNode,
    classes?: string[],
    style?: CSSProperties,
}) => {

    const { classes, style, children } = params;

    return <p
        style={style}
        className={`${styles["episto-font-main"]} ${classes?.join(" ")}`}>

        {children}
    </p>
}