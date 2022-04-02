import { EpistoFont } from '../../controls/EpistoFont';

export const ChipSmall = (props: {
    text: string,
    tooltip?: string,
    color?: string,
    style?: React.CSSProperties
}) => {

    const { text, color, style, tooltip } = props;

    return (
        <EpistoFont
            classes={['roundBorders']}
            fontSize="fontSmall"
            tooltip={tooltip}
            style={{
                border: '1px solid var(--deepBlue)',
                color: color ?? 'var(--deepBlue)',
                padding: '0 5px',
                margin: '0 2px',
                fontWeight: 700,
                ...style
            }}>

            {text}
        </EpistoFont>
    );
};