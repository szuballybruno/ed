import { EpistoDiv, EpistoDivProps } from '../controls/EpistoDiv';

export const FlexImage = (props: EpistoDivProps & { url: string, fit?: 'cover' | 'contain' }) => {

    const { url, fit, ...boxProps } = props;

    return <EpistoDiv position="relative"
        {...boxProps}>
        <EpistoDiv position="absolute"
            top="0"
            height="100%"
            width="100%">
            <img style={{ width: '100%', height: '100%', objectFit: fit ? fit : 'contain' }}
                src={url}
                alt="" />
        </EpistoDiv>
    </EpistoDiv>;
};