import { ReactNode } from 'react';
import { EpistoDivider } from './controls/EpistoDivider';
import { EpistoFlex2, EpistoFlex2Props } from './controls/EpistoFlex';
import { EpistoFont } from './controls/EpistoFont';

export const EpistoHeader = (props: {
    text: string,
    variant?: 'main' | 'sub' | 'strongSub' | 'giant' | 'xxl',
    type?: 'strong' | 'normal',
    showDivider?: boolean,
    children?: ReactNode,
    textHeight?: string
} & EpistoFlex2Props) => {

    const { text, showDivider, type, variant, children, textHeight, ...css } = props;

    const h = (() => {

        if (variant === 'main')
            return 'h5';

        if (variant === 'giant' || variant === 'xxl')
            return 'h1';

        return 'h6';
    })();

    return <EpistoFlex2
        id='epistoHeaderRoot'
        direction='column'
        {...css}>

        <EpistoFlex2
            align='center'
            justify='space-between'
            h={textHeight ?? '25px'}>

            <EpistoFont
                fontSize={variant === 'giant'
                    ? 'fontGiant'
                    : variant === 'xxl'
                        ? 'fontXXL'
                        : 'fontLarge'}
                style={{
                    fontWeight: type === 'strong' ? 600 : 'normal',
                    color: variant === 'sub' ? 'black' : undefined
                }}>

                {text}
            </EpistoFont>

            {children}
        </EpistoFlex2>

        {!!showDivider && <EpistoDivider
            style={{
                background: 'var(--transparentWhite70)',
                marginTop: '10px'
            }} />}
    </EpistoFlex2>;
};
