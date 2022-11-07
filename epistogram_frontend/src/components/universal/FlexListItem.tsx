import { Checkbox } from '@mui/material';
import { forwardRef, ReactNode } from 'react';
import { EpistoFlex2, EpistoFlex2Props } from '../controls/EpistoFlex';

type FlexListItemProps = EpistoFlex2Props & {
    onClick?: () => void,
    isLocked?: boolean,
    thumbnailContent?: ReactNode,
    endContent?: ReactNode,
    midContent?: ReactNode,
    isChecked?: boolean,
    setIsChecked?: (isChecked: boolean) => void
};

export const FlexListItem = forwardRef<HTMLDivElement, FlexListItemProps>((props, ref) => {

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
