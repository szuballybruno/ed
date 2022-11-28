




const throwIf = (condition: boolean) => {

    if (!condition)
        return;

    throw new Error(`Test failed.`);
}

const shouldThrow = async (fn: () => Promise<any>) => {

    let didThrow = false;

    try {

        await fn();
    }
    catch (e: any) {

        didThrow = true;
    }

    if (!didThrow)
        throw new Error(`Should throw error but didnt.`);
}

export const Helpers = {
    throwIf,
    shouldThrow,
}