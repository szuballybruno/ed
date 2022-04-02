import { CSSProperties, ReactNode, RefObject, useCallback, useEffect, useRef, useState } from "react";
import { createClassBuiler } from "../../helpers/classBuilder";
import { isNumber, isString } from "../../static/frontendHelpers";
import styles from "./css/EpistoFont.module.css";

type FontSizeType = number | "fontExtraSmall" | "fontSmall" | "fontNormal14" | "fontMid" | "fontMidPlus" | "fontLarge" | "fontLargePlus" | "fontHuge" | "fontGiant" | "fontXXL"

export const EpistoFont = (params: {
    children: ReactNode,
    classes?: string[],
    className?: string,
    style?: CSSProperties,
    fontSize?: FontSizeType,
    onClick?: any,
    allowedLines?: number,
    maxFontSize?: number,
    isMultiline?: boolean,
    noLineBreak?: boolean,
    isUppercase?: boolean,
    isAutoFontSize?: boolean,
    tooltip?: string
}) => {

    const {
        classes,
        className,
        style,
        fontSize,
        onClick,
        allowedLines,
        maxFontSize,
        isMultiline,
        noLineBreak,
        isUppercase,
        isAutoFontSize,
        children,
        tooltip
    } = params;

    const ref = useRef<HTMLParagraphElement>(null);

    const autoFontSize = useAutoFontSize(
        ref,
        isString(children) ? children as any : "",
        allowedLines ?? 2,
        maxFontSize ?? 20,
        !!isAutoFontSize);

    const calcFontSize = isNumber(fontSize)
        ? fontSize as number
        : autoFontSize ?? undefined;

    const whiteSpace = (() => {

        if (isMultiline)
            return "pre-line";

        if (isAutoFontSize)
            return "normal";

        if (noLineBreak)
            return "nowrap";

        return undefined;
    })();

    // NOTES
    // whiteSpace: "pre-line" is required for new lines
    // whiteSpace: "normal" is required for autoFontSize
    return <p
        onClick={onClick}
        ref={ref}
        style={{
            whiteSpace,
            textTransform: isUppercase
                ? "uppercase"
                : undefined,
            fontSize: calcFontSize,
            ...style
        }}
        title={tooltip}
        className={createClassBuiler()
            .custom(styles["episto-font-main"])
            .if(isString(fontSize), builder => builder
                .custom(fontSize as string))
            .if(!!classes, builder => builder
                .appendList(classes!))
            .if(!!className, builder => builder
                .custom(className!))
            .build()}>

        {children}
    </p>;
};

export const useAutoFontSize = (
    ref: RefObject<HTMLSpanElement> | null,
    text: string,
    allowedLines: number,
    maxSize: number,
    enabled: boolean) => {

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
        };
    }, [ref, resizeListener]);

    // IF DISABLED
    if (!enabled)
        return null;

    const characterCount = text.length;
    const offset = 1.9;

    if (!containerWidth)
        return undefined;

    const calculatedSize = (containerWidth / (characterCount / allowedLines)) * offset;

    if (calculatedSize > maxSize)
        return maxSize;

    return calculatedSize;
};