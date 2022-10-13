import { applicationRoutes } from '../configuration/applicationRoutes';
import { CompanyApiService } from '../services/api/CompanyApiService1';
import { useNavigation } from '../services/core/navigatior';
import { Environment } from '../static/Environemnt';
import { PropsWithChildren } from '../static/frontendHelpers';
import { EpistoFlex2 } from './controls/EpistoFlex';
import { EpistoImage } from './controls/EpistoImage';
import { FlexFloat } from './controls/FlexFloat';
import { useAuthorizationContext } from './system/AuthorizationContext';
import { useTawkApi } from './system/TawkToFrame';
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
    const { toggle } = useTawkApi();
    const { companyDetails } = CompanyApiService
        .useCompanyDetailsByDomain(window.location.origin);

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

                        if (hasPermission('BYPASS_SURVEY'))
                            navigate2(homeRoute);
                    }} />
            </EpistoFlex2>

            {children}

            <EpistoImage
                position='absolute'
                bottom='20px'
                src={companyDetails?.logoUrl + ''} />

            {/* tina image 
            <EpistoFlex2
                direction="column"
                position="absolute"
                bottom="160px"
                right="25px"
                width="170px">

                <EpistoFont
                    fontSize="fontSmall"
                    style={{
                        marginBottom: 5
                    }}>

                    {translatableTexts.leftPane.assistantDescription}
                </EpistoFont>
            </EpistoFlex2>

            {/* tina button 
            <EpistoFlex2
                direction="column"
                position="absolute"
                bottom="100px"
                right="20px"
                width="130px">

                <EpistoButton
                    variant='colored'
                    onClick={() => toggle()}>

                    {translatableTexts.leftPane.assistantButtonTitle}
                </EpistoButton>
            </EpistoFlex2>*/}
        </FlexFloat>
    );
};
