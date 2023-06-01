import { EpistoButton } from '../controls/EpistoButton';
import { EpistoFlex2, EpistoFlex2Props } from '../controls/EpistoFlex';

export const NavbarButton = (props: {
    menuName?: string,
    onClick: () => void
} & EpistoFlex2Props) => {

    const { onClick, menuName, children, ...css } = props;

    return <EpistoFlex2
        margin="0 5px 0 5px"
        {...css}>

        {children
            ? children
            : <EpistoButton
                className='font14'
                onClick={() => onClick()}
                style={{
                    letterSpacing: 0.8,
                    textTransform: 'lowercase',
                    flex: '1'
                }}
                variant="plain" >

                {menuName}
            </EpistoButton>}
    </EpistoFlex2>;
};
