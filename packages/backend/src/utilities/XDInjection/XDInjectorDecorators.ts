import { FunctionSignature } from '../../services/misc/advancedTypes/FunctionSignature';
import { XMetadataHandler } from '../XMetadata/XMetadataHandler';

const XD_INJECTOR_CONSTRUCTOR_METADATA_KEY = 'XD_INJECTOR_CONSTRUCTOR';

export type XDInjectorConstructorParamsType = Function[];

export const XDInjectorConstructor = (params?: XDInjectorConstructorParamsType) => {

    return (target: Function) => {

        const className = target.name;

        XMetadataHandler
            .regClassMetadata(className, XD_INJECTOR_CONSTRUCTOR_METADATA_KEY, params ?? []);
    };
};

export const getXDInecjtorConstructorParams = <T>(fn: FunctionSignature<T>) => {

    // const data = XMetadataHandler
    //     .getMetadataProperies<XDInjectorConstructorParamsType>(fn.name, XD_INJECTOR_CONSTRUCTOR_METADATA_KEY);

    // return data;
};