import { applicationRoutes } from '../../configuration/applicationRoutes';
import { Responsivity } from '../../helpers/responsivity';
import { SurveyApiService } from '../../services/api/SurveyApiService';
import { useNavigation } from '../../services/core/navigatior';
import { startUserGuide } from '../../services/core/userGuidingService';
import { Environment } from '../../static/Environemnt';
import { usePaging } from '../../static/frontendHelpers';
import { translatableTexts } from '../../static/translatableTexts';
import { ContentPane } from '../pageRootContainer/ContentPane';
import { useRefetchUserAsync } from '../system/AuthenticationFrame';
import { EpistoPaging } from '../universal/EpistoPaging';
import { SurveyQuestions } from './SurveyQuestions';
import { SurveyWrapper } from './SurveyWrapper';

export const SurveyPage = () => {

    // slides
    const slidesState = usePaging({ items: [1, 2, 3] });
    const { refetchAuthHandshake } = useRefetchUserAsync();
    const { completeSurveyAsync } = SurveyApiService.useCompleteSurvey();
    const isInvitedUser = true;
    const { isMobile } = Responsivity
        .useIsMobileView();

    const { navigate2 } = useNavigation();

    const handleGoToSummary = () => {

        slidesState.next();
        completeSurveyAsync();
        refetchAuthHandshake();
    };

    const handleGoToHomePage = () => {

        navigate2(applicationRoutes.homeRoute);

        startUserGuide();
    };

    const GreetSlide = () => <SurveyWrapper
        title={translatableTexts.signupPage.greetSlideTitle}
        currentImage={Environment.getAssetUrl('/signupQuestionImages/regisztracio.svg')}
        description={translatableTexts.signupPage.greetSlideDescription}
        onNext={() => slidesState.next()}
        nextButtonTitle={translatableTexts.signupPage.greetSlideNextButton}>
    </SurveyWrapper>;

    const QuestionnaireSlide = () => <SurveyQuestions
        onNextOverNavigation={handleGoToSummary}
        onPrevoiusOverNavigation={slidesState.previous}
        onJumpToResults={slidesState.jumpToLast} />;

    const SummarySlide = (isCurrent: boolean) => <SurveyWrapper
        currentImage={Environment.getAssetUrl('/images/analysis3D.png')}
        // description={<EpistoFont isMultiline>

        //     {/* this part should be bolder */}
        //     <EpistoFont
        //         style={{ fontWeight: 500 }}>

        //         {translatableTexts.signupPage.summarySlideDescriptionParts[0]}
        //     </EpistoFont>

        //     {translatableTexts.signupPage.summarySlideDescriptionParts[1]}

        //     {/* this part should be bolder */}
        //     <EpistoFont
        //         style={{ fontWeight: 500 }}>

        //         {translatableTexts.signupPage.summarySlideDescriptionParts[2]}
        //     </EpistoFont>
        // </EpistoFont>}
        onNext={isInvitedUser ? handleGoToHomePage : undefined}
        nextButtonTitle={isInvitedUser ? translatableTexts.signupPage.goToHomePage : undefined}
        onNavPrevious={() => slidesState.previous()}
        headerRightButton={isInvitedUser ? { name: translatableTexts.signupPage.goToHomePage, action: handleGoToHomePage } : undefined}>
    </SurveyWrapper >;

    const slides = [
        GreetSlide,
        QuestionnaireSlide,
        SummarySlide
    ];

    return (
        <>

            <ContentPane
                align="center"
                justify="center"
                hideNavbar
                padding='20px'>

                <EpistoPaging
                    className="roundBorders largeSoftShadow"
                    alwaysRender={true}
                    width={isMobile ? '100vw' : 'calc(100% - 150px)'}
                    maxW="1400px"
                    height={isMobile ? '100vh' : 'calc(100vh - 100px)'}
                    background="var(--transparentWhite70)"
                    maxH={isMobile ? undefined : '800px'}
                    p="10px"
                    zIndex="1"
                    flex="1"
                    slides={slides}
                    index={slidesState.currentIndex} />

            </ContentPane>
        </>
    );
};
