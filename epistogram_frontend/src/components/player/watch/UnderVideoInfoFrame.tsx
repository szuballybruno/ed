import { Flex } from '@chakra-ui/react';
import { PagingType } from '../../../static/frontendHelpers';
import { EpistoFont } from '../../controls/EpistoFont';
import { SegmentedButton } from '../../controls/SegmentedButton';

export const UnderVideoInfoFrame = (props: {
    children: React.ReactNode
    title: string
    paging: PagingType<string>
}) => {

    const {
        children,
        title,
        paging
    } = props;

    return <Flex
        flex='1'
        direction={'column'}
        pb="100px">

        <Flex
            height='50px'
            mt='50px'
            mb='10px'
            align='center'
            justify='space-between'>

            <EpistoFont
                style={{
                    fontWeight: '500'
                }}
                fontSize={'fontHuge'}>

                {title}
            </EpistoFont>

            <SegmentedButton
                paging={paging} />
        </Flex>

        {children}
    </Flex>;
};