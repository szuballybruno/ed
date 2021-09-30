import { Button, ButtonProps } from "@mui/material";
import { createRef, CSSProperties, forwardRef, ReactNode } from "react";

export type EpistoButtonPropsType = {
    children?: string | ReactNode,
    onClick?: () => void,
    size?: string,
    isRound?: boolean,
    padding?: string,
    fontSize?: string,
    variant?: "outlined" | "plain" | "colored",
    style?: CSSProperties,
    className?: string,
    icon?: ReactNode,
    buttonProps?: ButtonProps
};

export const EpistoButton = forwardRef<HTMLButtonElement, EpistoButtonPropsType>((props: EpistoButtonPropsType, ref) => {

    const {
        children,
        onClick,
        isRound,
        size,
        padding,
        fontSize,
        variant,
        style,
        className,
        icon
    } = props;

    const { variant: _, ...buttonProps } = props.buttonProps ?? { variant: null };

    return <Button
        onClick={onClick}
        variant={variant === "colored"
            ? "contained"
            : variant === "outlined"
                ? "outlined"
                : "text"}
        color="primary"
        ref={ref}
        className={className}
        style={{
            overflow: "hidden",
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
        }}
        {...buttonProps}>
        {icon}
        {children}
    </Button>
});