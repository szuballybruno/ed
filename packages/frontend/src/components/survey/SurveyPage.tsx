import { applicationRoutes } from '../../configuration/applicationRoutes';
import { Responsivity } from '../../helpers/responsivity';
import { SurveyApiService } from '../../services/api/SurveyApiService';
import { useNavigation } from '../../services/core/navigatior';
import { startUserGuide } from '../../services/core/userGuidingService';
import { Environment } from '../../static/Environemnt';
import { usePaging } from '../../static/frontendHelpers';
import { translatableTexts } from '../../static/translatableTexts';
import { EpistoFlex2 } from '../controls/EpistoFlex';
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
                hideNavbar>

                <EpistoFlex2
                    className="whall"
                    align="center"
                    justify="center">

                    <EpistoPaging
                        width={isMobile ? '100vw' : 'calc(100% - 150px)'}
                        height={isMobile ? '100vh' : 'calc(100vh - 100px)'}
                        maxH={isMobile ? undefined : '800px'}
                        className="roundBorders largeSoftShadow"
                        alwaysRender={true}
                        maxW="1400px"
                        background="var(--transparentWhite70)"
                        p="10px"
                        zIndex="1"
                        flex="1"
                        slides={slides}
                        index={slidesState.currentIndex} />

                </EpistoFlex2>
            </ContentPane>
        </>
    );
};
