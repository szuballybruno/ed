

export type RegistrationType = 'ActivationCode' | 'PublicRegistrationToken' | 'Invitation';

export type TaskCodeType = 'user_progress_evaluation';

// export type SuperTypeProp<T> = [SafeObjCastType, 'nullable'] | [SafeObjCastType];

// export type SuperType = { [K: string]: SuperTypeProp<any> };

// export const createSuperType = <T extends SuperType>(obj: T) => obj;

// export class SuperTypePropType<T, TName extends SafeObjCastType> {
//     type = null as T;
//     constructor(public name: TName) { }
// }

// const getSuperTypePropType = <T>() => <TName extends SafeObjCastType>(name: TName) => new SuperTypePropType<T, TName>(name);

// const superTypePropDefs = [
//     getSuperTypePropType<number>()('int'),
//     getSuperTypePropType<number>()('float'),
//     getSuperTypePropType<boolean>()('boolean'),
// ] as const;

// type SuperTypePropDefsListType = (typeof superTypePropDefs)[number];

// type SuperTypePorpDefsObjType = { [K in SuperTypePropDefsListType as K['name']]: K['type'] };

// const obj = createSuperType({
//     asd: ['any', 'nullable'],
//     asd2: ['any'] as SuperTypeProp<number>
// });

