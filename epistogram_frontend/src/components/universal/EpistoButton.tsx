import { Button } from "@mui/material";
import { CSSProperties, ReactNode } from "react";

export const EpistoButton = (props: {
    children?: string | ReactNode,
    onClick?: () => void,
    size?: string,
    isRound?: boolean,
    padding?: string,
    fontSize?: string,
    variant?: "outlined" | "plain" | "colored",
    style?: CSSProperties
}) => {

    const { children, onClick, isRound, size, padding, fontSize, variant, style } = props;

    return <Button
        onClick={onClick}
        variant={variant === "colored"
            ? "contained"
            : variant === "outlined"
                ? "outlined"
                : "text"}
        color="primary"
        style={{
            whiteSpace: "nowrap",
            minWidth: "0px",
            color: variant === "colored" ? "white" : "black",
            margin: "3px",
            borderRadius: isRound ? "50%" : undefined,
            width: size,
            height: size,
            padding: padding ? padding : undefined,
            fontSize: fontSize ? fontSize : undefined,
            ...style
        }}>
        {children}
    </Button>
}