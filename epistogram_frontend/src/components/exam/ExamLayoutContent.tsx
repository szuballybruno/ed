import { Flex } from '@chakra-ui/react';
import React, { CSSProperties, ReactNode } from 'react';
import { EpistoFont } from '../controls/EpistoFont';
import {Environment} from '../../static/Environemnt';

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

            <Flex
                p='200px'
                direction='column'>

                {/* header */}
                <Flex
                    id="examLayoutContentHeader"
                    p='20px 0 40px 0'
                    minW='400px'
                    align="center">

                    <img
                        style={{
                            padding: '8px',
                            width: '70px',
                            height: '70px',
                            objectFit: 'contain',
                            marginRight: '30px',
                            marginLeft: '-5px'
                        }}
                        alt=""
                        src={Environment.getAssetUrl('/images/rightanswer3D.png')} />

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
