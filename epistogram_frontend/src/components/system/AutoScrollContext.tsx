import {createContext, useCallback, useContext, useState} from 'react';
import {PropsWithChildren} from '../../static/frontendHelpers';

const easeInOutQuad = (time, startPos, endPos, duration) => {
    time /= duration / 2;

    if (time < 1) return (endPos / 2) * time * time + startPos;
    time--;
    return (-endPos / 2) * (time * (time - 2) - 1) + startPos;
};

const scrollTo = (element: any, to: number, duration: number) => {

    const start = element.scrollTop;
    let currentTime = 0;
    const increment = 20;

    const animateScroll = function () {
        currentTime += increment;

        const val = easeInOutQuad(currentTime, start, to, duration);
        element.scrollTop = val;

        if (currentTime < duration) {
            setTimeout(animateScroll, increment);
        }
    };

    animateScroll();
};

const scrollIntoView = (parent, child) => {

    const parentBounding = parent.getBoundingClientRect(),
        clientBounding = child.getBoundingClientRect();

    const parentBottom = parentBounding.bottom,
        parentTop = parentBounding.top,
        clientBottom = clientBounding.bottom,
        clientTop = clientBounding.top;

    if (parentTop >= clientTop) {
        scrollTo(parent, -(parentTop - clientTop), 300);
    } else if (clientBottom > parentBottom) {
        scrollTo(parent, clientBottom - parentBottom + 400, 300);
    }
};


export const useScrollState = () => {

    const [parentElement, setParentElement] = useState<HTMLDivElement>();
    const [childElement, setChildElement] = useState<HTMLDivElement>();

    const setParent = (element: HTMLDivElement) => {

        setParentElement(element);
    };

    const setChild = (element: HTMLDivElement) => {

        setChildElement(element);
    };

    const scroll = useCallback(() => {

        console.log('Scrolling...');

        if(!parentElement)
            return;

        if(!childElement)
            return;

        scrollIntoView(parentElement, childElement);
    }, [childElement, parentElement]);

    const scrollToTop = () => {

        console.log('Scrolling to top');

        if(!parentElement)
            return;

        parentElement.scrollTo(0, 0);
    };

    return {
        scroll,
        scrollToTop,
        parentElement,
        childElement,
        setParent,
        setChild
    };
};

export type AutoScrollContextType = ReturnType<typeof useScrollState>;

export const AutoScrollContext = createContext<AutoScrollContextType>({} as AutoScrollContextType);

export const useScrollIntoView = () => {

    return useContext(AutoScrollContext);
};

export const AutoScrollFrame = ({ children }: PropsWithChildren) => {

    const state = useScrollState();

    return <AutoScrollContext.Provider
        value={state}>

        {children}
    </AutoScrollContext.Provider>;
};
