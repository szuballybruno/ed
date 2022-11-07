const browser = {
    isEdge: /Edge/g.test(navigator.userAgent),
    isWebkit: 'WebkitAppearance' in document.documentElement.style && !/Edge/g.test(navigator.userAgent),
    isIPhone: /iPhone|iPod/gi.test(navigator.userAgent) && navigator.maxTouchPoints > 1,
    isIos:
        /iPad|iPhone|iPod/gi.test(navigator.userAgent) && navigator.maxTouchPoints > 1
};

export default browser;