import { Flex } from '@chakra-ui/layout';
import { ArrowForward, ArrowForwardRounded, Circle } from '@mui/icons-material';
import { Typography } from '@mui/material';
import { ReactNode } from 'react';
import { isString } from '../../static/frontendHelpers';
import { EpistoFont } from '../controls/EpistoFont';

export const FlexListTitleSubtitle = (props: {
    isSelected?: boolean,
    title: string,
    subTitle: string | ReactNode
}) => {

    return <Flex direction="column">

        <EpistoFont
            fontSize="fontNormal14"
            isUppercase
            style={{
                fontWeight: props.isSelected ? 700 : 500,
            }}>

            {props.title}
        </EpistoFont>

        {isString(props.subTitle)
            ? <EpistoFont
                style={{
                    fontWeight: props.isSelected ? 600 : undefined,
                }}
                fontSize={'fontExtraSmall'}>

                {props.subTitle}
            </EpistoFont>
            : props.subTitle}
    </Flex>;
};
