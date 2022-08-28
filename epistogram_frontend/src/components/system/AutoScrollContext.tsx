import {createContext, useCallback, useContext, useState} from 'react';
import {PropsWithChildren} from '../../static/frontendHelpers';
import {Logger} from '../../static/Logger';

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

    Logger.logScoped('AUTO SCROLL', 'Child element inner text, inside the scrollIntoView function: ' + child.innerText);

    //Logger.logScoped('AUTO SCROLL', 'Parent top: ' + parentTop);
    //Logger.logScoped('AUTO SCROLL', 'Client top: ' + clientTop);
    //Logger.logScoped('AUTO SCROLL', 'ScrollTo UP: ' + -(parentTop - clientTop));
    //Logger.logScoped('AUTO SCROLL', 'ScrollTo DOWN: ' + (clientBottom - parentBottom));

    if (parentTop >= clientTop - 100) {

        Logger.logScoped('AUTO SCROLL', 'Parent top is larger or equal to client top, which means scrolling up');
        scrollTo(parent, -(parentTop - clientTop + 100), 300);
    } else if (clientBottom > parentBottom) {

        Logger.logScoped('AUTO SCROLL', 'Client bottom is larger than parent bottom, which means scrolling down');
        scrollTo(parent, clientBottom - parentBottom, 300);
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

        Logger.logScoped('AUTO SCROLL', 'Scroll into view initiated...');

        if(!parentElement)
            return;

        Logger.logScoped('AUTO SCROLL', 'Parent element is present');

        if(!childElement)
            return;

        Logger.logScoped('AUTO SCROLL', 'Child element is present');
        Logger.logScoped('AUTO SCROLL', 'Scrolling...');

        scrollIntoView(parentElement, childElement);
    }, [childElement, parentElement]);

    const scrollToTop = () => {

        Logger.logScoped('AUTO SCROLL', 'Scrolling to top initiated...');

        if(!parentElement)
            return;

        Logger.logScoped('AUTO SCROLL', 'Parent element is present...');
        Logger.logScoped('AUTO SCROLL', 'Scrolling...');

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
