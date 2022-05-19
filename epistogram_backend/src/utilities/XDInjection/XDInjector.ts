import { FunctionSignature } from '../../services/misc/advancedTypes/FunctionSignature';

type FnType = { fn: Function, deps: Function[] };

export class XDInjector {

    private _functions: FnType[] = [];
    private _instances: any;

    add(fn: Function, deps: Function[]) {

        this._functions.push({ fn, deps });
        return this;
    }

    build() {

        this._depcheck();

        const callFn = (currentFn: FnType) => {

            if (currentFn.deps.length === 0)
                this._regInstance(currentFn.fn, currentFn.fn());

            const depInstances = currentFn
                .deps
                .map(dep => {

                    if (this._checkInstance(dep))
                        return this._getInstance(dep);

                    const depProvider = this._getDepProviderFunction(dep);

                    return callFn(depProvider);
                });
        };

        callFn(this._functions.first());

        return this;
    }

    getInstance<T>(fn: FunctionSignature<T>): T | null {

        if (!this._instances)
            throw new Error('Build first!');

        return this._instances[fn.name] ?? null;
    }

    _depcheck() {

        const allDeps = this._functions
            .flatMap(x => x.deps)
            .groupBy(x => x.name)
            .map(x => x.first);

        const missingFunctionsForDeps = allDeps
            .filter(dep => !this._functions
                .any(fn => fn.fn.name === dep.name));

        if (missingFunctionsForDeps.length > 0)
            throw new Error(`Deps are missing from functions: [${missingFunctionsForDeps
                .map(x => x.name)
                .join(', ')}]`);
    }

    _getDepProviderFunction(depFn: Function) {

        return this._functions
            .single(x => x.fn.name === depFn.name);
    }

    _regInstance(fn: Function, instance: any) {

        this._instances[fn.name] = instance;
    }

    _getInstance(fn: Function) {

        return this._instances[fn.name] ?? null;
    }

    _checkInstance(fn: Function) {

        return !!this._getInstance(fn);
    }
}