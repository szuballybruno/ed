let virtaulIdCounter = 0;

export const getVirtualId = () => {

    virtaulIdCounter -= 1;

    return virtaulIdCounter;
};