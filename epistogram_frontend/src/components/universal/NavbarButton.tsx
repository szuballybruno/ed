import { Flex, FlexProps } from '@chakra-ui/react';
import React from 'react';
import { useNavigation } from '../../services/core/navigatior';
import { EpistoButton } from '../controls/EpistoButton';

export const NavbarButton = (props: {
    menuName?: string,
    onClick: () => void
} & FlexProps) => {

    const { onClick, menuName, children, ...css } = props;
    const { navigate } = useNavigation();

    return <Flex
        margin="0 5px 0 5px"
        {...css}>
        
        {children
            ? children
            : <EpistoButton
                onClick={() => onClick()}
                style={{ flex: '1' }}
                variant="plain" >

                {menuName}
            </EpistoButton>}
    </Flex>;
};
