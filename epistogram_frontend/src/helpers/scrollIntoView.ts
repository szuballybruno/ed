// Function to use instead of the standard scrollIntoView
// it requires a parent and a child ref, so it will only scroll
// where it needs to.
export const scrollIntoView = (parent, child) => {

    const parentBounding = parent.getBoundingClientRect(),
        clientBounding = child.getBoundingClientRect();

    const parentBottom = parentBounding.bottom,
        parentTop = parentBounding.top,
        clientBottom = clientBounding.bottom,
        clientTop = clientBounding.top;

    if (parentTop >= clientTop) {
        scrollTo(parent, -(parentTop - clientTop), 300);
    } else if (clientBottom > parentBottom) {
        scrollTo(parent, clientBottom - parentBottom + 300, 300);
    }

};

// Function for smooth scroll animation with the time duration
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
