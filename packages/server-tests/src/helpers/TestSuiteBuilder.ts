import { writeFileSync } from "fs";
import { Logger } from "./Logger";
import { TestContext, TestContextDefaults } from "./TestContext";

export type TestSuiteDefinitionType = {
    name?: string;
    getTestsAsync: GetTestsFnType;
}

export type TestSuiteType = {
    name: string;
    tests: TestType[];
}

export type GetTestsFnType = () => Promise<TestType[]>;

export type TestType = {
    name: string;
    run: TestFnType;
}

export type TestFnType = (params: { context: TestContext }) => Promise<void>;

type TestResultItemType = {
    error: Error | null,
    test: TestType,
    suite: TestSuiteType
}
type SuiteResultItemType = {
    suite: TestSuiteType;
    testResults: TestResultItemType[];
}

export const testSuite = (getTests: GetTestsFnType): TestSuiteDefinitionType => {

    return {
        getTestsAsync: getTests
    };
}

export const test = (what: string, fn: TestFnType): TestType => {

    return {
        name: what,
        run: fn
    };
}

export class SuiteListBuilder {

    private _suites: TestSuiteDefinitionType[] = [];
    private _abortOnException: boolean;
    private _logs: string[] = [];

    constructor(private _testContextDefaults: TestContextDefaults) {

    }

    setAbortOnException(yn: 'YES' | 'NO') {

        this._abortOnException = yn === 'YES';
        return this;
    }

    addSuites(obj: { [K: string]: TestSuiteDefinitionType }) {

        Object
            .keys(obj)
            .forEach(key => {

                const suite = obj[key];
                this._suites.push({ ...suite, name: key })
            });

        return this;
    }

    async runAllAsync() {

        let suiteResults: SuiteResultItemType[] = [];

        const testSuites = await this
            ._getTestsAsync();

        for (let suiteIndex = 0; suiteIndex < testSuites.length; suiteIndex++) {

            const testSuite = testSuites[suiteIndex];
            const { tests } = testSuite;
            let testResults: TestResultItemType[] = [];

            for (let testIndex = 0; testIndex < tests.length; testIndex++) {

                const test = tests[testIndex];

                Logger.log(`------ Executing test "${test.name}"...`);

                const result = await this
                    ._executeTest(testSuite, test);

                testResults
                    .push(result);
            }

            const suiteResult: SuiteResultItemType = {
                suite: testSuite,
                testResults
            };

            suiteResults
                .push(suiteResult);
        }

        /**
         * Log suite results 
         */
        this._logResults(suiteResults);

        /**
         * Throw final error log
         */
        this._throwFinalErrorLog(suiteResults);
    }

    private async _executeTest(suite: TestSuiteType, test: TestType): Promise<TestResultItemType> {

        const testContext = new TestContext(this._testContextDefaults);

        let testError: Error | null = null;

        try {

            await test
                .run({ context: testContext });
        }
        catch (error: any) {

            if (this._abortOnException) {

                Logger.log(`   Test: "${test.name}" -> ${'Failed'}`);
                throw new Error(`Error msg: ${error?.message}`);
            }
            else {

                testError = error;
            }
        }

        return ({
            error: testError,
            suite,
            test
        });
    }

    private _throwFinalErrorLog(suiteResults: SuiteResultItemType[]) {

        const errors = suiteResults
            .flatMap(x => x.testResults)
            .filter(x => x.error);

        const getCleanerStack = (err: Error) => {

            Error.captureStackTrace(err, getCleanerStack);
            return err.stack;
        }

        const errorMessage = errors
            .map(errorLogItem => ({
                msg: errorLogItem.error!.message ?? 'no message',
                stack: getCleanerStack(errorLogItem.error!),
                path: `${errorLogItem.suite.name} / "${errorLogItem.test.name}"`
            }))
            .map(x => `-----------------------------\n${x.path}\n${x.msg}\n${x.stack}`);

        const finalMessage = `${errors.length} tests failed: \n\n${errorMessage.join('\n\n')}`;

        // push final message to logs
        Logger.log(finalMessage, true);

        // flushLogsToFile
        Logger.flush();

        // throw final exception
        if (errors.length > 0)
            throw new Error(finalMessage);
    }

    private _logResults(suiteResults: SuiteResultItemType[]) {

        const flat = suiteResults.flatMap(x => x.testResults);

        Logger.log(`Executed ${flat.length} tests (${flat.filter(x => x.error).length} failed)!`);

        suiteResults
            .forEach(sr => {

                Logger.log(`Suite: ${sr.suite.name}`);

                sr
                    .testResults
                    .forEach(tr => {

                        Logger.log(`   Test: "${tr.test.name}" -> ${tr.error ? 'Failed' : 'Ok'}`);
                    })
            });
    }

    private async _getTestsAsync() {

        let testSuites: TestSuiteType[] = [];

        for (let suiteIndex = 0; suiteIndex < this._suites.length; suiteIndex++) {

            const testSuiteDef = this._suites[suiteIndex];
            const tests = await testSuiteDef
                .getTestsAsync();

            testSuites
                .push({
                    name: testSuiteDef.name!,
                    tests
                });
        }

        return testSuites;
    }
}