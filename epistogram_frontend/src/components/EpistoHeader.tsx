import { FlexProps} from '@chakra-ui/layout';
import {Divider} from '@mui/material';
import {EpistoFont} from './controls/EpistoFont';
import {ReactNode} from 'react';
import { EpistoFlex2 } from './controls/EpistoFlex';

export const EpistoHeader = (props: {
    text: string,
    variant?: 'main' | 'sub' | 'strongSub' | 'giant' | 'xxl',
    type?: 'strong' | 'normal',
    showDivider?: boolean,
    children?: ReactNode
} & FlexProps) => {

    const {text, showDivider, type, variant, children, ...css} = props;

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
            h='25px'>

            <EpistoFont
                fontSize={variant === 'giant'
                    ? 'fontGiant'
                    : variant === 'xxl'
                        ? 'fontXXL'
                        : 'fontLarge'}
                style={{
                    fontWeight: type === 'strong' ? 500 : 'normal',
                    color: variant === 'sub' ? 'black' : undefined
                }}>

                {text}
            </EpistoFont>

            {children}
        </EpistoFlex2>

        {!!showDivider && <Divider style={{background: 'var(--transparentWhite70)', marginTop: '10px'}}/>}
    </EpistoFlex2>;
};
