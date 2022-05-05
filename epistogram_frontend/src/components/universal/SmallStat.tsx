import { Flex } from '@chakra-ui/react';
import { EpistoFont } from '../controls/EpistoFont';

export const SmallStat = (props: { title?: string, iconUrl: string, text: string }) => {

    return <Flex
        align="center"
        title={props.title}
        mr={5}>

        {/* icon */}
        <img
            src={props.iconUrl}
            alt={''}
            style={{
                width: 15,
                height: 15,
                margin: '0 2px 0 2px'
            }} />

        {/* spent time stat */}
        <EpistoFont
            style={{
                color: 'grey'
            }}>

            {props.text}
        </EpistoFont>
    </Flex>;
};