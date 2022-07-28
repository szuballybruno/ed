import { FunctionSignature } from '../../services/misc/advancedTypes/FunctionSignature';
import { ParametrizedFunction } from '../../services/misc/advancedTypes/ParametrizedFunction';
import { RemapToFunctions } from '../../services/misc/advancedTypes/RemapToFunctions';

type FnType<TProps> = { fn: Function, deps: Function[], props: TProps };

type DepHierarchyItem = {
    name: string;
    deps: string[];
}

export class XDInjector<TProps = void> {

    private _functions: FnType<TProps>[] = [];
    private _instances: any;

    static orderDepHierarchy(depHierarchyItems: DepHierarchyItem[]) {

        /**
         * State
         */
        const ordered: DepHierarchyItem[] = [];
        let unordered: DepHierarchyItem[] = [...depHierarchyItems]
            .orderBy(x => x.deps.length);

        /**
         * Check integrity
         */
        const allKeys = unordered
            .map(w => w.name);

        const allDeps = unordered
            .flatMap(x => x.deps)
            .groupBy(x => x)
            .map(x => x.key);

        const missingDeps = allDeps
            .filter(x => allKeys
                .none(y => y === x));

        if (missingDeps.length > 0)
            throw new Error(`Missing deps: [${missingDeps.join(', ')}]`);

        /**
         * Move function 
         */
        const move = (item: DepHierarchyItem) => {

            // console.log(`[${ordered.length + 1}] Ordering... ${item.name}`);

            // add to ordered
            ordered
                .push(item);

            // remove from unordered
            unordered = unordered
                .filter(x => x.name !== item.name);
        };

        /**
         * Begin ordering
         */
        console.log(`Ordering ${unordered.length} items...`);

        while (unordered.length > 0) {

            let itemToMove: DepHierarchyItem | null = null;

            for (let index = 0; index < unordered.length; index++) {

                const depHierarchyItem = unordered[index];
                const hasZeroDeps = depHierarchyItem.deps.length === 0;
                const allDepsInOrdered = depHierarchyItem
                    .deps
                    .all(x => ordered
                        .any(orderedItem => orderedItem.name === x));

                if (hasZeroDeps || allDepsInOrdered) {

                    itemToMove = depHierarchyItem;
                    break;
                }
            }

            if (!itemToMove)
                throw new Error('Dep hierarchy ordering iteration failed.');

            move(itemToMove);
        }

        return ordered;
    }

    add<T extends ParametrizedFunction>(fn: T, deps: RemapToFunctions<Parameters<T>>, props: TProps) {

        if (this._getArgsCount(fn) !== deps.length)
            throw new Error(`Function [${fn.name}] parameter count mismatch, expected arguments: ${this._getArgsCount(fn)}!`);

        this._functions.push({ fn, deps, props });
        return this;
    }

    build() {

        this._depcheck();
        this._instances = {};

        const callFunction = (currentFn: FnType<TProps>): any => {

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

    getInstance(fn: Function): any | null;
    getInstance<T>(fn: FunctionSignature<T>): T | null {

        if (!this._instances)
            throw new Error('Build first!');

        return this._instances[fn.name] ?? null;
    }

    getInstanceWithProps<T>(fn: FunctionSignature<T>): { instance: T, props: TProps } | null {

        const instance = this.getInstance(fn);
        const props = this.getProps(fn);

        if (!instance)
            return null;

        return {
            instance,
            props
        };
    }

    getInstances(): any[] {

        return Object.values(this._instances);
    }

    getFunctions() {

        return this._functions
            .map(x => ({
                fn: x.fn,
                props: x.props
            }));
    }

    getProps(fn: Function) {

        return this._functions
            .single(x => x.fn.name === fn.name)
            .props;
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