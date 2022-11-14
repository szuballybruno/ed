import browser from '../services/core/browserSniffingService';

const useIsIPhone = () => {

    return { isIPhone: browser.isIPhone };
};

export const HelperHooks = {
    useIsIPhone
};