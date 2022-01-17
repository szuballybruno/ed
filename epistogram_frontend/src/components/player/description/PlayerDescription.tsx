import { Flex } from "@chakra-ui/react";
import React from 'react';

const PlayerDescription = (props: { description: string }) => {

    return (
        <Flex width="100%" minH={600} py={20}>
            {props.description}
        </Flex>
    )
};

export default PlayerDescription
