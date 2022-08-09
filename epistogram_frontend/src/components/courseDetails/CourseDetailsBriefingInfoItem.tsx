import { Flex, FlexProps } from '@chakra-ui/react';
import React, { ReactNode } from 'react';
import { isString } from '../../static/frontendHelpers';
import { EpistoFont } from '../controls/EpistoFont';

export const CourseDetailsBriefingInfoItem = (props: {
    icon?: string | ReactNode,
    title: string,
    subTitle?: string
} & FlexProps) => {

    const { title, icon, subTitle, ...css } = props;

    return <Flex
        direction={'row'}
        minWidth={200}
        flex='1'
        height={60}
        background="var(--transparentWhite70)"
        backdropFilter="blur(7px)"
        borderWidth={1}
        borderRadius={5}
        shadow={'#00000024 0px 0px 3px 0px'}
        {...css}>

        <Flex
            width={60}
            align={'center'}
            justify={'center'}>

            {/* compontnt icon */}
            {!isString(icon) && icon}

            {/* icon path */}
            {isString(icon) && <img
                src={icon as any}
                alt={''}
                className="square50" />}
        </Flex>

        <Flex
            ml={5}
            width={135}
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
        </Flex>
    </Flex>;
};
