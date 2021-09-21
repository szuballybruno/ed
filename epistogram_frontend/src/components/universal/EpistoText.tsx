import { Typography } from "@mui/material";
import { CSSProperties, RefObject, useCallback, useEffect, useRef, useState } from "react";

export const EpistoText = (props: {
    isAutoFontSize?: boolean,
    style?: CSSProperties,
    text: string,
    maxFontSize?: number,
    allowedLines?: number
}) => {

    const { style, text, maxFontSize, isAutoFontSize, allowedLines } = props;
    const ref = useRef<HTMLSpanElement>(null);
    const fontSize = useAutoFontSize(ref, text, allowedLines ?? 2, maxFontSize ?? 20);
    const css = {
        fontSize: fontSize,
        textTransform: "none",
        whiteSpace: "normal",
        ...style
    } as CSSProperties;

    useEffect(() => console.log(ref.current), [ref]);

    return <Typography
        ref={ref}
        style={css}>
        {props.text}
    </Typography>
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

        if (!ref?.current)
            return;

        setContainerWidth(ref?.current.offsetWidth ?? null);
        // create observer
        const observer = new ResizeObserver(resizeListener);
        observer.observe(ref?.current);

        return () => {

            if (observer) {

                if (ref?.current)
                    observer.unobserve(ref?.current);

                observer.disconnect();
            }
        }
    }, [ref]);

    const characterCount = text.length;
    const offset = 1.9;

    if (!containerWidth)
        return undefined;

    const calculatedSize = (containerWidth / (characterCount / allowedLines)) * offset;

    if (calculatedSize > maxSize)
        return maxSize;

    return calculatedSize;
}