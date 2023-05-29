import { useCallback, useMemo } from 'react';
import { applicationRoutes } from '../../configuration/applicationRoutes';
import { Responsivity } from '../../helpers/responsivity';
import { useNavigation } from '../../services/core/navigatior';
import { startUserGuide } from '../../services/core/userGuidingService';
import { Environment } from '../../static/Environemnt';
import { usePaging } from '../../static/frontendHelpers';
import { translatableTexts } from '../../static/translatableTexts';
import { EpistoFlex2 } from '../controls/EpistoFlex';
import { EpistoFont } from '../controls/EpistoFont';
import { ContentPane } from '../pageRootContainer/ContentPane';
import { useAuthContextState } from '../system/AuthenticationFrame';
import { EpistoPaging } from '../universal/EpistoPaging';
import { SurveyQuestions } from './SurveyQuestions';
import { SurveyWrapper } from './SurveyWrapper';
const pagingItems = [1, 2, 3];

export const SurveyPage = () => {

    // slides
    const slidesState = usePaging({ items: pagingItems });
    const { refetchAuthHandshake, authState } = useAuthContextState();
    const isInvitedUser = true;
    const { isMobile } = Responsivity
        .useIsMobileView();
    const { isIPhone } = Responsivity.useIsIPhone();
    const isSomethingLoading = useMemo(() => authState === 'loading', [authState]);

    const { navigate2 } = useNavigation();

    const summaryDecription = useMemo(() => translatableTexts.signupPage.summarySlideDescriptionParts
        .map((x, i) => (
            <EpistoFlex2
                key={i}>

                <EpistoFont
                    textColor='eduptiveMildDarkGreen'>
                    {x}
                </EpistoFont>

                <br
                    key={`br_${i}`} />
            </EpistoFlex2>
        )), []);

    /**
     * Handle next slide 
     */
    const handleNext = useCallback(() => {

        slidesState.next();
    }, [slidesState]);

    /**
     * Go to summary 
     */
    const handleGoToSummary = useCallback(async () => {

        //await completeSurveyAsync();
        await refetchAuthHandshake();
        handleNext();
    }, [
        handleNext,
        refetchAuthHandshake
    ]);

    /**
     * Go to home page
     */
    const handleGoToHomePage = useCallback(() => {

        navigate2(applicationRoutes.homeRoute);
        startUserGuide();
    }, [navigate2]);

    const GreetSlide = useMemo(() => () => (
        <SurveyWrapper
            testid="greet-slide"
            title={translatableTexts.signupPage.greetSlideTitle}
            currentImage={Environment.getAssetUrl('/signupQuestionImages/regisztracio.svg')}
            description={translatableTexts.signupPage.greetSlideDescription}
            onNext={handleNext}
            nextButtonTitle={translatableTexts.signupPage.greetSlideNextButton} />
    ), [handleNext]);

    const QuestionnaireSlide = useMemo(() => () => (
        <SurveyQuestions
            isSomethingLoading={isSomethingLoading}
            onNextOverNavigation={handleGoToSummary}
            onPrevoiusOverNavigation={slidesState.previous}
            onJumpToResults={slidesState.jumpToLast} />
    ), [handleGoToSummary, slidesState, isSomethingLoading]);

    const SummarySlide = useMemo(() => () => (
        <SurveyWrapper
            testid="summary-slide"
            currentImage={Environment.getAssetUrl('/images/analysis3D.png')}
            onNext={isInvitedUser ? handleGoToHomePage : undefined}
            nextButtonTitle={isInvitedUser ? translatableTexts.signupPage.goToHomePage : undefined}
            onNavPrevious={() => slidesState.previous()}
            description={summaryDecription} />
    ), [isInvitedUser, slidesState, summaryDecription, handleGoToHomePage]);

    const slides = useMemo(() => [
        GreetSlide,
        QuestionnaireSlide,
        SummarySlide
    ], [
        GreetSlide,
        QuestionnaireSlide,
        SummarySlide
    ]);

    return (
        <>
            <ContentPane
                height={isIPhone ? 'calc(100vh - 60px)' : '100vh'}
                align={isMobile ? 'flex-start' : 'center'}
                justify={isMobile ? 'flex-start' : 'center'}
                noOverflow
                hideNavbar>

                <EpistoFlex2
                    flex="1"
                    width={isMobile ? 'calc(100vw - 40px)' : 'calc(100% - 150px)'}
                    maxHeight={(() => {
                        if (isIPhone)
                            return 'calc(100vh - 60px)';

                        if (isMobile)
                            return '100vh';

                        return '800px';
                    })()}
                    className="roundBorders largeSoftShadow"
                    maxW='1400px'
                    background="var(--transparentWhite70)"
                    padding="10px"
                    paddingBottom={isIPhone ? '40px' : '10px'}
                    my={isMobile ? '10px' : undefined}
                    margin={isMobile ? undefined : '10px'}
                    zIndex="1" >

                    <EpistoPaging
                        slides={slides}
                        index={slidesState.currentIndex} />
                </EpistoFlex2>
            </ContentPane>
        </>
    );
};
