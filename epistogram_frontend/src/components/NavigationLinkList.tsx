import { NavLink } from 'react-router-dom';
import { ApplicationRoute } from '../models/types';
import { useIsMatchingCurrentRoute } from '../static/frontendHelpers';
import { EpistoFlex2 } from './controls/EpistoFlex';
import { EpistoFont } from './controls/EpistoFont';

export const NavigationLinkList = (props: {
    routes: ApplicationRoute[],
    isNoText?: boolean
}) => {

    const { routes } = props;
    const isMatchingCurrent = useIsMatchingCurrentRoute();

    return <EpistoFlex2 direction="column">
        {routes
            .map((route, index) => {

                const { isMatchingRoute: isCurrent } = isMatchingCurrent(route);

                return <NavLink
                    to={route.route.getAbsolutePath()}
                    key={index}>

                    <EpistoFlex2
                        p="5px 15px"
                        bg={isCurrent ? 'white' : undefined}
                        align="center"
                        borderLeft={isCurrent ? 'solid 4px var(--mildDeepBlue)' : undefined}
                        className={`${isCurrent ? 'mildShadow' : ''}`}
                        borderRadius="0px 5px 5px 0px">

                        {/* icon */}
                        {route.icon}

                        {/* text */}
                        {!props.isNoText && <EpistoFont
                            fontSize="fontNormal14"
                            isUppercase
                            style={{
                                marginLeft: '10px',
                                color: 'var(--mildDeepBlue)',
                                fontWeight: isCurrent ? 'bold' : 500,
                            }}>
                            {route.title}
                        </EpistoFont>}

                    </EpistoFlex2>
                </NavLink>;
            })}
    </EpistoFlex2 >;
};
