import { MutableRefObject, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useForceUpdate } from '../../../static/frontendHelpers';
import { IXMutator, IXMutatorFunctions, IXMutatorState, StringKeyof, XMutatorCore } from './XMutatorCore';

export const useXMutator = <
    TMutatee extends Object,
    TKeyField extends StringKeyof<TMutatee>>(
        dto: { new(): TMutatee },
        keyPropName: TKeyField): MutableRefObject<IXMutator<TMutatee, TKeyField, TMutatee[TKeyField]>> => {

    const forceUpdate = useForceUpdate();

    const mutator = useMemo(() => new XMutatorCore<TMutatee, TKeyField, TMutatee[TKeyField]>({
        keyPropertyName: keyPropName,
        onMutationsChanged: forceUpdate
    }), [keyPropName, forceUpdate]);

    const mutatorRef = useRef(mutator);

    return mutatorRef;
};

export const useXMutatorNew = <
    TMutatee extends Object,
    TKeyField extends StringKeyof<TMutatee>>(
        dto: { new(): TMutatee },
        keyPropName: TKeyField,
        mutatorId: string): [
        IXMutatorState<TMutatee, TKeyField, TMutatee[TKeyField]>,
        IXMutatorFunctions<TMutatee, TKeyField, TMutatee[TKeyField]>
    ] => {

    const mutatorCore: IXMutator<TMutatee, TKeyField, TMutatee[TKeyField]> = useMemo(() => {
        return new XMutatorCore<TMutatee, TKeyField, TMutatee[TKeyField]>({
            keyPropertyName: keyPropName,
            mutatorId
        });
    }, [keyPropName, mutatorId]);

    const [state, setState] = useState<IXMutatorState<TMutatee, TKeyField, TMutatee[TKeyField]>>(mutatorCore);

    /**
     * Create a new reference of mutator 
     * (when there's a mutation change)
     */
    const createNewMutatorInstance = useCallback(() => {

        const stateInstance: IXMutatorState<TMutatee, TKeyField, TMutatee[TKeyField]> = {
            mutatedItems: mutatorCore.mutatedItems,
            mutations: mutatorCore.mutations
        };

        setState(stateInstance);
    }, [setState, mutatorCore]);


    /**
     * Attach change listener
     */
    useEffect(() => {

        mutatorCore
            .setOnMutationsChanged(createNewMutatorInstance);
    }, [mutatorCore, createNewMutatorInstance]);

    return [state, mutatorCore];
};