import { Home, Person, Search } from '@mui/icons-material';
import { ReactNode, useContext } from 'react';
import { applicationRoutes } from '../../configuration/applicationRoutes';
import { ApplicationRoute } from '../../models/types';
import { useLogout } from '../../services/api/authenticationApiService';
import { useNavigation } from '../../services/core/navigatior';
import { useShowErrorDialog } from '../../services/core/notifications';
import { isCurrentRoute } from '../../static/frontendHelpers';
import { EpistoButton } from '../controls/EpistoButton';
import { EpistoFlex2 } from '../controls/EpistoFlex';
import { RefetchUserAsyncContext } from '../system/AuthenticationFrame';

const MobileNavigationButton = (props: {
    title: string,
    icon: ReactNode,
    to: ApplicationRoute
}) => {

    const isSelected = isCurrentRoute(props.to.route.getAbsolutePath());
    const { navigate2 } = useNavigation();

    return <EpistoButton
        style={{
            flexDirection: 'column',
            fontSize: '11px',
            color: isSelected
                ? 'var(--epistoTeal)'
                : 'black'
        }}
        onClick={() => navigate2(props.to)}>

        {props.icon}
        {props.title}
    </EpistoButton>;
};

export const MobileNavigation = () => {


    const fetchUserAsync = useContext(RefetchUserAsyncContext);

    // util 
    const { logoutUserAsync } = useLogout();
    const showError = useShowErrorDialog();
    const isLandscape = window.orientation === 90;

    const handleLogout = async () => {
        try {

            await logoutUserAsync();
            await fetchUserAsync();
        } catch (e) {

            showError(e);
        }
    };

    return <EpistoFlex2
        position='fixed'
        bottom='0'
        left='0'
        zIndex={1}
        display={isLandscape ? 'hidden' : 'flex'}
        width='100%'
        height='80px'
        pb='20px'
        justify='space-evenly'
        background='white'>

        <MobileNavigationButton
            title='Kezdőlap'
            icon={<Home className='square30' />}
            to={applicationRoutes.homeRoute} />

        <MobileNavigationButton
            title='Tanfolyamaim'
            icon={<Search className='square30' />}
            to={applicationRoutes.availableCoursesRoute} />

        <MobileNavigationButton
            title='Profilom'
            icon={<Person className='square30' />}
            to={applicationRoutes.settingsRoute} />

        {/*      <EpistoButton
            variant='colored'
            onClick={handleLogout}
            style={{
                background: 'var(--mildRed)',
                margin: '20px 0 0 0'
            }}>

            Kijelentkezés
        </EpistoButton> */}

    </EpistoFlex2>;
};