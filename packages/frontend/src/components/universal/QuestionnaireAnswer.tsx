import { ReactNode } from 'react';
import { EpistoButton } from '../controls/EpistoButton';
import { EpistoDiv, EpistoDivProps } from '../controls/EpistoDiv';

export const QuestionnaierAnswer = ({
    children,
    onClick,
    isSelected,
    isIncorrect,
    isCorrect,
    disabled,
    ...css
}: {
    children: ReactNode,
    onClick: () => void,
    isSelected: boolean,
    isIncorrect: boolean,
    isCorrect: boolean,
    disabled?: boolean
} & EpistoDivProps) => {

    const colors = (() => {

        if (isIncorrect)
            return { bg: '#fa6767', fg: 'black' };

        if (isCorrect && isSelected)
            return { bg: '#7cf25e', fg: 'black' };

        if (isCorrect)
            return { bg: '#FFFFFF', fg: 'black', border: '#7cf25e' };

        if (isSelected)
            return { bg: 'var(--eduptiveDeepDarkGreen)', fg: 'white' };

        return { bg: 'white', fg: 'black' };
    })();

    return <EpistoDiv {...css}>
        <EpistoButton
            className="whall tinyShadow"
            variant="plain"
            onClick={() => onClick()}
            style={{
                pointerEvents: disabled ? 'none' : 'all',
                background: colors.bg,
                color: colors.fg,
                border: colors.border ? `4px solid ${colors.border}` : undefined,
            }}>
            {children}
        </EpistoButton>
    </EpistoDiv>;
};
