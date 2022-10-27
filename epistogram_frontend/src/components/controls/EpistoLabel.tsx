import { EpistoFlex2, EpistoFlex2Props } from './EpistoFlex';
import { EpistoFont } from './EpistoFont';

export const EpistoLabel = (props: {
    text: string
    isOverline?: boolean
} & EpistoFlex2Props) => {

    const { text, isOverline, ...css } = props;

    return <EpistoFlex2
        mt="10px"
        direction="column"
        {...css}>

        <EpistoFont
            isUppercase={isOverline}
            fontSize={isOverline ? 'fontExtraSmall' : undefined}
            style={{
                marginTop: isOverline ? '10px' : undefined,
                letterSpacing: isOverline ? '1.2px' : undefined,
            }}>

            {text}
        </EpistoFont>

        {props.children}
    </EpistoFlex2>;
};