import { EpistoFlex2, EpistoFlex2Props } from './EpistoFlex';
import { EpistoFont } from './EpistoFont';

export const EpistoLabel = ({
    text,
    isOverline,
    children,
    ...css
}: {
    text: string
    isOverline?: boolean
} & EpistoFlex2Props) => {

    return <EpistoFlex2
        mt="10px"
        direction="column"
        {...css}>

        <EpistoFont
            isUppercase={isOverline}
            fontSize={isOverline ? 'fontSmall' : undefined}
            style={{
                marginBottom: '3px',
                marginTop: isOverline ? '10px' : undefined,
                letterSpacing: isOverline ? '1.2px' : undefined,
            }}>

            {text}
        </EpistoFont>

        {children}
    </EpistoFlex2>;
};