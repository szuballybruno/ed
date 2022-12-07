import { ReactNode } from 'react';
import { EpistoFlex2, EpistoFlex2Props } from '../../controls/EpistoFlex';
import { EpistoFont } from '../../controls/EpistoFont';

export const EditSection = (props: {
    title: string,
    children: ReactNode,
    hidden?: boolean,
    rightSideComponent?: ReactNode
} & EpistoFlex2Props) => {

    const { children, title, rightSideComponent, ...css } = props;

    return <EpistoFlex2
        direction="column"
        padding="20px"
        mb="10px"
        bg="white"
        {...css}>

        <EpistoFlex2
            align="flex-start"
            justify="space-between">

            <EpistoFont
                style={{
                    fontWeight: 600,
                    fontSize: '1.2rem'
                }}>

                {title}
            </EpistoFont>

            {rightSideComponent}
        </EpistoFlex2>

        {children}
    </EpistoFlex2>;
};
