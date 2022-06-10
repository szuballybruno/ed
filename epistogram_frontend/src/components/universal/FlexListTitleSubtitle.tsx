import { Flex } from '@chakra-ui/layout';
import { ReactNode } from 'react';
import { isString } from '../../static/frontendHelpers';
import { EpistoFont } from '../controls/EpistoFont';

export const FlexListTitleSubtitle = ({ title, subTitle, isSelected }: {
    isSelected?: boolean,
    title: string,
    subTitle: string | ReactNode
}) => {

    return <Flex direction="column">

        <EpistoFont
            fontSize2='normal'
            isUppercase
            fontWeight={isSelected ? 'heavy' : undefined}>

            {title}
        </EpistoFont>

        {isString(subTitle)
            ? <EpistoFont
                fontWeight={isSelected ? 'heavy' : undefined}
                fontSize2='small'>

                {subTitle}
            </EpistoFont>
            : subTitle}
    </Flex >;
};
