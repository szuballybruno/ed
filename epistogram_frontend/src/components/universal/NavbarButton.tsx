import { FlexProps } from '@chakra-ui/react';
import { EpistoButton } from '../controls/EpistoButton';
import { EpistoFlex2 } from '../controls/EpistoFlex';

export const NavbarButton = (props: {
    menuName?: string,
    onClick: () => void
} & FlexProps) => {

    const { onClick, menuName, children, ...css } = props;

    return <EpistoFlex2
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
    </EpistoFlex2>;
};
