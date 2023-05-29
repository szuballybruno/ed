import { Check } from '@mui/icons-material';
import { PagingType } from '../../static/frontendHelpers';
import { EpistoFlex2 } from '../controls/EpistoFlex';
import { EpistoFont } from '../controls/EpistoFont';

export type StepperParamsType<T> = {
    logic: PagingType<T>,
    getIsCompleted: (item: T) => boolean
};

export const EpistoStepper = <T,>({
    logic,
    getIsCompleted
}: StepperParamsType<T>) => {

    const { currentIndex } = logic;

    return <EpistoFlex2>
        {logic
            .items
            .map((item, index) => {

                const isCurrent = index === logic.currentIndex;
                const isCompleted = getIsCompleted(item);
                const isSkipped = index < currentIndex && !isCompleted;

                return <EpistoFlex2
                    align='center'
                    key={index}>

                    {/* stepper dot */}
                    <EpistoFlex2
                        onClick={() => logic.setItem(index)}
                        align='center'
                        justify='center'
                        className='square20 circle'
                        background={(isCurrent || isCompleted)
                            ? 'var(--eduptiveYellowGreen)'
                            : isSkipped
                                ? 'var(--deepOrange)'
                                : 'lightgrey'}>

                        {!isCompleted && <EpistoFont>
                            {index + 1}
                        </EpistoFont>}

                        {isCompleted && <Check />}
                    </EpistoFlex2>

                    {/* divider */}
                    {logic.items.length > index + 1 && <EpistoFlex2
                        px='5px'
                        mx='5px'
                        py='1px'
                        background='lightgrey' />}
                </EpistoFlex2>;
            })}
    </EpistoFlex2>;
};
