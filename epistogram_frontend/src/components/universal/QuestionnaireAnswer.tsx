import { Box, BoxProps } from '@chakra-ui/react';
import React, { ReactNode } from 'react';
import { EpistoButton } from '../controls/EpistoButton';

export const QuestionnaierAnswer = (props: {
    children: ReactNode,
    onClick: () => void,
    isSelected: boolean,
    isIncorrect: boolean,
    isCorrect: boolean
} & BoxProps) => {

    const { children, onClick, isSelected, isIncorrect, isCorrect, ...css } = props;

    const colors = (() => {

        if (isIncorrect)
            return { bg: '#fa6767', fg: 'black' };

        if (isCorrect && isSelected)
            return { bg: '#7cf25e', fg: 'black' };

        if (isCorrect)
            return { bg: 'transparent', fg: 'black', border: '#7cf25e' };

        if (isSelected)
            return { bg: 'var(--deepBlue)', fg: 'white' };

        return { bg: 'white', fg: 'black' };
    })();

    return <Box {...css}>
        <EpistoButton
            className="whall tinyShadow"
            variant="outlined"
            onClick={() => onClick()}
            style={{
                background: colors.bg,
                color: colors.fg,
                border: colors.border ? `2px solid ${colors.border}` : undefined
            }}>
            {children}
        </EpistoButton>
    </Box>;
};
