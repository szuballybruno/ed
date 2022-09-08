import { FlexProps } from '@chakra-ui/layout';
import { Checkbox } from '@mui/material';
import { ForwardedRef, forwardRef, ReactNode } from 'react';
import { EpistoFlex2 } from '../controls/EpistoFlex';

export const FlexListItem = forwardRef((props: FlexProps & {
    onClick?: () => void,
    isLocked?: boolean,
    thumbnailContent?: ReactNode,
    endContent?: ReactNode,
    midContent?: ReactNode,
    isChecked?: boolean,
    setIsChecked?: (isChecked: boolean) => void
}, ref: ForwardedRef<HTMLDivElement>) => {

    const {
        onClick,
        isLocked,
        thumbnailContent,
        endContent,
        midContent,
        isChecked,
        setIsChecked,
        ...css } = props;

    return <EpistoFlex2
        ref={ref}
        id="flexListItem"
        //className="shadowOnHover"
        cursor={onClick ? 'pointer' : undefined}
        align="center"
        pointerEvents={isLocked ? 'none' : 'all'}
        color="#3F3F3F"
        padding="5px"
        onClick={onClick}
        {...css}>

        {setIsChecked && <EpistoFlex2
            alignItems={'center'}
            justifyContent={'center'}>

            <Checkbox
                checked={isChecked}
                onChange={x => setIsChecked(x.currentTarget.checked)}
                style={{ alignSelf: 'center' }} />
        </EpistoFlex2>}

        {thumbnailContent && <EpistoFlex2
            alignItems={'center'}
            justifyContent={'center'}>

            {thumbnailContent}
        </EpistoFlex2>}

        <EpistoFlex2
            flex="1"
            px="10px"
            alignItems={'center'}
            justifyContent={'flex-start'}>

            {midContent}
        </EpistoFlex2>

        {endContent}
    </EpistoFlex2>;
});
