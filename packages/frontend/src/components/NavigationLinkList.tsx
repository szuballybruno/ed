import { ApplicationRoute } from '../models/types';
import { useIsMatchingCurrentRoute } from '../static/frontendHelpers';
import { EpistoFlex2 } from './controls/EpistoFlex';
import { EpistoFont } from './controls/EpistoFont';

export const NavigationLinkList = <TRoute extends ApplicationRoute<any, any>>({
    onNav,
    routes,
    isNoText
}: {
    routes: TRoute[],
    isNoText?: boolean,
    onNav: (route: TRoute) => void
}) => {

    const isMatchingCurrent = useIsMatchingCurrentRoute();

    return <EpistoFlex2 direction="column">
        {routes
            .map((route, index) => {

                const { isMatchingRoute: isCurrent } = isMatchingCurrent(route);

                return <EpistoFlex2
                    cursor="pointer"
                    onClick={() => onNav(route)}
                    key={index}>

                    <EpistoFlex2
                        p="5px 15px"
                        bg={isCurrent ? 'white' : undefined}
                        align="center"
                        borderLeft={isCurrent ? 'solid 4px var(--mildDeepBlue)' : 'solid 4px transparent'}
                        className={isCurrent ? 'mildShadow' : undefined}
                        borderRadius="0px 5px 5px 0px">

                        {/* icon */}
                        {route.icon}

                        {/* text */}
                        {!isNoText && <EpistoFont
                            isUppercase
                            style={{
                                marginLeft: '10px',
                                color: 'var(--mildDeepBlue)',
                                fontWeight: isCurrent ? 'bold' : 500,
                            }}>
                            {route.title}
                        </EpistoFont>}

                    </EpistoFlex2>
                </EpistoFlex2>;
            })}
    </EpistoFlex2>;
};
