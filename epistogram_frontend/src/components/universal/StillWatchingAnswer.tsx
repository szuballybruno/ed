import React, { ReactNode } from 'react';
import { EpistoDiv, EpistoDivProps } from '../controls/EpistoDiv';

export const StillWatchingAnswer = (props: {
    children: ReactNode,
    onClick: () => void,
    isIncorrect: boolean,
    isCorrect: boolean
} & EpistoDivProps) => {

    const { children, onClick, isIncorrect, isCorrect, ...css } = props;

    return <EpistoDiv {...css}>
        <div
            onClick={() => onClick()}>
            {children}
        </div>
    </EpistoDiv>;
};
