import { ConstructorSignature } from '../../models/Types';
import { XMetadataHandler } from '../XMetadata/XMetadataHandler';
import { EndpointOptionsType } from './TurboExpress';

const CONTROLLER_ACTION_METADATA_KEY = 'CONTROLLER_ACTION_METADATA_KEY';

type ControllerActionDataType = { path: string } & EndpointOptionsType;

export const XControllerAction = (path: string, opts: EndpointOptionsType = {}) => {

    return (prototype: any, propertyKey: string) => {

        const className = prototype
            .constructor
            .name;

        const data: ControllerActionDataType = {
            path,
            ...opts
        };

        XMetadataHandler
            .regMetadata(className, propertyKey, CONTROLLER_ACTION_METADATA_KEY, data);
    };
};

export const getControllerActionMetadatas = <T>(controller: ConstructorSignature<T>) => {

    const datas = XMetadataHandler
        .getMetadataProperiesByCode<ControllerActionDataType>(controller.name, CONTROLLER_ACTION_METADATA_KEY);

    return datas;
    // const checkType = XMetadataHandler.getMetadata(classType.name, propName as string, IS_DELETED_FLAG_METADATA_KEY) as CheckType;

    // return {
    //     propName,
    //     checkType
    // };
};