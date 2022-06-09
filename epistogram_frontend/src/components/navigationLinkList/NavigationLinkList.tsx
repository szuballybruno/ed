import { Flex } from '@chakra-ui/layout';
import { NavLink } from 'react-router-dom';
import { ApplicationRoute } from '../../models/types';
import { useIsMatchingCurrentRoute } from '../../static/frontendHelpers';
import { EpistoButton } from '../controls/EpistoButton';
import { EpistoFont } from '../controls/EpistoFont';

export const NavigationLinkList = ({ routes, isCollapsed, toggleCollapse }: {
    routes: ApplicationRoute[],
    isCollapsed?: boolean,
    toggleCollapse: () => void
}) => {

    const { isMatchingCurrentRoute } = useIsMatchingCurrentRoute();

    return <Flex direction="column">
        {routes
            .map((route, index) => {

                const isCurrent = isMatchingCurrentRoute(route).isMatchingRouteExactly;

                return <NavLink
                    to={route.route.getAbsolutePath()}
                    key={index}>

                    <Flex
                        p="5px 15px"
                        align="center">

                        {/* icon */}
                        {route.icon}

                        {/* text */}
                        <Flex
                            overflow="hidden"
                            transition="1s"
                            maxWidth={isCollapsed ? 0 : 999}>

                            {!isCollapsed && <EpistoFont
                                isUppercase
                                margin={{
                                    left: 'px10'
                                }}
                                fontSize2='normal'
                                color='mildDeepBlue'
                                fontWeight={isCurrent ? 'heavy' : undefined}>

                                {route.title}
                            </EpistoFont>}
                        </Flex>
                    </Flex>
                </NavLink>;
            })}

        <EpistoButton
            onClick={() => toggleCollapse()}>
asd
        </EpistoButton>
    </Flex>;
};
