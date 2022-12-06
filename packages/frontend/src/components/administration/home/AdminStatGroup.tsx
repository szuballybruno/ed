import { ReactNode } from 'react';
import { EpistoFlex2, EpistoFlex2Props } from '../../controls/EpistoFlex';
import { EpistoFont } from '../../controls/EpistoFont';

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
            h="40px"
            w="100%"
            align="center"
            justify="space-between">

            <EpistoFont>
                {title}
            </EpistoFont>

            {headerContent}
        </EpistoFlex2>}

        {children}
    </EpistoFlex2>;
};