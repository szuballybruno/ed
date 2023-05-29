import { CSSProperties, ReactNode, RefObject, useCallback, useEffect, useRef, useState } from 'react';
import { createClassBuiler } from '../../helpers/classBuilder';
import { isNumber, isString } from '../../static/frontendHelpers';
import styles from './css/EpistoFont.module.css';

export type FontSizeType = number | 'fontSmall' | 'fontSmall' | 'fontLarge' | 'fontMidPlus' | 'fontLarge' | 'font19' | 'font22' | 'font26' | 'font30'

export const EpistoFont = ({
    margin,
    textAlign,
    fontWeight,
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
    tooltip,
    textColor,
    ...cssOptions
}: {
    children: ReactNode,
    textColor?: 'white' | 'eduptiveMildDarkGreen' | 'eduptiveDeepDarkGreen' | 'eduptiveYellowGreen' | 'accept' | 'decline',
    textAlign?: 'left' | 'center' | 'right',
    fontWeight?: 'normal' | 'heavy'
    margin?: string,

    /**
     * @deprecated use globalCss
     */
    className?: string,

    /**
     * @deprecated use globalCss
     */
    style?: CSSProperties,

    /**
     * @deprecated
     */
    fontSize?: FontSizeType,
    onClick?: any,
    allowedLines?: number,
    maxFontSize?: number,
    isMultiline?: boolean,
    noLineBreak?: boolean,

    /**
     * @deprecated
     */
    isUppercase?: boolean,
    isAutoFontSize?: boolean,
    tooltip?: string,
}) => {

    /* const { cssOptionClasses } = useCSSOptionClasses(cssOptions); */

    const ref = useRef<HTMLParagraphElement>(null);

    const autoFontSize = useAutoFontSize(
        ref,
        isString(children) ? children as any : '',
        allowedLines ?? 2,
        maxFontSize ?? 20,
        !!isAutoFontSize);

    const calcFontSize = isNumber(fontSize)
        ? fontSize as number
        : autoFontSize ?? undefined;

    const whiteSpace = (() => {

        if (isMultiline)
            return 'pre-line';

        if (isAutoFontSize)
            return 'normal';

        if (noLineBreak)
            return 'nowrap';

        return undefined;
    })();

    const textColorValue = (() => {

        if (textColor === 'white') {
            return 'white';
        }

        if (textColor === 'eduptiveMildDarkGreen') {
            return 'var(--eduptiveMildDarkGreen)';
        }

        if (textColor === 'eduptiveDeepDarkGreen') {
            return 'var(--eduptiveDeepDarkGreen)';
        }

        if (textColor === 'eduptiveYellowGreen') {
            return 'var(--eduptiveYellowGreen)';
        }

        if (textColor === 'accept') {
            return 'var(--goodGreen)';
        }

        if (textColor === 'decline') {
            return 'var(--deepRed)';
        }

        return 'var(--eduptiveDeepDarkGreen)';
    })();

    // NOTES
    // whiteSpace: "pre-line" is required for new lines
    // whiteSpace: "normal" is required for autoFontSize
    return <p
        id={EpistoFont.name}
        onClick={onClick}
        ref={ref}
        style={{
            whiteSpace,
            textTransform: isUppercase
                ? 'uppercase'
                : undefined,
            fontSize: calcFontSize,
            fontWeight: (() => {

                if (fontWeight === 'heavy')
                    return 'bold';

                return 'normal';
            })(),
            color: textColorValue,
            margin,
            textAlign,
            ...style
        }}
        title={tooltip}
        className={createClassBuiler()
            .custom(styles['episto-font-main'])
            .if(isString(fontSize), builder => builder
                .custom(fontSize as string))
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