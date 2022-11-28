import { apiRoutes } from "@episto/communication";
import axios, { AxiosError } from "axios";
import { domain } from "./config";

type ApiRoutesType = typeof apiRoutes;

const fetchAsync = async (getRoute: (routes: ApiRoutesType) => string, query: any) => {

    const route = `${domain}${getRoute(apiRoutes)}`;

    // console.log(`Fetching ${route}`, query);

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

type ErrorLogItem = {
    error: Error,
    testPath: string
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

        let errors: ErrorLogItem[] = [];

        for (let suiteIndex = 0; suiteIndex < this._suites.length; suiteIndex++) {

            const testSuite = this._suites[suiteIndex];

            console.log(`Suite: ${testSuite.name}`);

            const suiteTests = await testSuite.getTests();

            for (let testIndex = 0; testIndex < suiteTests.length; testIndex++) {

                const test = suiteTests[testIndex];
                let success = false;

                try {

                    await test.run();
                    success = true;
                }
                catch (error: any) {

                    if (this._abortOnException) {

                        console.log(`   Test: "${test.name}" -> ${'Failed'}`);
                        throw new Error(`Error msg: ${error?.message}`);
                    }

                    errors
                        .push({
                            error,
                            testPath: `${testSuite.name} / "${test.name}"`
                        });
                }

                console.log(`   Test: "${test.name}" -> ${success ? 'Ok' : 'Failed'}`);
            }
        }

        const getCleanerStack = (err: Error) => {

            Error.captureStackTrace(err, getCleanerStack);
            return err.stack;
        }

        const errorMessage = errors
            .map(errorLogItem => ({
                msg: errorLogItem.error.message ?? 'no message',
                stack: getCleanerStack(errorLogItem.error),
                path: errorLogItem.testPath
            }))
            .map(x => `-----------------------------\n${x.path}\n${x.msg}\n${x.stack}`);

        if (errors.length > 0)
            throw new Error(`${errors.length} tests failed: \n\n${errorMessage.join('\n\n')}`);
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