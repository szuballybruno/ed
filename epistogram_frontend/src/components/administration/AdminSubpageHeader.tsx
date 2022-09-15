import { ReactNode } from 'react';
import { useParams } from 'react-router-dom';
import { ApplicationRoute, ButtonType } from '../../models/types';
import { useNavigation } from '../../services/core/navigatior';
import { useIsMatchingCurrentRoute } from '../../static/frontendHelpers';
import { translatableTexts } from '../../static/translatableTexts';
import { EpistoButton } from '../controls/EpistoButton';
import { EpistoFlex2, EpistoFlex2Props } from '../controls/EpistoFlex';
import { EpistoTabs } from '../controls/EpistoTabs';

export const AdminSubpageHeader = ({
    children,
    subRouteLabel,
    headerButtons,
    navigationQueryParams,
    tabMenuItems,
    headerContent,
    onSave,
    isInverseBackground,
    ...css
}: {
    tabMenuItems?: ApplicationRoute<any>[],
    children?: ReactNode,
    onSave?: () => void,
    headerButtons?: ButtonType[],
    headerContent?: ReactNode,
    subRouteLabel?: string,
    navigationQueryParams?: any,
    isInverseBackground?: boolean,
} & EpistoFlex2Props) => {

    const tabMenuItemsList = (tabMenuItems ?? []);
    const isMatchingCurrentRoute = useIsMatchingCurrentRoute();
    const { navigate2 } = useNavigation();
    const urlParams = useParams<{ userId: string, courseId: string, videoId: string, examId: string, shopItemId: string }>();
    const userId = urlParams.userId ? parseInt(urlParams.userId) : null;
    const courseId = urlParams.courseId ? parseInt(urlParams.courseId) : null;
    const videoId = urlParams.videoId ? parseInt(urlParams.videoId) : null;
    const examId = urlParams.examId ? parseInt(urlParams.examId) : null;
    const shopItemId = urlParams.shopItemId ? parseInt(urlParams.shopItemId) : null;

    const currentMatchingRoute = tabMenuItemsList
        .firstOrNull(route => isMatchingCurrentRoute(route).isMatchingRouteExactly);

    const handleNavigateToTab = (path: string) => {

        const targetRoute = tabMenuItemsList
            .firstOrNull(x => x.route.getAbsolutePath() === path);

        if (!targetRoute)
            return;

        if (targetRoute.navAction) {

            targetRoute.navAction();
        }
        else {

            navigate2(targetRoute, {
                userId,
                courseId,
                videoId,
                examId,
                shopItemId,
                ...navigationQueryParams
            });
        }
    };

    const currentMatchingAbsUrl = currentMatchingRoute?.route?.getAbsolutePath();

    return <EpistoFlex2
        id={AdminSubpageHeader.name}
        direction={'column'}
        className="whall roundBorders"
        background={!isInverseBackground ? 'var(--transparentWhite70)' : undefined}
        px="5px"
        position="relative">

        {/* tabs */}
        {(tabMenuItems || onSave) && (
            <EpistoFlex2
                className="roundBorders"
                background={isInverseBackground ? 'var(--transparentWhite70)' : undefined}
                flexDirection="row"
                alignItems="center"
                justify={'space-between'}
                height='60px'>

                {/* tabs */}
                <EpistoFlex2
                    p="10px"
                    flex="1">

                    {(tabMenuItems && currentMatchingAbsUrl) && <EpistoTabs
                        tabItems={tabMenuItems
                            .map(x => ({
                                key: x.route.getAbsolutePath(),
                                label: x.title
                            }))}
                        selectedTabKey={currentMatchingAbsUrl}
                        onChange={handleNavigateToTab} />}
                </EpistoFlex2>

                {/* header buttons */}
                <EpistoFlex2>

                    {/* header buttons */}
                    {headerButtons && headerButtons
                        .map((button, index) => <EpistoButton
                            key={index}
                            style={{
                                // color: '#555',
                                marginRight: '10px',
                                // fontWeight: 'bold',
                                height: 41
                            }}
                            variant={button.variant ?? 'plain'}
                            isDisabled={button.disabled}
                            onClick={button.action}>
                            {button.icon}
                            {button.title}
                        </EpistoButton>)}

                    {/* header content */}
                    {headerContent}

                    {/* save button */}
                    {onSave && <EpistoButton
                        variant="colored"
                        onClick={() => onSave()}>

                        {translatableTexts.misc.save}
                    </EpistoButton>}
                </EpistoFlex2>
            </EpistoFlex2>
        )}

        {/* children  */}
        <EpistoFlex2
            direction="row"
            flex="1"
            {...css}>

            {children}
        </EpistoFlex2>
    </EpistoFlex2 >;
};
