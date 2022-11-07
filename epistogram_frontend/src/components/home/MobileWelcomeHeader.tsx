import { UserDTO } from '../../shared/dtos/UserDTO';
import { EpistoFlex2 } from '../controls/EpistoFlex';
import { EpistoFont } from '../controls/EpistoFont';
import { ProfileImage } from '../ProfileImage';

export const MobileWelcomeHeader = (props: {
    user: UserDTO;
}) => {

    const { user } = props;

    return <EpistoFlex2
        justify='space-between'
        align='center'
        px='10px'
        my='20px'>

        <EpistoFlex2 direction='column'>

            <EpistoFont
                fontWeight='heavy'
                fontSize='fontLargePlus'>

                Szia {user.firstName}!
            </EpistoFont>
            <EpistoFont fontSize='fontLarge'>

                Folytathatjuk a tanulást?
            </EpistoFont>
        </EpistoFlex2>


        <ProfileImage
            className='square50'
            url={user.avatarUrl}
            firstName={user.firstName}
            lastName={user.lastName} />
    </EpistoFlex2 >;
};