import { FlexProps } from '@chakra-ui/react';
import { ReactNode } from 'react';
import { EpistoFlex2 } from '../../controls/EpistoFlex';
import { EpistoFont } from '../../controls/EpistoFont';

export const EditSection = (props: {
    title: string,
    children: ReactNode,
    isFirst?: boolean,
    rightSideComponent?: ReactNode
} & FlexProps) => {

    const { children, title, isFirst, rightSideComponent, ...css } = props;

    return <EpistoFlex2
        direction="column"
        p="20px"
        mt="10px"
        {...css}>

        <EpistoFlex2 align="flex-start"
justify="space-between">

            <EpistoFont
                fontSize={'fontHuge'}
                style={{
                    marginTop: isFirst ? 10 : 50,
                    fontWeight: 600
                }}>

                {title}
            </EpistoFont>

            {rightSideComponent}
        </EpistoFlex2>

        {/* <EpistoHeader
            text={title}
            showDivider
            variant="strongSub"
            m="5px 10px 0px 0" /> */}

        {children}
    </EpistoFlex2>;
};
