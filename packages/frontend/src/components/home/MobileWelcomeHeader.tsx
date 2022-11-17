import { UserDTO } from '@episto/communication';
import { Environment } from '../../static/Environemnt';
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
            url={user.avatarUrl ? Environment.getAssetUrl(user.avatarUrl) : undefined}
            firstName={user.firstName}
            lastName={user.lastName} />
    </EpistoFlex2 >;
};