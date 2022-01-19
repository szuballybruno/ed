import { Button, ButtonProps } from "@mui/material";
import { CSSProperties, forwardRef, ReactNode } from "react";

export type EpistoButtonPropsType = {
    children?: string | ReactNode,
    onClick?: () => void,
    size?: string,
    isRound?: boolean,
    padding?: string,
    fontSize?: string,
    variant?: "outlined" | "plain" | "colored" | "light",
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

    const getVariant = () => {

        if (variant === "colored")
            return "contained";

        if (variant === "light")
            return "contained";

        if (variant === "outlined")
            return "outlined";

        return "text";
    };

    return <Button
        onClick={onClick}
        name={name}
        variant={getVariant()}
        color="primary"
        ref={ref}
        disabled={isDisabled}
        className={`${className} fontMid`}
        type={type}
        style={{
            overflow: "hidden",
            whiteSpace: "nowrap",
            fontWeight: 500,
            minWidth: "0px",
            background: variant === "light" ? "white" : undefined,
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
