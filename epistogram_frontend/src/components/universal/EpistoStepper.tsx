import { Flex } from '@chakra-ui/react';
import { Check } from '@mui/icons-material';
import { Id } from '../../shared/types/versionId';
import { EpistoFont } from '../controls/EpistoFont';

export type StepperLogicType<T extends string> = {
    ids: Id<T>[]
    currentId: Id<T>
    completedIds: Id<T>[] | null
    skippedIds: Id<T>[] | null
}

export interface EpistoStepperProps<T extends string> {

    stepperLogic: StepperLogicType<T>
}

export const EpistoStepper = <T extends string>(props: EpistoStepperProps<T>) => {

    const {
        ids,
        currentId,
        completedIds,
        skippedIds
    } = props.stepperLogic;

    const getCurrentIndex = () => {

        return ids
            .findIndex(x => x === currentId) || 0;

    };

    const currentIndex = getCurrentIndex();
    const idsCount = ids.length - 1;

    const getIsSkipped = (id: Id<any>) => {

        if (!skippedIds)
            return false;

        return skippedIds
            .any(id);
    };

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
                const isSkipped = getIsSkipped(id);
                ;
                return <Flex
                    align='center'
                    key={Id.read(id)}>

                    {/* stepper dot */}
                    <Flex
                        align='center'
                        justify='center'
                        className='square20 circle'
                        background={(isCurrent || isCompleted)
                            ? 'var(--epistoTeal)'
                            : isSkipped
                                ? 'var(--deepOrange)'
                                : 'lightgrey'}>

                        {!isCompleted && <EpistoFont fontSize2='normal'>
                            {index}
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