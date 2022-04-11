// // export const IsDeletedFlag = (target: any, memberName: string) => {

// //     return
// // }

import 'reflect-metadata';
import { getKeys } from '../../shared/logic/sharedLogic';

const metadataKey = 'MyDecorator';

export const MyDecorator = (prototype: any, propertyKey: string) => {

    Reflect.defineMetadata(metadataKey, true, prototype, propertyKey);
};

export const GetDecorators = <T>(classType: { new(): T }) => {

    const instance = instatiate(classType);

    getKeys(instance)
        .forEach(x => console.log(x));
};

export const instatiate = <T>(classType: { new(): T }) => {

    return new classType();
};

// function myDecoratorUsingInstance<T>(instance: T, propertyKey: string) {
//     return !!Reflect.getMetadata(metadataKey, instance, propertyKey);
// }

// class MyClass {
//     @MyDecorator
//     property1;
//     property2;
// }

// console.log(myDecoratorUsingClass(MyClass, 'property1')); // true
// console.log(myDecoratorUsingClass(MyClass, 'property2')); // false

// const instance = new MyClass();
// console.log(myDecoratorUsingInstance(instance, 'property1')); // true
// console.log(myDecoratorUsingInstance(instance, 'property2')); // false