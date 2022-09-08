import { applicationRoutes } from '../configuration/applicationRoutes';
import { useNavigation } from '../services/core/navigatior';
import { startUserGuideHelp } from '../services/core/userGuidingService';
import { Environment } from '../static/Environemnt';
import { PropsWithChildren } from '../static/frontendHelpers';
import { translatableTexts } from '../static/translatableTexts';
import { EpistoButton } from './controls/EpistoButton';
import { EpistoFlex2 } from './controls/EpistoFlex';
import { EpistoFont } from './controls/EpistoFont';
import { FlexFloat } from './controls/FlexFloat';
import { useAuthorizationContext } from './system/AuthorizationContext';

export const LeftPane = ({
    padding,
    basis,
    children
}: {
    padding?: string,
    basis?: string
} & PropsWithChildren) => {

    const homeRoute = applicationRoutes.rootHomeRoute;
    const { hasPermission } = useAuthorizationContext();
    const { navigate2 } = useNavigation();

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
            padding={padding ? padding : '25px 15px 0 15px'}
            basis={basis ?? undefined}
            className="dividerBorderRight"
            position="relative"
            boxShadow="3px 0px 15px 5px rgba(0,0,0,0.1)">

            {/* logo link */}
            <EpistoFlex2
                width="100%"
                alignItems={'center'}
                justifyContent="flex-start"
                mb="20px">

                <img
                    src={Environment.getAssetUrl('/images/logo.svg')}
                    style={{
                        height: '50px',
                        objectFit: 'cover',
                        cursor: 'pointer',
                        margin: '10px 10px',
                        padding: 0
                    }}
                    alt=""
                    onClick={() => {

                        if (hasPermission('ACCESS_APPLICATION'))
                            navigate2(homeRoute);
                    }} />
            </EpistoFlex2>

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
                src={Environment.getAssetUrl('/images/bg-art-6.png')}
                alt="" />

            {children}

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
                src={Environment.getAssetUrl('/images/bela3D.png')}
                alt="" />

            {/* tina image */}
            <EpistoFlex2
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
            </EpistoFlex2>

            {/* tina button */}
            <EpistoFlex2
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
            </EpistoFlex2>
        </FlexFloat>
    );
};