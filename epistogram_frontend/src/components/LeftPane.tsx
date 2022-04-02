import { Flex, FlexProps } from '@chakra-ui/react';
import { Typography } from '@mui/material';
import React, { useContext } from 'react';
import { applicationRoutes } from '../configuration/applicationRoutes';
import { useNavigation } from '../services/core/navigatior';
import { startUserGuideHelp } from '../services/core/userGuidingService';
import { getAssetUrl } from '../static/frontendHelpers';
import { CurrentUserContext } from './system/AuthenticationFrame';
import { EpistoButton } from './controls/EpistoButton';
import { FlexFloat } from './controls/FlexFloat';
import { EpistoFont } from './controls/EpistoFont';
import { translatableTexts } from '../static/translatableTexts';

export const LeftPane = (props: FlexProps) => {

    const homeUrl = applicationRoutes.rootHomeRoute.route;
    const user = useContext(CurrentUserContext);
    const { navigate } = useNavigation();

    return (
        <FlexFloat
            borderRadius="none"
            id="leftPane"
            bg="white"
            zIndex={2}
            flexBasis="320px"
            maxW="320px"
            direction="column"
            align="stretch"
            padding="25px 15px 0 15px"
            className="dividerBorderRight"
            position="relative"
            //borderLeft="2px solid #e2e2e2"
            boxShadow="3px 0px 15px 5px rgba(0,0,0,0.1)"
            {...props}>

            {/* logo link */}
            <Flex width="100%"
alignItems={'center'}
justifyContent="flex-start"
mb="20px">
                <img
                    src={getAssetUrl('/images/logo.svg')}
                    style={{
                        height: '50px',
                        objectFit: 'cover',
                        cursor: 'pointer',
                        margin: '10px 10px',
                        padding: 0
                    }}
                    alt=""
                    onClick={() => {

                        if (user?.userActivity?.canAccessApplication)
                            navigate(homeUrl);
                    }} />
            </Flex>

            {/* magic powder top right */}
            <img
                style={{
                    position: 'absolute',
                    right: 23,
                    top: -30,
                    width: 120,
                    transform: 'rotate(270deg)',
                    objectFit: 'contain',
                    zIndex: -1,
                }}
                src={getAssetUrl('/images/bg-art-6.png')}
alt="" />

            {props.children}

            {/* magic powder top right */}
            <img
                style={{
                    position: 'absolute',
                    left: -10,
                    bottom: 0,
                    width: 170,
                    transform: 'rotate(0deg) scale(-1,1)',
                    objectFit: 'contain',
                    zIndex: -1,
                }}
                src={getAssetUrl('/images/bela3D.png')}
alt="" />

            {/* tina image */}
            <Flex
                direction="column"
                position="absolute"
                bottom="160"
                right="25"
                width="170px">

                <EpistoFont
                    fontSize="fontSmall"
                    style={{
                        marginBottom: 5
                    }}>

                    {translatableTexts.leftPane.assistantDescription}
                </EpistoFont>
            </Flex>

            {/* tina button */}
            <Flex
                direction="column"
                position="absolute"
                bottom="100"
                right="20"
                width="130px">

                <EpistoButton
                    variant='colored'
                    onClick={() => startUserGuideHelp()}>

                    {translatableTexts.leftPane.assistantButtonTitle}
                </EpistoButton>
            </Flex>
        </FlexFloat>
    );
};