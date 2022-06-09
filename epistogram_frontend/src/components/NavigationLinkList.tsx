import { Flex } from '@chakra-ui/layout';
import { NavLink } from 'react-router-dom';
import { ApplicationRoute } from '../models/types';
import { useIsMatchingCurrentRoute } from '../static/frontendHelpers';
import { EpistoFont } from './controls/EpistoFont';

export const NavigationLinkList = (props: {
    routes: ApplicationRoute[],
    isNoText?: boolean
}) => {

    const { routes } = props;
    const { isMatchingCurrentRoute } = useIsMatchingCurrentRoute();

    return <Flex direction="column">
        {routes
            .map((route, index) => {

                const isCurrent = isMatchingCurrentRoute(route).isMatchingRoute;

                return <NavLink
                    to={route.route.getAbsolutePath()}
                    key={index}>
                    <Flex
                        p="5px 15px"
                        align="center">

                        {/* icon */}
                        {route.icon}

                        {/* text */}
                        {!props.isNoText && <EpistoFont
                            fontSize="fontNormal14"
                            isUppercase
                            style={{
                                marginLeft: '10px',
                                color: 'var(--mildDeepBlue)',
                                fontWeight: isCurrent ? 'bold' : 500
                            }}>
                            {route.title}
                        </EpistoFont>}

                    </Flex>
                </NavLink>;
            })}
    </Flex >;
};
