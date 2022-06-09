import { Flex } from '@chakra-ui/layout';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { ApplicationRoute } from '../../models/types';
import { readSidePanelCollapsed, writeSidePanelCollapsed } from '../../services/core/storageService';
import { EpistoIcons } from '../../static/EpistoIcons';
import { useIsMatchingCurrentRoute } from '../../static/frontendHelpers';
import { EpistoButton } from '../controls/EpistoButton';
import { EpistoFlex } from '../controls/EpistoFlex';
import { EpistoFont } from '../controls/EpistoFont';

export const useNavigationLinkedListLogic = (noCollapse: boolean) => {

    const [isCollapsedState, setIsCollapsedState] = useState(false);

    const isCollapsed = useMemo(() => noCollapse
        ? false
        : isCollapsedState, [isCollapsedState, noCollapse]);

    useEffect(() => {

        setIsCollapsedState(readSidePanelCollapsed());
    }, []);

    const toggleCollapse = useCallback(() => {

        setIsCollapsedState(!isCollapsed);
        writeSidePanelCollapsed(!isCollapsed);
    }, [isCollapsed, setIsCollapsedState]);

    return {
        isCollapsed,
        toggleCollapse
    };
};

export type NavigationLinkedListLogicType = ReturnType<typeof useNavigationLinkedListLogic>;

export const NavigationLinkList = ({ routes, noCollapse }: {
    routes: ApplicationRoute[],
    noCollapse?: boolean
}) => {

    const { isCollapsed, toggleCollapse } = useNavigationLinkedListLogic(!!noCollapse);
    const { isMatchingCurrentRoute } = useIsMatchingCurrentRoute();

    return <EpistoFlex
        direction="vertical"
        justify='space-between'
        height='full'>

        {/* links */}
        <EpistoFlex direction='vertical'>
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
                                transition="0.2s"
                                maxWidth={isCollapsed ? 0 : 999}>

                                {!isCollapsed && <EpistoFont
                                    isUppercase
                                    margin={{
                                        left: 'px10'
                                    }}
                                    noLineBreak
                                    fontSize2='normal'
                                    color='mildDeepBlue'
                                    fontWeight={isCurrent ? 'heavy' : undefined}>

                                    {route.title}
                                </EpistoFont>}
                            </Flex>
                        </Flex>
                    </NavLink>;
                })}
        </EpistoFlex>

        {/* collapse button */}
        {!noCollapse && <EpistoFlex
            margin={{
                vertical: 'px10'
            }}
            justify={isCollapsed ? 'center' : 'flex-start'}>

            <EpistoButton
                onClick={toggleCollapse}>

                {isCollapsed
                    ? <EpistoIcons.ExpandRight />
                    : <EpistoIcons.CollapseLeft />}
            </EpistoButton>
        </EpistoFlex>}
    </EpistoFlex>;
};
