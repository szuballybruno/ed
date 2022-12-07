import { ReactNode } from 'react';
import { EpistoFlex2, EpistoFlex2Props } from '../../controls/EpistoFlex';
import { EpistoFont } from '../../controls/EpistoFont';
import { EpistoHeader } from '../../EpistoHeader';

export const AdminStatGroup = ({
    title,
    children,
    headerContent,
    ...css
}: {
    title?: string,
    children?: ReactNode,
    headerContent?: ReactNode,
} & EpistoFlex2Props) => {

    return <EpistoFlex2
        minWidth="500px"
        minHeight="400px"
        margin="5px"
        direction="column"
        flex="1"
        className="roundBorders"
        background="var(--transparentWhite70)"
        padding="20px"
        {...css}>

        {title && <EpistoFlex2
            marginTop="10px"
            padding="0px 20px 0px 20px"
            align="center"
            height="40px"
            justify="space-between">

            <EpistoHeader
                text={title} />

            {headerContent}
        </EpistoFlex2>}

        {children}
    </EpistoFlex2>;
};