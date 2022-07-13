import { Flex, Text } from '@chakra-ui/react';
import React, { CSSProperties, ReactNode } from 'react';
import { EpistoFont } from '../controls/EpistoFont';

export const ExamLayoutContent = (props: {
    children: ReactNode,
    title: string,
    style?: CSSProperties
}) => {

    const { children, title, style } = props;

    return (
        <Flex
            id="examLayoutContentRoot"
            className='roundBorders mildShadow'
            direction={'column'}
            alignItems={'center'}
            justifyContent={'center'}
            width={'100%'}
            background='var(--transparentWhite70)'
            flex={1}
            style={style}>

            <Flex direction='column'>

                {/* header */}
                <Flex
                    id="examLayoutContentHeader"
                    p='20px 0 40px 0'
                    minW='400px'
                    align="center">

                    <img
                        style={{
                            borderRadius: '50%',
                            padding: '8px',
                            width: '50px',
                            height: '50px',
                            marginRight: '30px',
                            marginLeft: '-5px'
                        }}
                        alt=""
                        src="https://static.thenounproject.com/png/92068-200.png"
                        className="mildShadow" />

                    <EpistoFont fontWeight='heavy'>
                        {title}
                    </EpistoFont>
                </Flex>

                {/* answers */}
                <Flex
                    id="examLayoutContentContainer"
                    direction={'row'}
                    minW='500px'
                    justifyContent={'center'}
                    pt={10}>

                    {children}
                </Flex>
            </Flex>

        </Flex>
    );
};