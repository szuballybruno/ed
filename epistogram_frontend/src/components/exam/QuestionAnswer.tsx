import {Checkbox} from '@mui/material';
import {EpistoFlex2Props} from '../controls/EpistoFlex';
import {EpistoFont} from '../controls/EpistoFont';
import {FlexFloat} from '../controls/FlexFloat';

export const QuestionAnswer = (props: {
    onClick?: (selected: boolean) => void,
    isSelected: boolean,
    answerText: string,
    minWidth?: number,
    isCorrect?: boolean
} & EpistoFlex2Props) => {

    const { onClick, isSelected, isCorrect, answerText, minWidth, ...css } = props;

    const getBgColor = () => {

        if (isCorrect)
            return 'var(--mildGreen)';

        if (isSelected && isCorrect === undefined)
            return 'rgba(124,192,194,0.34)';

        if (isSelected)
            return 'var(--mildRed)';

        return undefined;
    };

    return <FlexFloat
        alignItems={'center'}
        borderRadius='7px'
        minWidth={minWidth || 150}
        cursor={onClick ? 'pointer' : undefined}
        onClick={onClick ? () => onClick(!isSelected) : undefined}
        style={{
            backgroundColor: getBgColor(),
            padding: '10px',
            border: '1px solid var(--mildGrey)'
        }}
        {...css}>

        <Checkbox
            checked={isSelected}
            size="small"
            value="advanced" />

        <EpistoFont fontSize="fontNormal14">
            {answerText}
        </EpistoFont>
    </FlexFloat>;
};
