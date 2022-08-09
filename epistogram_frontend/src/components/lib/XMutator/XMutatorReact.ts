import { MutableRefObject, useMemo, useRef } from 'react';
import { useForceUpdate } from '../../../static/frontendHelpers';
import { IXMutator, StringKeyof, XMutatorCore } from './XMutatorCore';

export const useXMutator = <
    TMutatee extends Object,
    TKeyField extends StringKeyof<TMutatee>>(
        dto: { new(): TMutatee },
        keyPropName: TKeyField): MutableRefObject<IXMutator<TMutatee, TKeyField, TMutatee[TKeyField]>> => {

    const forceUpdate = useForceUpdate();
    const mutator = useMemo(() => new XMutatorCore<TMutatee, TKeyField, TMutatee[TKeyField]>({
        keyPropertyName: keyPropName,
        onMutationsChanged: forceUpdate
    }), []);
    const mutatorRef = useRef(mutator);

    return mutatorRef;
};