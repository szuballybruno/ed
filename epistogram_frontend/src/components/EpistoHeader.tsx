import { Flex, FlexProps } from '@chakra-ui/layout';
import { Divider, Typography } from '@mui/material';
import { EpistoFont } from './controls/EpistoFont';

export const EpistoHeader = (props: {
    text: string,
    variant?: 'main' | 'sub' | 'strongSub' | 'giant' | 'xxl',
    type?: 'strong' | 'normal',
    showDivider?: boolean
} & FlexProps) => {

    const { text, showDivider, type, variant, ...css } = props;

    const h = (() => {

        if (variant === 'main')
            return 'h5';

        if (variant === 'giant' || variant === 'xxl')
            return 'h1';

        return 'h6';
    })();

    return <Flex id="epistoHeaderRoot"
direction="column"
{...css}>

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

        {!!showDivider && <Divider style={{ background: 'var(--transparentWhite70)', marginTop: '10px' }} />}
    </Flex>;
};