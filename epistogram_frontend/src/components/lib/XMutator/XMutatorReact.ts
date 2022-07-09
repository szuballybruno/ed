import { useRef } from 'react';
import { useForceUpdate } from '../../../static/frontendHelpers';
import { StringKeyof, XMutatorCore } from './XMutatorCore';

export const useXMutator = <TMutatee extends Object, TKeyField extends StringKeyof<TMutatee>>(dto: { new(): TMutatee }, keyPropName: TKeyField) => {

    const forceUpdate = useForceUpdate();
    const mutatorRef = useRef(new XMutatorCore<TMutatee, TKeyField, TMutatee[TKeyField]>({
        keyPropertyName: keyPropName,
        onMutationsChanged: forceUpdate
    }));

    return mutatorRef;
};