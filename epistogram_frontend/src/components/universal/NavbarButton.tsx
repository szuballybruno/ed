import { Flex, FlexProps } from '@chakra-ui/react';
import React from 'react';
import { useNavigation } from '../../services/core/navigatior';
import { EpistoButton } from '../controls/EpistoButton';

const NavbarButton = (props: {
    menuName?: string,
    menuPath: string
} & FlexProps) => {

    const { menuPath, menuName, children, ...css } = props;
    const { navigate } = useNavigation();

    return <Flex margin="0 5px 0 5px"
{...css}>
        {children
            ? children
            : <EpistoButton
                onClick={() => navigate(menuPath)}
                style={{ flex: '1' }}
                variant="plain" >

                {menuName}
            </EpistoButton>}
    </Flex>;
};

export default NavbarButton;
