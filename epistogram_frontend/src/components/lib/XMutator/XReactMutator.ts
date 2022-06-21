import { useRef } from 'react';
import { XMutatorCore } from './XMutatorCore';

// export const useXReactMutator = (optios: {
//     originalItems: TMutatee[],
//     keyPropertyName: TKeyField,
//     mutationEndCallback: (opts: { newMutatedItems: TMutatee[] }) => void,
//     onMutatedItems: () => void
// }) => {

//     const mutatorRef = useRef(new XMutatorCore());

//     return {
//         mutate,
//         add,
//         remove,
//         isMutated,
//         resetMutations,
//         addOnMutationHandlers,
//         mutations: mutRef.current,
//         isAnyMutated: mutRef.current.length > 0,
//         mutatedData: mutatedItems
//     };
// };
