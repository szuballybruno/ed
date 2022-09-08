import { Check } from '@mui/icons-material';
import { Id } from '../../shared/types/versionId';
import { EpistoFlex2 } from '../controls/EpistoFlex';
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

    return <EpistoFlex2>

        {ids
            .map((id, index) => {

                const isCurrent = currentIndex === index;
                const isCompleted = getIsCompleted(id);
                const isSkipped = index < currentIndex && !isCompleted;

                return <EpistoFlex2
                    align='center'
                    key={Id.read(id)}>

                    {/* stepper dot */}
                    <EpistoFlex2
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
                    </EpistoFlex2>

                    {/* divider */}
                    {idsCount !== index && <EpistoFlex2
                        px='5px'
                        mx='5px'
                        py='1px'
                        background='lightgrey' />}
                </EpistoFlex2>;
            })}
    </EpistoFlex2>;
};
