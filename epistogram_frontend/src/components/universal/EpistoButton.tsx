import { Button, ButtonProps } from "@mui/material";
import { CSSProperties, forwardRef, ReactNode } from "react";

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
    isDisabled?: boolean,
    buttonProps?: ButtonProps,
    name?: string
    type?: "button" | "submit" | "reset" | undefined
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
        icon,
        isDisabled,
        name,
        type
    } = props;

    const { variant: _, ...buttonProps } = props.buttonProps ?? { variant: null };

    return <Button
        onClick={onClick}
        name={name}
        variant={variant === "colored"
            ? "contained"
            : variant === "outlined"
                ? "outlined"
                : "text"}
        color="primary"
        ref={ref}
        disabled={isDisabled}
        className={`${className} fontMid`}
        type={type}
        style={{
            overflow: "hidden",
            whiteSpace: "nowrap",
            minWidth: "0px",
            color: isDisabled
                ? "white"
                : variant === "colored"
                    ? "white"
                    : "black",
            // background: isDisabled && variant === "colored" ? "var(--mildGrey)" : undefined,
            margin: "0px",
            borderRadius: isRound ? "50%" : "7px",
            width: size,
            filter: isDisabled ? "contrast(0.01)" : undefined,
            height: size,
            padding: padding ? padding : undefined,
            fontSize: fontSize ? fontSize : undefined,
            borderColor: "var(--mildGrey)",
            pointerEvents: isDisabled ? "none" : undefined,
            ...style
        }}
        {...buttonProps}>
        {icon}
        {children}
    </Button>
});
