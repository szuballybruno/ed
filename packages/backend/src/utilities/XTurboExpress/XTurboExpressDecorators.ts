import { ConstructorSignature } from '../../services/misc/advancedTypes/ConstructorSignature';
import { XMetadataHandler } from '@episto/xcore';
import { EndpointOptionsType } from './XTurboExpressTypes';

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
};