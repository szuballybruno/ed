import { CSSProperties, ReactNode, RefObject, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { createClassBuiler } from '../../helpers/classBuilder';
import { isNumber, isString, useCSSOptionClasses } from '../../static/frontendHelpers';
import { CSSOptionsFont } from '../../styles/globalCssTypes';
import styles from './css/EpistoFont.module.css';

export type FontSizeType = number | 'fontExtraSmall' | 'fontSmall' | 'fontNormal14' | 'fontMid' | 'fontMidPlus' | 'fontLarge' | 'fontLargePlus' | 'fontHuge' | 'fontGiant' | 'fontXXL'

export const EpistoFont = (params: {
    children: ReactNode,

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
    isUppercase?: boolean,
    isAutoFontSize?: boolean,
    tooltip?: string
} & CSSOptionsFont) => {

    const {
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
        ...cssOptions
    } = params;

    const { cssOptionClasses } = useCSSOptionClasses(cssOptions);
    const ref = useRef<HTMLParagraphElement>(null);
    const [autoFontSizeListener, setAutoFontSizeListener] = useState<AutoFontSizeListenerType | null>(null);
    const [autoFontSize, setAutoFontSize] = useState<number | null>(null);

    // init auto font size
    useEffect(() => {

        if (!isAutoFontSize)
            return;

        const listener = createAutoFontSizeListener({
            ref,
            text: isString(children) ? children as any : '',
            allowedLines: allowedLines ?? 2,
            maxSize: maxFontSize ?? 20,
            onTextSizeChanged: setAutoFontSize
        });

        setAutoFontSizeListener(listener);
    }, [isAutoFontSize]);

    // cleanup auto font size
    useEffect(() => {

        return () => {

            if (!autoFontSizeListener)
                return;

            autoFontSizeListener
                .destroy();
        };
    }, [autoFontSizeListener]);

    const calcFontSize = useMemo(() => isNumber(fontSize)
        ? fontSize as number
        : autoFontSize ?? undefined, [fontSize, autoFontSize]);

    const whiteSpace = useMemo(() => (() => {

        if (isMultiline)
            return 'pre-line';

        if (isAutoFontSize)
            return 'normal';

        if (noLineBreak)
            return 'nowrap';

        return undefined;
    })(), [isMultiline, isAutoFontSize, noLineBreak]);

    // NOTES
    // whiteSpace: "pre-line" is required for new lines
    // whiteSpace: "normal" is required for autoFontSize
    return <p
        onClick={onClick}
        ref={ref}
        style={{
            whiteSpace,
            textTransform: isUppercase
                ? 'uppercase'
                : undefined,
            fontSize: calcFontSize,
            ...style
        }}
        title={tooltip}
        className={createClassBuiler()
            .custom(styles['episto-font-main'])
            .if(isString(fontSize), builder => builder
                .custom(fontSize as string))
            .if(!!className, builder => builder
                .custom(className!))
            .build() + ' ' + cssOptionClasses}>

        {children}
    </p>;
};

export const createAutoFontSizeListener = (opts: {
    ref: RefObject<HTMLParagraphElement>,
    text: string,
    allowedLines: number,
    maxSize: number,
    onTextSizeChanged: (size: number) => void
}) => {

    const { allowedLines, maxSize, onTextSizeChanged, ref, text } = opts;

    const element = ref.current;
    if (!element)
        return;

    // resize callback
    const resizeCallback = () => {

        const containerWidth = element.offsetWidth;
        const characterCount = text.length;
        const offset = 1.9;
        const calculatedSize = (containerWidth / (characterCount / allowedLines)) * offset;
        const finalSize = calculatedSize < maxSize ? calculatedSize : maxSize;

        onTextSizeChanged(finalSize);
    };

    // create observer
    const observer = new ResizeObserver(resizeCallback);

    // destroy
    const destroy = () => {

        if (observer) {

            if (element)
                observer.unobserve(element);

            observer.disconnect();
        }
    };

    // start observing
    observer.observe(element);

    return {
        destroy
    };
};

type AutoFontSizeListenerType = ReturnType<typeof createAutoFontSizeListener>;