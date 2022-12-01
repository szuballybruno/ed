import { AxiosResponse } from "axios";



const findSetCookieHeaderValue = (response: AxiosResponse, startsWith: string) => {

    const setCookies = response.headers["set-cookie"] ?? [];

    if (!setCookies?.some(x => x.startsWith(startsWith)))
        throw new Error(`No set-cookie header found starting with ${startsWith}!`);

    const tokenValue = setCookies
        .single(x => x.startsWith(startsWith))
        .split(';')[0]
        .split('=')[1];

    return tokenValue;
}

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
    findSetCookieHeaderValue
}