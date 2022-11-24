import { RemapToFunctions, RemapToConstructors } from './XDInjectorTypes';

type ParametrizedFunction<T = any> = (...args: any[]) => T;
type ParametrizedConstructor<T = any> = { new(...args: any[]): T };

export type DepHierarchyFunction = ParametrizedFunction | ParametrizedConstructor;
export type DepHierarchyItemConstraint = string | DepHierarchyFunction;
export type DependencyContainer<T extends DepHierarchyItemConstraint = DepHierarchyItemConstraint> = DepHierarchyItem<T>[];

export class DepHierarchyItem<T extends DepHierarchyItemConstraint = DepHierarchyItemConstraint> {

    public key: T;
    public deps: T[];
    public params?: any;
    public instance: any;

    constructor(opts: {
        key: T,
        deps?: T[],
        params?: any,
        instance?: any
    }) {
        this.key = opts.key;
        this.deps = opts.deps ?? [];
        this.params = opts.params;
        this.instance = opts.instance;
    }

    getCompareKey() {

        return this
            ._getCompareKeyFromValue(this.key);
    }

    getDepsCompareKeys() {

        return this
            .deps
            .map(x => this
                ._getCompareKeyFromValue(x));
    }

    private _getCompareKeyFromValue(value: T) {

        return typeof value === 'string'
            ? value
            : value.name;
    }
}

class XDependencyHierarchyBuilder<T extends DepHierarchyFunction> {

    private _items: DependencyContainer<T> = [];

    constructor() {
    }

    addFunction<T extends ParametrizedFunction>(fn: T, deps: RemapToFunctions<Parameters<T>>, params?: any) {

        const item = new DepHierarchyItem<T>({
            key: fn,
            deps: deps as any,
            params
        });

        this._items.push(item as any);

        return this;
    }

    addClass<T extends ParametrizedConstructor>(classType: T, deps: RemapToConstructors<ConstructorParameters<T>>) {

        const item = new DepHierarchyItem<T>({
            key: classType as any,
            deps: deps as any
        });
        this._items.push(item as any);

        return this;
    }

    addClassInstance<TInstance>(classType: ParametrizedConstructor<TInstance>, instance: TInstance) {

        const item = new DepHierarchyItem<T>({
            key: classType as any,
            instance
        });
        this._items.push(item as any);

        return this;
    }

    getContainer() {

        return this._items;
    }
}

export class XDependency {

    static getFunctionBuilder() {

        return new XDependencyHierarchyBuilder<ParametrizedFunction>();
    }

    static getClassBuilder() {

        return new XDependencyHierarchyBuilder<ParametrizedConstructor>();
    }

    static instantiate(container: DependencyContainer<DepHierarchyFunction>) {

        // order items 
        const orderedContainer = this
            .orderDepHierarchy(container);

        // instantiate 
        return this
            .instatiateOnly(orderedContainer);
    }

    static instatiateOnly(orderedContainer: DepHierarchyItem<DepHierarchyFunction>[]) {

        // instance container 
        const instances = {} as any;

        // reg instance 
        const regInstance = (item: DepHierarchyItem<DepHierarchyFunction>, instance: any) => instances[item.getCompareKey()] = instance;

        // execute function
        const instantiateItem = (item: DepHierarchyItem<DepHierarchyFunction>, args: any[]) => {

            if (item.instance)
                return item.instance;

            const fn = item.key;

            const isClass = Object
                .getOwnPropertyNames(fn)
                .includes('prototype');

            return isClass
                ? new (fn as ParametrizedConstructor)(...args)
                : (fn as ParametrizedFunction)(...args);
        };

        // get instance 
        const getInstance = (key: string) => instances[key] ?? null;

        // has instance
        const hasInstance = (key: string) => !!getInstance(key);

        // instatniate item
        const instatiateItem = (item: DepHierarchyItem<DepHierarchyFunction>): any => {

            // get dep instances
            const depInstances = item
                .getDepsCompareKeys()
                .map(dependencyKey => {

                    // existing instance 
                    if (hasInstance(dependencyKey))
                        return getInstance(dependencyKey);

                    // new item
                    return instatiateItem(orderedContainer
                        .single(x => x
                            .getCompareKey() === dependencyKey));
                });

            // get instance 
            const instance = instantiateItem(item, depInstances);

            // reg instance 
            regInstance(item, instance);
        };

        // instantiate items
        orderedContainer
            .forEach(item => instatiateItem(item));

        const itemInstancePairs = orderedContainer
            .map((item): [DepHierarchyItem<DepHierarchyFunction>, any] => [item, getInstance(item.getCompareKey())]);

        return {
            getInstance,
            instances,
            itemInstancePairs
        };
    }

    static orderDepHierarchy<T extends DepHierarchyItemConstraint>(container: DependencyContainer<T>): DependencyContainer<T> {

        /**
         * State
         */
        const ordered: DepHierarchyItem<T>[] = [];
        let unordered: DepHierarchyItem<T>[] = [...container]
            .orderBy(x => x.getDepsCompareKeys().length);

        /**
         * Check integrity
         */
        const allKeys = unordered
            .map(w => w.getCompareKey());

        const allDeps = unordered
            .flatMap(x => x.getDepsCompareKeys())
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
        const move = (item: DepHierarchyItem<T>) => {

            // add to ordered
            ordered
                .push(item);

            // remove from unordered
            unordered = unordered
                .filter(x => x.getCompareKey() !== item.getCompareKey());
        };

        /**
         * Begin ordering
         */
        while (unordered.length > 0) {

            let itemToMove: DepHierarchyItem<T> | null = null;

            for (let index = 0; index < unordered.length; index++) {

                const depHierarchyItem = unordered[index];
                const hasZeroDeps = depHierarchyItem.getDepsCompareKeys().length === 0;
                const allDepsInOrdered = depHierarchyItem
                    .getDepsCompareKeys()
                    .all(x => ordered
                        .any(orderedItem => orderedItem.getCompareKey() === x));

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
}