import { fontSize } from "@mui/system";
import { CSSProperties, ReactNode, RefObject, useCallback, useEffect, useRef, useState } from "react";
import styles from "./css/EpistoFont.module.css";

type FontSizeType = number | "fontExtraSmall" | "fontSmall" | "fontSmallPlus" | "fontMid" | "fontMidPlus" | "fontLarge" | "fontLargePlus" | "fontHuge" | "fontGiant" | "fontXXL"

export const EpistoFont = (params: {
    children: ReactNode,
    classes?: string[],
    style?: CSSProperties,
    fontSize?: FontSizeType,
    onClick?: any,
    allowedLines?: number,
    maxFontSize?: number,
    isMultiline?: boolean,
    isUppercase?: boolean,
    isAutoFontSize?: boolean
}) => {

    const {
        classes,
        style,
        fontSize,
        onClick,
        allowedLines,
        maxFontSize,
        isMultiline,
        isUppercase,
        isAutoFontSize,
        children
    } = params;

    const ref = useRef<HTMLParagraphElement>(null);

    const autoFontSize = useAutoFontSize(
        ref,
        typeof children === "string"
            ? children
            : "",
        allowedLines ?? 2,
        maxFontSize ?? 20)

    return <p
        onClick={onClick}
        ref={ref}
        style={{
            whiteSpace: isMultiline
                ? "pre-line" //required for new lines
                : isAutoFontSize
                    ? "normal" //required for autoFontSize
                    : undefined,
            textTransform: isUppercase
                ? "uppercase"
                : undefined,
            fontSize: (typeof fontSize === "number" && !isAutoFontSize)
                ? fontSize
                : (!fontSize && isAutoFontSize)
                    ? autoFontSize
                    : undefined,
            ...style
        }}
        className={`${styles["episto-font-main"]} ${typeof fontSize === "string" && fontSize} ${classes?.join(" ")}`}>

        {children}
    </p>
}

export const useAutoFontSize = (
    ref: RefObject<HTMLSpanElement> | null,
    text: string,
    allowedLines: number,
    maxSize: number) => {

    const [containerWidth, setContainerWidth] = useState<number | null>(null);

    const resizeListener = useCallback(() => {

        if (ref?.current)
            setContainerWidth(ref?.current.offsetWidth ?? null);
    }, [ref]);

    useEffect(() => {

        const savedRef = ref?.current;

        if (!savedRef)
            return;

        setContainerWidth(savedRef.offsetWidth ?? null);
        // create observer
        const observer = new ResizeObserver(resizeListener);
        observer.observe(savedRef);

        return () => {

            if (observer) {

                if (savedRef)
                    observer.unobserve(savedRef);

                observer.disconnect();
            }
        }
    }, [ref, resizeListener]);

    const characterCount = text.length;
    const offset = 1.9;

    if (!containerWidth)
        return undefined;

    const calculatedSize = (containerWidth / (characterCount / allowedLines)) * offset;

    if (calculatedSize > maxSize)
        return maxSize;

    return calculatedSize;
}