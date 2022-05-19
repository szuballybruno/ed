import { FunctionSignature } from '../../services/misc/advancedTypes/FunctionSignature';
import { ParametrizedFunction } from '../../services/misc/advancedTypes/ParametrizedFunction';

type FnType = { fn: Function, deps: Function[] };

type Remap<Tuple extends [...any[]]> = {
    [Index in keyof Tuple]: ParametrizedFunction<Tuple[Index]>;
} & { length: Tuple['length'] };

type asd2 = Remap<[string, number]>;

export class XDInjector {

    private _functions: FnType[] = [];
    private _instances: any;

    add<T extends ParametrizedFunction>(fn: T, deps: Remap<Parameters<T>>) {

        if (this._getArgsCount(fn) !== deps.length)
            throw new Error(`Function [${fn.name}] parameter count mismatch, expected arguments: ${this._getArgsCount(fn)}!`);

        this._functions.push({ fn, deps });
        return this;
    }

    build() {

        this._depcheck();
        this._instances = {};

        const callFunction = (currentFn: FnType): any => {

            // no deps 
            if (currentFn.deps.length === 0) {

                const currentFnRes = this._execFn(currentFn.fn, []);
                this._regInstance(currentFn.fn, currentFnRes);
            }

            // deps found 
            else {

                const depInstances = currentFn
                    .deps
                    .map(dep => {

                        if (this._checkInstance(dep))
                            return this._getInstance(dep);

                        const depProvider = this._getDepProviderFunction(dep);

                        return callFunction(depProvider);
                    });

                const currentFnInstance = this._execFn(currentFn.fn, depInstances);
                this._regInstance(currentFn.fn, currentFnInstance);
            }
        };

        this._functions
            .forEach(func => callFunction(func));

        return this;
    }

    getInstance<T>(fn: FunctionSignature<T>): T | null {

        if (!this._instances)
            throw new Error('Build first!');

        return this._instances[fn.name] ?? null;
    }

    _getArgsCount(fn: Function) {

        return fn.length;
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

    _execFn(fn: Function, args: any[]) {

        return fn(args[0], args[1], args[2], args[3], args[4]);
    }
}