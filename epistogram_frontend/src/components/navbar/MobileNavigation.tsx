import { Home, Person, Search } from '@mui/icons-material';
import { ReactNode } from 'react';
import { applicationRoutes } from '../../configuration/applicationRoutes';
import { ApplicationRoute } from '../../models/types';
import { useNavigation } from '../../services/core/navigatior';
import { isCurrentRoute } from '../../static/frontendHelpers';
import { EpistoButton } from '../controls/EpistoButton';
import { EpistoFlex2 } from '../controls/EpistoFlex';

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

    return <EpistoFlex2
        position='fixed'
        bottom='0'
        left='0'
        zIndex={1}
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