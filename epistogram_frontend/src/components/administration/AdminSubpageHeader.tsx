import { FlexProps } from '@chakra-ui/layout';
import { Flex } from '@chakra-ui/react';
import { Tab, Tabs } from '@mui/material';
import React, { ReactNode } from 'react';
import { useParams } from 'react-router-dom';
import { ApplicationRoute, ButtonType } from '../../models/types';
import { useNavigation } from '../../services/core/navigatior';
import { useIsMatchingCurrentRoute } from '../../static/frontendHelpers';
import { translatableTexts } from '../../static/translatableTexts';
import { EpistoButton } from '../controls/EpistoButton';

export const AdminSubpageHeader = (props: {
    tabMenuItems?: ApplicationRoute[],
    children?: ReactNode,
    onSave?: () => void,
    headerButtons?: ButtonType[],
    subRouteLabel?: string,
    navigationQueryParams?: any,
    isInverseBackground?: boolean
} & FlexProps) => {

    const {
        children,
        subRouteLabel,
        headerButtons,
        navigationQueryParams,
        tabMenuItems,
        onSave,
        isInverseBackground,
        ...css
    } = props;

    const tabMenuItemsList = (tabMenuItems ?? []);
    const { isMatchingCurrentRoute } = useIsMatchingCurrentRoute();
    const { navigate } = useNavigation();
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

            // if (loggingSettings.routing)
            // console.log('navto: ' + targetRoute.route.getAbsolutePath());

            navigate(targetRoute, {
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

    return <Flex
        direction={'column'}
        className="whall roundBorders"
        background={!isInverseBackground ? 'var(--transparentWhite70)' : undefined}
        px="5px"
        position="relative">

        {/* tabs */}
        {(tabMenuItems || onSave) && (
            <Flex
                className="roundBorders"
                background={isInverseBackground ? 'var(--transparentWhite70)' : undefined}
                flexDirection="row"
                alignItems="center"
                justify={'space-between'}
                height={60}>

                {/* tabs */}
                <Flex
                    p="10px"
                    flex="1">

                    {(tabMenuItems && currentMatchingAbsUrl) && <Tabs
                        className="roundBorders"
                        TabIndicatorProps={{
                            style: {
                                display: 'none',
                            },
                        }}
                        sx={{
                            '&.MuiTabs-root': {
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                height: 45,
                                minHeight: 0
                            }
                        }}
                        value={currentMatchingAbsUrl}
                        onChange={(_, path: string) => handleNavigateToTab(path)}>

                        {tabMenuItems
                            .map((tabRoute, index) => {

                                return <Tab
                                    key={index}
                                    sx={{
                                        '&.MuiTab-root': {
                                            color: '#444',
                                            cursor: 'pointer',
                                            backgroundColor: 'transparent',
                                            padding: '6px 16px',
                                            border: 'none',
                                            borderRadius: '5px',
                                            display: 'flex',
                                            justifyContent: 'center',
                                            height: '41px',
                                            minHeight: '0px'
                                        },
                                        '&.MuiTouchRipple-root': {
                                            lineHeight: '0px'
                                        },
                                        '&.Mui-selected': {
                                            color: 'white',
                                            fontWeight: 'bold',
                                            background: 'var(--funkyHighlight)'
                                        }
                                    }}
                                    label={tabRoute.title}
                                    value={tabRoute.route.getAbsolutePath()} />;
                            })}
                    </Tabs>}
                </Flex>

                {/* header buttons */}
                <Flex>

                    {/* header buttons */}
                    {headerButtons && headerButtons
                        .map((button, index) => <EpistoButton
                            key={index}
                            style={{
                                color: '#555',
                                marginRight: '10px',
                                //background: "var(--transparentIntenseTeal)",
                                fontWeight: 'bold',
                                height: 41
                            }}
                            variant="plain"
                            isDisabled={button.disabled}
                            onClick={button.action}>
                            {button.icon}
                            {button.title}
                        </EpistoButton>)}

                    {/* save button */}
                    {onSave && <EpistoButton
                        variant="colored"
                        onClick={() => onSave()}>

                        {translatableTexts.misc.save}
                    </EpistoButton>}
                </Flex>
            </Flex>
        )}

        {/* children  */}
        <Flex
            direction="row"
            flex="1"
            {...css}>

            {children}
        </Flex>
    </Flex >;
};
