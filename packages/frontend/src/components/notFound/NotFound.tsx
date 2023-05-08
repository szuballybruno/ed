import { applicationRoutes } from '../../configuration/applicationRoutes';
import { useNavigation } from '../../services/core/navigatior';
import { EpistoButton } from '../controls/EpistoButton';
import { EpistoFlex2 } from '../controls/EpistoFlex';
import { EpistoFont } from '../controls/EpistoFont';

const NotFound = () => {

    const { navigate2 } = useNavigation();

    return (
        <EpistoFlex2
            className='whall'
            align='center'
            justify='center'>

            <EpistoFlex2
                className='roundBorders mildShadow'
                direction='column'
                align='center'
                p='200px'
                background='var(--transparentWhite70)'>

                <EpistoFont
                    fontSize={'fontXXL'}
                    fontWeight='heavy'>

                    A keresett oldal nem található!
                </EpistoFont>

                <EpistoButton
                    variant='colored'
                    style={{
                        margin: '20px 0 0 0'
                    }}
                    onClick={() => navigate2(applicationRoutes.homeRoute)}>

                    Visszatérés a kezdőlapra
                </EpistoButton>
            </EpistoFlex2>
        </EpistoFlex2>
    );
};

export default NotFound;
