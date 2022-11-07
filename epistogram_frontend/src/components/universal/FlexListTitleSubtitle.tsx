import { ReactNode } from 'react';
import { isString } from '../../static/frontendHelpers';
import { EpistoFlex2 } from '../controls/EpistoFlex';
import { EpistoFont } from '../controls/EpistoFont';

export const FlexListTitleSubtitle = ({ title, subTitle, isSelected }: {
    isSelected?: boolean,
    title: string,
    subTitle: string | ReactNode
}) => {

    return <EpistoFlex2 direction="column">

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
    </EpistoFlex2 >;
};
