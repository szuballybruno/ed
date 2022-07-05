import { FieldMutation } from '../../../shared/dtos/mutations/FieldMutation';
import { Mutation } from '../../../shared/dtos/mutations/Mutation';
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

export type OnMutationHandlerType<TKey> = (changedKey?: TKey) => void;

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
    private _isPostMutationsChangedScope: boolean = false;
    private _originalItems: TMutatee[] = [];
    private _onMutationsChanged: OnMutationHandlerType<TKey> = () => 1;
    private _onPostMutationsChanged: OnMutationHandlerType<TKey> = () => 1;

    // constructor input
    private _keyPropertyName: TKeyField;

    // ctor
    constructor(opts: {
        keyPropertyName: TKeyField,
        onMutationsChanged?: OnMutationHandlerType<TKey>,
    }) {
        this._keyPropertyName = opts.keyPropertyName;

        if (opts.onMutationsChanged)
            this.setOnMutationsChanged(opts.onMutationsChanged);
    }

    setOnPostMutationChanged(callback: () => void) {

        this._onPostMutationsChanged = () => {

            this._logEvent('-- On post mutations changed');

            this._logEvent('Post mutation changed scope BEGIN');
            this._isPostMutationsChangedScope = true;

            callback();

            this._logEvent('Post mutation changed scope END');
            this._isPostMutationsChangedScope = false;

            this._applyMutations();
        };
    }

    setOnMutationsChanged(callback: () => void) {

        this._onMutationsChanged = () => {

            this._logEvent('-- On mutations changed');
            callback();
        };
    }

    setOriginalItems(originalItems: TMutatee[]) {

        this._originalItems = originalItems;
        this.mutatedItems = originalItems;
        this.setMutations([]);
    }

    // getter for isAnyMutated
    get isAnyMutated(): boolean {

        return this.mutations.length > 0;
    }

    // 
    // FUNCTION: [this.setMutations] 
    // applies mutations on the items array,
    // returns a new array that's been mutated
    //
    setMutations = (muts: Mutation<TMutatee, TKeyField>[], changedKey?: TKey, onMutationChanged?: 'NO CALLBACK') => {

        // set mutations 
        this.mutations = muts ?? [];

        // exit if post mutation changed scope
        // below calls will be handled dieeferntly
        if (this._isPostMutationsChangedScope || onMutationChanged === 'NO CALLBACK')
            return;

        this._applyMutations(changedKey);
        this._onPostMutationsChanged();
        this._onMutationsChanged(changedKey);
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

        const newMutations = [...this.mutations];

        // get original value
        const { hasOriginalValue, originalValue } = (() => {

            const originalItem = this._getOriginalItems()
                .firstOrNull(x => this._getCompareKey(x) === key);

            const originalValue = originalItem && originalItem[field];

            return { hasOriginalValue: !!originalItem, originalValue };
        })();

        // ORIGINAL VALUE = NEW VALUE CHECK
        // if new mutation value equals to 
        // the original value, remove mutations for field
        if (hasOriginalValue && originalValue === newValue) {

            const { hasExisitingFieldMut, newMutations: muts } = this
                ._removeExistingMutation(newMutations, key, field);

            if (hasExisitingFieldMut) {

                this._logEvent(`Original value: ${originalValue} = New value ${newValue}. Removing mutation: ${key} - ${field}`);
                this.setMutations(muts, key);
            }

            return;
        }

        // MUTATIING DELETED CHECK
        const oldMutation = newMutations
            .filter(x => x.key === key)[0];

        if (oldMutation && oldMutation.action === 'delete') {

            console.warn('Tying to mutate an object that hase already been marked as removed.');
            return;
        }

        // Create new update mutation or 
        // use old one if there's one
        const mutation: Mutation<TMutatee, TKeyField> = oldMutation
            ? oldMutation
            : {
                key,
                fieldMutators: [],
                action: 'update'
            };

        const isNewMutation = mutation.fieldMutators.length === 0;

        // if created new mutation, add it to the mutations 
        if (isNewMutation) {

            this._logEvent(`Adding new mutation: ${key} - ${field} - ${newValue}`);
            newMutations.push(mutation);
        }

        // get existing property mutator
        // and mutate it's value
        const existingPropertyMutator = mutation
            .fieldMutators
            .filter(x => x.field === field)[0];

        if (existingPropertyMutator) {

            this._logEvent(`Updating mutation '${key}' property mutator '${field}' value: ${existingPropertyMutator.value} -> ${newValue}`);

            existingPropertyMutator
                .value = newValue;
        }

        // Create new property mutator
        // and append it to field mutators 
        else {

            this._logEvent(`Mutation '${key}' adding new property mutator '${field}' value: ${newValue}`);

            mutation
                .fieldMutators
                .push({ field, value: newValue });
        }

        // set new mutations
        this.setMutations(newMutations, key);
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

            this._logEvent(`Removing previous mutation of item '${removeKey}', since it's being deleted.`);

            newMutations = newMutations
                .filter(x => x.key !== removeKey);
        }

        // add delete mutation
        else {

            this._logEvent(`Adding new 'delete' mutation Key: ${removeKey}!`);

            const mut: Mutation<TMutatee, TKeyField> = {
                key: removeKey,
                action: 'delete',
                fieldMutators: []
            };

            newMutations.push(mut);
        }

        // set new mutations list 
        this.setMutations(newMutations, removeKey);
    };

    // 
    // FUNCTION: [Add] 
    // add an item to the list 
    //
    create = (key: TKey, obj: TMutatee) => {

        if (key === null || key === undefined)
            throw new Error('Mutation error, key is null or undefined!');

        this._setCompareKey(obj as TMutatee, key);

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

        this.setMutations(newMutations, key);
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
    resetMutations = (callback?: 'NO CALLBACK') => {

        this.setMutations([], undefined, callback);
    };

    // --------------- PRIVATE ------------------------

    /**
     * Remove existing mutation
     */
    private _removeExistingMutation(newMutations: Mutation<TMutatee, TKeyField>[], key: TKey, field: StringKeyof<TMutatee>) {

        const existingMutation = newMutations
            .filter(x => x.key === key)[0];

        if (!existingMutation)
            return { hasExisitingFieldMut: false, newMutations };

        const fieldMut = existingMutation
            .fieldMutators
            .filter(x => x.field === field)[0];

        if (!fieldMut)
            return { hasExisitingFieldMut: false, newMutations };

        const existingMutationHasOnlyOneElement = existingMutation.fieldMutators.length === 1;

        // remove whole mutation
        if (existingMutationHasOnlyOneElement) {

            const filteredMuts = newMutations
                .filter(x => x.key !== key);

            return { hasExisitingFieldMut: true, newMutations: filteredMuts };
        }

        // remove field mutation
        else {

            existingMutation
                .fieldMutators = existingMutation
                    .fieldMutators
                    .filter(x => x.field !== field);

            return { hasExisitingFieldMut: true, newMutations };
        }
    }

    /**
     * gets a clone of the original items array 
     */
    private _getOriginalItems() {

        return clone(this._originalItems);
    }

    // 
    // FUNCTION: [overrideProps] 
    //
    private _overrideProps = (obj: any, fieldMutators: FieldMutation<TMutatee, any>[]) => {

        fieldMutators
            .map(x => obj[x.field] = x.value);

        return obj;
    };

    // 
    // FUNCTION: [createObj] 
    //
    private _createObj = (mut: Mutation<TMutatee, TKeyField>): TMutatee => {

        return this._overrideProps({} as any, mut.fieldMutators!);
    };

    // 
    // FUNCTION: [ApplyMutations] 
    // applies mutations on the items array,
    // returns a new array that's been mutated
    //
    private _applyMutations = (changedKey?: TKey) => {

        // added items 
        const addedItems = this.mutations
            .filter(mut => mut.action === 'add')
            .map(mut => this._createObj(mut));

        // deleted keys 
        const deletedKeys = this.mutations
            .filter(x => x.action === 'delete')
            .map(x => x.key);

        // final output list
        const mutatedItems = this._getOriginalItems()
            .concat(addedItems)
            .filter(item => !deletedKeys
                .some(x => x === this._getCompareKeyValue(item)));

        // apply updates
        this.mutations
            .filter(mutation => mutation.action === 'update')
            .forEach(mutation => {

                const itemIndex = mutatedItems
                    .findIndex(item => this._getCompareKeyValue(item) === mutation.key);

                if (itemIndex === -1)
                    return;

                const targetItem = mutatedItems[itemIndex];

                mutatedItems[itemIndex] = this._overrideProps(targetItem, mutation.fieldMutators);
            });

        // set mutated items internally 
        this.mutatedItems = mutatedItems;
    };

    // 
    // FUNCTION: [SetCompareKey] 
    // set the value of the 
    // TMutatee object's compare key prop  
    //
    private _setCompareKey = (obj: TMutatee, key: TKey) => {

        (obj as any)[this._keyPropertyName] = key;
    };


    // 
    // FUNCTION: [this.logEvent] 
    //
    private _logEvent = (text: string) => {

        console.log(`MUTATION: ${text}`);
    };

    // 
    // FUNCTION: [getCompareKey] 
    //
    private _getCompareKey = (item: TMutatee) => item[this._keyPropertyName];

    // 
    // FUNCTION: [getCompareKeyValue] 
    //
    private _getCompareKeyValue = (obj: TMutatee) => {

        const key = this._getCompareKey(obj);
        if (key === null || key === undefined)
            throw new Error('Can\'t use null or undeined as object key!');

        return key;
    };
}
