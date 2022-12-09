import { ReactNode } from 'react';
import { EpistoDivider } from './controls/EpistoDivider';
import { EpistoFlex2, EpistoFlex2Props } from './controls/EpistoFlex';
import { EpistoFont } from './controls/EpistoFont';

export const EpistoHeader = ({
    text,
    showDivider,
    type,
    variant,
    children,
    textHeight,
    ...css
}: {
    text: string,
    variant?: 'main' | 'sub' | 'strongSub' | 'giant' | 'xxl',
    type?: 'strong' | 'normal',
    showDivider?: boolean,
    children?: ReactNode,
    textHeight?: string
} & EpistoFlex2Props) => {

    return <EpistoFlex2
        id={EpistoHeader.name}
        direction='column'
        {...css}>

        <EpistoFlex2
            align='center'
            justify='space-between'
            height={textHeight ?? '25px'}>

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
