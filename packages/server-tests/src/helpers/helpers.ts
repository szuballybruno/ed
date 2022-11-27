import { apiRoutes } from "@episto/communication"
import axios, { AxiosError } from "axios";
import { writeFileSync } from "fs";
import { domain } from "./config";

type ApiRoutesType = typeof apiRoutes;

const fetchAsync = async (getRoute: (routes: ApiRoutesType) => string, query: any) => {

    const route = `${domain}${getRoute(apiRoutes)}`;

    console.log(`Fetching ${route}`, query);

    try {

        const response = await axios
            .get(route, {
                params: query
            });

        const data = response
            .data;

        return data;
    }
    catch (error: any) {

        const axError = error as AxiosError;
        const axErrorMessage = `AxiosError: Code: ${axError.code} Msg: ${axError.message} Status: ${axError.response?.status} Status msg: ${axError.response?.statusText}`

        throw new Error(axErrorMessage);
    }
}

export type TestSuiteType = {
    name?: string;
    getTests: () => Promise<TestType[]>;
}

export type TestType = {
    name: string;
    run: () => Promise<void>;
}

export const testSuite = (getTests: () => Promise<TestType[]>): TestSuiteType => {

    return {
        getTests
    };
}

export const test = (what: string, fn: () => Promise<void>): TestType => {

    return {
        name: what,
        run: fn
    };
}

const throwIf = (condition: boolean) => {

    if (!condition)
        return;

    throw new Error(`Test failed.`);
}

class SuiteListBuilder {

    private _suites: TestSuiteType[] = [];
    private _abortOnException: boolean;

    constructor() {

    }

    setAbortOnException(yn: 'YES' | 'NO') {

        this._abortOnException = yn === 'YES';
        return this;
    }

    addSuites(obj: { [K: string]: TestSuiteType }) {

        Object
            .keys(obj)
            .forEach(key => {

                const suite = obj[key];
                this._suites.push({ ...suite, name: key })
            });

        return this;
    }

    async runAllAsync() {

        let errors: any[] = [];

        for (let suiteIndex = 0; suiteIndex < this._suites.length; suiteIndex++) {

            const suiteTest = this._suites[suiteIndex];

            console.log(`Suite: ${suiteTest.name}`);

            const suiteTests = await suiteTest.getTests();

            for (let testIndex = 0; testIndex < suiteTests.length; testIndex++) {

                const suiteTest = suiteTests[testIndex];
                let success = false;

                try {

                    await suiteTest.run();
                    success = true;
                }
                catch (error: any) {

                    if (this._abortOnException) {

                        console.log(`   Test: ${suiteTest.name} -> ${'Failed'}`);
                        throw new Error(`Error msg: ${error?.message}`);
                    }

                    errors.push(error);
                }

                console.log(`   Test: ${suiteTest.name} -> ${success ? 'Ok' : 'Failed'}`);
            }
        }

        writeFileSync('./error.log', JSON.stringify(errors, null, '\t'));

        if (errors.length > 0)
            throw new Error(`Some tests failed!`);
    }
}

const getSuiteBuilder = () => new SuiteListBuilder();

export const Helpers = {
    fetchAsync,
    test,
    throwIf,
    testSuite,
    getSuiteBuilder
}