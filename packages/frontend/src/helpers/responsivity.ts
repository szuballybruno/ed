import browser from '../services/core/browserSniffingService';
import { useMediaQuery } from '@chakra-ui/react';
import { useState, useEffect } from 'react';

const useIsScreenWiderThan = (minimumPixels: number) => {

    const queryRes = useMediaQuery(`(min-width: ${minimumPixels}px)`);
    const isTrue = queryRes[0];

    return isTrue;
};

const useIsMobileView = () => {

    const [isMobile] = useMediaQuery('(max-width: 980px)');
    return {
        isMobile
    };
};

const useIsIPhone = () => {

    return {
        isIPhone: browser.isIPhone
    };
};

const useScreenOrientation = () => {

    const getOrientation = () => window.orientation;

    const [orientation, setOrientation] = useState(getOrientation());

    const updateOrientation = () => {
        setOrientation(getOrientation());
    };

    useEffect(() => {
        window.addEventListener(
            'orientationchange',
            updateOrientation
        );
        return () => {
            window.removeEventListener(
                'orientationchange',
                updateOrientation
            );
        };
    }, []);

    return orientation;
};

const useIsLandscape = () => {

    return { isLandscape: useScreenOrientation() === 90 };
};

export const Responsivity = {
    useIsIPhone,
    useIsMobileView,
    useIsScreenWiderThan,
    useScreenOrientation,
    useIsLandscape
};