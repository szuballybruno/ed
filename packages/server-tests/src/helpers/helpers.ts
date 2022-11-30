




const throwIf = (condition: boolean) => {

    if (!condition)
        return;

    throw new Error(`Test failed.`);
}

const shouldThrow = (errorcheck: (error: any) => boolean) => {

    return {
        execute: async (fn: () => Promise<any>) => {

            let error: Error | null = null;

            try {

                await fn();
            }
            catch (e: any) {

                error = e;
            }

            if (!error)
                throw new Error(`Should throw error but didnt.`);

            if (!errorcheck(error))
                throw new Error(`Thrown error is of an unexpected type!`);
        }
    }
}

export const Helpers = {
    throwIf,
    shouldThrow,
}