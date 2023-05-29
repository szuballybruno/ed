import { ReactNode } from 'react';
import { EpistoFlex2, EpistoFlex2Props } from '../../controls/EpistoFlex';
import { EpistoHeader } from '../../EpistoHeader';
import { PreviewOverlay } from '../../universal/PreviewOverlay';

export const AdminStatGroup = ({
    title,
    children,
    headerContent,
    isPreview,
    ...css
}: {
    title?: string,
    children?: ReactNode,
    headerContent?: ReactNode,
    isPreview?: boolean
} & EpistoFlex2Props) => {

    return <EpistoFlex2
        minWidth="500px"
        minHeight="400px"
        margin="5px"
        direction="column"
        flex="1"
        className="roundBorders"
        background="var(--transparentWhite50)"
        padding="20px"
        position="relative"
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

        {isPreview && <PreviewOverlay />}

    </EpistoFlex2>;
};