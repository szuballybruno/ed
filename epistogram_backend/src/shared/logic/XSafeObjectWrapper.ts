import { Id } from '../types/versionId';

type SafeObjectValidatorFunctionType<TValue> = (value: TValue) => boolean;

type SafeObjCastType =
    | 'string' | 'int' | 'float' | 'boolean'
    | 'string[]' | 'int[]' | 'float[]' | 'boolean[]'
    | 'custom'
    | 'any[]';

export class XSafeObjectWrapper<TObject> {

    data: TObject;

    constructor(data: TObject) {

        this.data = data;
    }

    /**
     * Get value or null
     */
    getValueOrNull<TValue>(getter: (data: TObject) => TValue, castType: SafeObjCastType, fn?: SafeObjectValidatorFunctionType<TValue>): TValue | null {

        if (getter(this.data) === undefined || getter(this.data) === null)
            return null;

        return this.getValueCore(getter, castType, fn);
    }

    /**
     * Get value
     */
    getValue(getter: (data: TObject) => string, castTypeOrFn: 'string'): string;
    getValue(getter: (data: TObject) => string[], castTypeOrFn: 'string[]'): string[];
    getValue(getter: (data: TObject) => number, castTypeOrFn: 'int'): number;
    getValue(getter: (data: TObject) => number[], castTypeOrFn: 'int[]'): number[];
    getValue(getter: (data: TObject) => number, castTypeOrFn: 'float'): number;
    getValue(getter: (data: TObject) => number[], castTypeOrFn: 'float[]'): number[];
    getValue(getter: (data: TObject) => boolean, castTypeOrFn: 'boolean'): boolean;
    getValue(getter: (data: TObject) => boolean[], castTypeOrFn: 'boolean[]'): boolean[];
    getValue<TId extends String>(getter: (data: TObject) => Id<TId>, castTypeOrFn: 'int'): Id<TId>;
    getValue<TId extends String>(getter: (data: TObject) => Id<TId>[], castTypeOrFn: 'int[]'): Id<TId>[];
    getValue<TValue>(getter: (data: TObject) => TValue[], castTypeOrFn: 'any[]'): TValue[];
    getValue<TValue>(getter: (data: TObject) => TValue, castType: 'custom', fn: SafeObjectValidatorFunctionType<TValue>): TValue;
    getValue<TValue>(getter: (data: TObject) => TValue, castType: SafeObjCastType, fn?: SafeObjectValidatorFunctionType<TValue>): TValue {

        return this.getValueCore(getter, castType, fn);
    }

    private getValueCore<TValue>(getter: (data: TObject) => TValue, castType: SafeObjCastType, fn?: SafeObjectValidatorFunctionType<TValue>): any {

        const value = getter(this.data) as any;
        if (value === null || value === undefined)
            throw new Error('Value null or undefined!');

        if (castType === 'string[]')
            return this.parseArray(value, x => x);

        if (castType === 'int')
            return parseInt(value);

        if (castType === 'int[]')
            return this.parseArray(value, x => parseInt(x));

        if (castType === 'float')
            return parseFloat(value);

        if (castType === 'float[]')
            return this.parseArray(value, x => parseFloat(x));

        if (castType === 'boolean')
            return this.parseBoolean(value);

        if (castType === 'boolean[]')
            return this.parseArray(value, x => this.parseBoolean(x));

        if (castType === 'any[]') {

            if (!Array.isArray(value))
                throw new Error('Expected type is array but value is of a different type.');

            return value;
        }

        if (castType === 'custom') {
            const isValid = fn!(value);
            if (!isValid)
                throw new Error('Validator function failed on value in safe object.');
        }

        return value;
    }

    private parseArray<T>(arr: any, fn: (x: any) => T) {

        return arr as T[];
    }

    private parseBoolean(value: any) {

        if (value === true || value === false)
            return value;

        if (value !== 'true' && value !== 'false')
            throw new Error('Error parsing boolean value: ' + value);

        return (value === 'true');
    }
}