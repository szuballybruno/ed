import { applicationRoutes } from '../../configuration/applicationRoutes';
import { Responsivity } from '../../helpers/responsivity';
import { SurveyApiService } from '../../services/api/SurveyApiService';
import browser from '../../services/core/browserSniffingService';
import { useNavigation } from '../../services/core/navigatior';
import { startUserGuide } from '../../services/core/userGuidingService';
import { Environment } from '../../static/Environemnt';
import { usePaging } from '../../static/frontendHelpers';
import { translatableTexts } from '../../static/translatableTexts';
import { EpistoFont } from '../controls/EpistoFont';
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
    const isIPhone = browser.isIPhone;

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
        description={translatableTexts.signupPage.summarySlideDescriptionParts
            .map(x => <><EpistoFont>{x}</EpistoFont><br /></>)
        }
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
                height={isIPhone ? 'calc(100vh - 60px)' : '100vh'}
                align={isMobile ? 'flex-start' : 'center'}
                justify={isMobile ? 'flex-start' : 'center'}
                noOverflow
                hideNavbar>

                <EpistoPaging
                    width={isMobile ? 'calc(100vw - 40px)' : 'calc(100% - 150px)'}
                    //height={isMobile ? 'calc(100vh - 100px)' : 'calc(100vh - 100px)'}
                    maxHeight={(() => {
                        if (isIPhone)
                            return 'calc(100vh - 60px)';

                        if (isMobile)
                            return '100vh';

                        return '800px';
                    })()}
                    className="roundBorders largeSoftShadow"
                    alwaysRender={true}
                    maxW='1400px'
                    background="var(--transparentWhite70)"
                    p="10px"
                    my={isMobile ? '10px' : undefined}
                    pb={isIPhone ? '40px' : '10px'}
                    m={isMobile ? undefined : '10px'}
                    zIndex="1"
                    //flex="1"
                    slides={slides}
                    index={slidesState.currentIndex} />

            </ContentPane>
        </>
    );
};
