import { fontSize } from "@mui/system";
import { CSSProperties, ReactNode } from "react";
import styles from "./css/EpistoFont.module.css";

type FontSizeType = number | "fontExtraSmall" | "fontSmall" | "fontSmallPlus" | "fontMid" | "fontMidPlus" | "fontLarge" | "fontHuge" | "fontGiant" | "fontXXL"

export const EpistoFont = (params: {
    children: ReactNode,
    classes?: string[],
    style?: CSSProperties,
    fontSize?: FontSizeType
    isMultiline?: boolean,
    isUppercase?: boolean
}) => {

    const {
        classes,
        style,
        fontSize,
        isMultiline,
        isUppercase,
        children
    } = params;

    return <p
        style={{
            whiteSpace: isMultiline ? "pre-line" : undefined,
            textTransform: isUppercase ? "uppercase" : undefined,
            fontSize: typeof fontSize === "number" ? fontSize : undefined,
            ...style
        }}
        className={`${styles["episto-font-main"]} ${typeof fontSize === "string" && fontSize} ${classes?.join(" ")}`}>

        {children}
    </p>
}