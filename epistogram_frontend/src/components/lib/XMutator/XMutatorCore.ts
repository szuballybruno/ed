import { FieldMutation } from '../../../shared/dtos/mutations/FieldMutation';
import { Mutation } from '../../../shared/dtos/mutations/Mutation';
import { MutationActionType } from '../../../shared/dtos/mutations/MutationActionType';
import { getKeys } from '../../../shared/logic/sharedLogic';
import { Environment } from '../../../static/Environemnt';
import { clone } from '../../../static/frontendHelpers';

export type StringKeyof<T> = (keyof T) & string;

export type OnMutaionHandlerActionType<
    TMutatee,
    TKey,
    TField extends StringKeyof<TMutatee>> = (params: {
        key: TKey;
        field: TField;
        newValue: TMutatee[TField];
        item: TMutatee | null;
    }) => void;

export type OnMutationHandlerType<TMutatee, TKey, TField extends StringKeyof<TMutatee>> = {
    callback: OnMutaionHandlerActionType<TMutatee, TKey, TField>;
    field?: TField;
    action: MutationActionType;
}

export type MutateFnType<TMutatee, TKey> = <TField extends StringKeyof<TMutatee>>(params: {
    key: TKey;
    field: TField;
    newValue: TMutatee[TField];
}) => void;

export class XMutatorCore<TMutatee extends Object, TKeyField extends StringKeyof<TMutatee>, TKey extends TMutatee[TKeyField]>{

    // public 
    public mutatedItems: TMutatee[] = [];
    public mutations: Mutation<TMutatee, TKeyField>[] = [];

    // internal 
    private _onMutationHandlersRef: OnMutationHandlerType<TMutatee, TKey, StringKeyof<TMutatee>>[] = [];
    private _lockRef: boolean = false;
    private _originalItems: TMutatee[] = [];

    // constructor input
    private _keyPropertyName: TKeyField;
    private _mutationEndCallback?: (opts: { newMutatedItems: TMutatee[] }) => void;
    private _onMutationsChanged: () => void;

    // ctor
    constructor(opts: {
        keyPropertyName: TKeyField,
        onMutatedItems: () => void,
        mutationEndCallback?: (opts: { newMutatedItems: TMutatee[] }) => void,
    }) {
        this._keyPropertyName = opts.keyPropertyName;
        this._mutationEndCallback = opts.mutationEndCallback;
        this._onMutationsChanged = opts.onMutatedItems;
    }

    setOriginalItems(originalItems: TMutatee[]) {

        this._originalItems = originalItems;
        this.mutatedItems = originalItems;
        this._onMutationsChanged();
    }

    getOriginalItems() {

        return clone(this._originalItems);
    }

    // getter for isAnyMutated
    get isAnyMutated(): boolean {

        return this.mutations.length > 0;
    }

    //
    // Sets the mutatetd itmesm
    //
    setMutatedItems = (items: TMutatee[]) => {

        this.mutatedItems = items;

        this.logEvent('Calling on mutate');
        this._onMutationsChanged();

        console.log('Mutated items: ');
        console.log(this.mutatedItems);
    };

    // 
    // FUNCTION: [this.logEvent] 
    //
    logEvent = (text: string) => {

        console.log(`MUTATION: ${text}`);
    };

    // 
    // FUNCTION: [getCompareKey] 
    //
    getCompareKey = (item: TMutatee) => item[this._keyPropertyName];

    // 
    // FUNCTION: [getCompareKeyValue] 
    //
    getCompareKeyValue = (obj: TMutatee) => {

        const key = this.getCompareKey(obj);
        if (key === null || key === undefined)
            throw new Error('Can\'t use null or undeined as object key!');

        return key;
    };

    // 
    // FUNCTION: [overrideProps] 
    //
    overrideProps = (obj: any, fieldMutators: FieldMutation<TMutatee, any>[]) => {

        fieldMutators
            .map(x => obj[x.field] = x.value);

        return obj;
    };

    // 
    // FUNCTION: [createObj] 
    //
    createObj = (mut: Mutation<TMutatee, TKeyField>): TMutatee => {

        return this.overrideProps({} as any, mut.fieldMutators!);
    };

    // 
    // FUNCTION: [ApplyMutations] 
    // applies mutations on the items array,
    // returns a new array that's been mutated
    //
    applyMutations = () => {

        // added items 
        const addedItems = this.mutations
            .filter(mut => mut.action === 'add')
            .map(mut => this.createObj(mut));

        // deleted keys 
        const deletedKeys = this.mutations
            .filter(x => x.action === 'delete')
            .map(x => x.key);

        // final output list
        const mutatedItems = this.getOriginalItems()
            .concat(addedItems)
            .filter(item => !deletedKeys
                .some(x => x === this.getCompareKeyValue(item)));

        // apply updates
        this.mutations
            .filter(mutation => mutation.action === 'update')
            .forEach(mutation => {

                const itemIndex = mutatedItems
                    .findIndex(item => this.getCompareKeyValue(item) === mutation.key);

                if (itemIndex === -1)
                    return;

                const targetItem = mutatedItems[itemIndex];

                mutatedItems[itemIndex] = this.overrideProps(targetItem, mutation.fieldMutators);
            });

        // set mutated items internally 
        this.setMutatedItems(mutatedItems);
    };

    // 
    // FUNCTION: [ExecuteMutationHandler] 
    // executes an on mutation handler  
    // function if a mutation action is performed  
    //
    executeMutationHandler = (opts: {
        key: TKey,
        action: MutationActionType,
        field?: any,
        newValue?: any,
    }) => {

        const { action, key, field, newValue } = opts;

        // get item by key 
        // note that this will still hold the 
        // old reference in mut handler callbacks)
        // so in a delete callback the item will be found 
        const item = this.mutatedItems
            .firstOrNull(x => this.getCompareKey(x) === key);

        this._onMutationHandlersRef
            .filter(x => x.action === action)
            .filter(x => !x.field || x.field === field)
            .forEach(x => x.callback({ key, field, newValue, item }));
    };

    /**
     * Simply set mutations and 
     * call on mutated callback  
     */
    setMutationsList(mutations: Mutation<TMutatee, TKeyField>[]) {

        // set mutations 
        this.mutations = mutations;

        // apply mutations 
        this.applyMutations();

        // call callback
        this._onMutationsChanged();
    }

    // 
    // FUNCTION: [this.setMutations] 
    // applies mutations on the items array,
    // returns a new array that's been mutated
    //
    setMutations = (opts: {
        muts: Mutation<TMutatee, TKeyField>[],
        key: TKey,
        action: MutationActionType,
        field?: any,
        newValue?: any,
    }) => {

        const { muts, ...rest } = opts;

        // set mutations 
        this.mutations = muts;

        // if this function is called recursively, 
        // from on mutation handlers, 
        // break out after setting the mutations,
        // otherwise it's an infinite loop
        if (this._lockRef)
            return;

        // set locking to true, cycle begins 
        this._lockRef = true;

        // execute on mutation handlers 
        this.executeMutationHandler(rest);

        // apply mutations 
        this.applyMutations();

        // fire mutationEndCallback with newly mutated items 
        if (this._mutationEndCallback)
            this._mutationEndCallback({ newMutatedItems: this.mutatedItems });

        // set locking to false, cycle ends 
        this._lockRef = false;
    };

    // 
    // FUNCTION: [SetCompareKey] 
    // set the value of the 
    // TMutatee object's compare key prop  
    //
    setCompareKey = (obj: TMutatee, key: TKey) => {

        (obj as any)[this._keyPropertyName] = key;
    };

    // 
    // FUNCTION: [Mutate] 
    // updates an item in the list  
    //
    mutate: MutateFnType<TMutatee, TKey> = <TField extends StringKeyof<TMutatee>>(params: {
        key: TKey,
        field: TField,
        newValue: TMutatee[TField]
    }) => {

        const { field, key, newValue } = params;

        if (key === null || key === undefined)
            throw new Error('Mutation error, key is null or undefined!');

        const setMutationsWithCallback = (muts: Mutation<TMutatee, TKeyField>[]) => {

            this.setMutations({ muts, key, field, newValue, action: 'update' });
        };

        const newMutations = [...this.mutations];

        const originalItem = this.getOriginalItems()
            .firstOrNull(x => this.getCompareKey(x) === key);

        // if new mutation value equals to 
        // the original value, remove mutations for field
        if (originalItem && originalItem[field] === newValue) {

            const existingMutation = newMutations
                .filter(x => x.key === key)[0];

            if (!existingMutation)
                return;

            const fieldMut = existingMutation
                .fieldMutators
                .filter(x => x.field === field)[0];

            if (!fieldMut)
                return;

            if (existingMutation.fieldMutators.length === 1) {

                if (Environment.loggingSettings.mutations)
                    this.logEvent(`Removing mutation: ${key}`);

                setMutationsWithCallback(newMutations
                    .filter(x => x.key !== key));
            }
            else {

                existingMutation
                    .fieldMutators = existingMutation
                        .fieldMutators
                        .filter(x => x.field !== field);

                if (Environment.loggingSettings.mutations)
                    this.logEvent(`Removing field mutation: ${key} - ${field}`);

                setMutationsWithCallback(newMutations);
            }

            return;
        }

        const oldMutation = newMutations
            .filter(x => x.key === key)[0];

        if (oldMutation && oldMutation.action === 'delete') {

            console.warn('Tying to mutate an object that hase already been marked as removed.');
            return;
        }

        const mutation: Mutation<TMutatee, TKeyField> = oldMutation
            ? oldMutation
            : {
                key,
                fieldMutators: [],
                action: 'update'
            };

        // if created new mutation, add it to the mutations 
        if (mutation.fieldMutators.length === 0) {

            if (Environment.loggingSettings.mutations)
                this.logEvent(`Adding new mutation: ${key} - ${field} - ${newValue}`);

            newMutations.push(mutation);
        }

        const propertyMutator = mutation
            .fieldMutators
            .filter(x => x.field === field)[0];

        if (propertyMutator) {

            if (Environment.loggingSettings.mutations)
                this.logEvent(`Updating mutation '${key}' property mutator '${field}' value: ${propertyMutator.value} -> ${newValue}`);

            propertyMutator
                .value = newValue;
        }
        else {

            if (Environment.loggingSettings.mutations)
                this.logEvent(`Mutation '${key}' adding new property mutator '${field}' value: ${newValue}`);

            mutation
                .fieldMutators
                .push({ field, value: newValue });
        }

        setMutationsWithCallback(newMutations);
    };

    // 
    // FUNCTION: [Remove] 
    // remove an item from the list 
    //
    remove = (removeKey: TKey) => {

        if (removeKey === null || removeKey === undefined)
            throw new Error('Mutation error, key is null or undefined!');

        // shallow copy new mutations list,
        // but without mutations related to deleted item
        // so for example 'add' mutations won't be copied over
        // thus the item will not show in the new list
        let newMutations = [...this.mutations];

        // check if deleted item is one 
        // of the newly added items,
        // if it is there's no need to add a delete mutation, 
        // just to remove the add mutation (which we already did)
        const isDeletedItemNewlyAdded = this.mutations
            .filter(x => x.key === removeKey)[0]?.action === 'add';

        // remove add mutation 
        if (isDeletedItemNewlyAdded) {

            if (Environment.loggingSettings)
                this.logEvent(`Removing previous mutation of item '${removeKey}', since it's being deleted.`);

            newMutations = newMutations
                .filter(x => x.key !== removeKey);
        }

        // add delete mutation
        else {

            if (Environment.loggingSettings.mutations)
                this.logEvent(`Adding new 'delete' mutation Key: ${removeKey}!`);

            const mut: Mutation<TMutatee, TKeyField> = {
                key: removeKey,
                action: 'delete',
                fieldMutators: []
            };

            newMutations.push(mut);
        }

        // set new mutations list 
        this.setMutations({ muts: newMutations, key: removeKey, action: 'delete', });
    };

    // 
    // FUNCTION: [Add] 
    // add an item to the list 
    //
    add = (key: TKey, obj: Partial<TMutatee>) => {

        if (key === null || key === undefined)
            throw new Error('Mutation error, key is null or undefined!');

        this.setCompareKey(obj as TMutatee, key);

        const mut: Mutation<TMutatee, TKeyField> = {
            key,
            action: 'add',
            fieldMutators: getKeys(obj as TMutatee)
                .map((x): FieldMutation<TMutatee, any> => {

                    const newObj = {
                        field: x,
                        value: obj[x]
                    };

                    return newObj;
                })
        };

        const newMutations = [...this.mutations, mut];

        this.setMutations({ muts: newMutations, action: 'add', key });
    };

    // 
    // FUNCTION: [IsMutated] 
    // check if item's field has been mutated 
    //
    isMutated = (key: TKey, field: StringKeyof<TMutatee>) => {

        if (key === null || key === undefined)
            throw new Error('Mutation error, key is null or undefined!');

        const mut = this.mutations
            .firstOrNull(x => x.key === key);

        if (!mut)
            return false;

        if (mut.action === 'add')
            return true;

        return mut
            .fieldMutators
            .some(x => x.field === field);
    };

    // 
    // FUNCTION: [setMutations] 
    // reset/clear mutations  
    //
    resetMutations = () => {

        console.log('Original items: ');
        console.log(this._originalItems);

        this.mutations = [];
        this.setMutatedItems(this.getOriginalItems());
    };

    // 
    // FUNCTION: [AddOnMutationHandlers] 
    // add/register handlers that will 
    // be triggered by mutation actions   
    //
    addOnMutationHandlers = (handers: OnMutationHandlerType<TMutatee, TKey, StringKeyof<TMutatee>>[]) => {

        this._onMutationHandlersRef = handers;
    };
}
