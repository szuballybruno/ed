import { Flex } from '@chakra-ui/react';
import { PropsWithChildren } from '../../static/frontendHelpers';

export const ForceNoOverflowY = (props: PropsWithChildren & {
    disabled?: boolean
}) => {

    return (<>
        {props.disabled
            ? props.children
            : <Flex
                id={ForceNoOverflowY.name}
                flex="1"
                width="100%"
                position="relative">

                <Flex
                    position='absolute'
                    className="whall"
                    overflow="scroll">

                    {props.children}
                </Flex>
            </Flex>}
    </>);
};