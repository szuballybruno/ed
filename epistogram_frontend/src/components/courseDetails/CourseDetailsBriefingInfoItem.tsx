import React, {ReactNode} from 'react';
import {isString} from '../../static/frontendHelpers';
import {EpistoFlex2, EpistoFlex2Props} from '../controls/EpistoFlex';
import {EpistoFont} from '../controls/EpistoFont';

export const CourseDetailsBriefingInfoItem = (props: {
    icon?: string | ReactNode,
    title: string,
    subTitle?: string
} & EpistoFlex2Props) => {

    const { title, icon, subTitle, ...css } = props;

    return <EpistoFlex2
        direction={'row'}
        minWidth='200px'
        flex='1'
        height='60px'
        background="var(--transparentWhite70)"
        backdropFilter="blur(7px)"
        borderWidth='1px'
        borderRadius='5px'
        shadow={'#00000024 0px 0px 3px 0px'}
        {...css}>

        <EpistoFlex2
            width='60px'
            align={'center'}
            justify={'center'}>

            {/* compontnt icon */}
            {!isString(icon) && icon}

            {/* icon path */}
            {isString(icon) && <img
                src={icon as any}
                alt={''}
                className="square50" />}
        </EpistoFlex2>

        <EpistoFlex2
            ml='5px'
            width='135px'
            direction={'column'}
            justify={'center'}
            align={'flex-start'}>

            <EpistoFont
                fontSize={'fontExtraSmall'}
                style={{
                    fontWeight: 'bold'
                }}>

                {title}
            </EpistoFont>

            <EpistoFont
                fontSize={'fontExtraSmall'}>

                {subTitle}
            </EpistoFont>
        </EpistoFlex2>
    </EpistoFlex2>;
};
