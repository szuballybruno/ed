import { Flex } from '@chakra-ui/react';

export const VideoListSausageIndicator = (props: {
    color: string
}) => {

    const { color: sausageColor } = props;

    return <Flex
        alignSelf="stretch"
        className="roundBorders"
        boxShadow="inset -1px -1px 2px 1px rgba(0,0,0,0.10)"
        p="3px"
        m="7px 10px 7px 0px"
        bgColor={sausageColor} />;
};