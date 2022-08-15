import { Flex } from '@chakra-ui/react';
import { Check } from '@mui/icons-material';
import { Id } from '../../shared/types/versionId';
import { EpistoFont } from '../controls/EpistoFont';

export type StepperLogicType<T extends string> = {
    ids: Id<T>[]
    currentId: Id<T>
    completedIds: Id<T>[] | null
    selectCurrentHandler: (id: Id<T>) => void
}

export interface EpistoStepperProps<T extends string> {

    stepperLogic: StepperLogicType<T>
}

export const EpistoStepper = <T extends string>(props: EpistoStepperProps<T>) => {

    const {
        ids,
        currentId,
        completedIds,
        selectCurrentHandler
    } = props.stepperLogic;

    const getCurrentIndex = () => {

        return ids
            .findIndex(x => x === currentId) || 0;

    };

    const currentIndex = getCurrentIndex();
    const idsCount = ids.length - 1;

    const getIsCompleted = (id: Id<any>) => {

        if (!completedIds)
            return false;

        return completedIds
            .any(id);
    };

    return <Flex>

        {ids
            .map((id, index) => {

                const isCurrent = currentIndex === index;
                const isCompleted = getIsCompleted(id);
                const isSkipped = index < currentIndex && !isCompleted;

                return <Flex
                    align='center'
                    key={Id.read(id)}>

                    {/* stepper dot */}
                    <Flex
                        onClick={() => selectCurrentHandler(id)}
                        align='center'
                        justify='center'
                        className='square20 circle'
                        background={(isCurrent || isCompleted)
                            ? 'var(--epistoTeal)'
                            : isSkipped
                                ? 'var(--deepOrange)'
                                : 'lightgrey'}>

                        {!isCompleted && <EpistoFont fontSize2='normal'>
                            {index + 1}
                        </EpistoFont>}

                        {isCompleted && <Check />}
                    </Flex>

                    {/* divider */}
                    {idsCount !== index && <Flex
                        px='5px'
                        mx='5px'
                        py='1px'
                        background='lightgrey' />}
                </Flex>;
            })}
    </Flex>;
};
