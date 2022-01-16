import React, { useContext } from 'react';
import { applicationRoutes } from '../../configuration/applicationRoutes';
import { useNavigation } from '../../services/core/navigatior';
import { startUserGuide } from '../../services/core/userGuidingService';
import { getAssetUrl, usePaging } from "../../static/frontendHelpers";
import { translatableTexts } from '../../static/translatableTexts';
import { SignupQuestions } from '../SignupQuestions';
import { CurrentUserContext, RefetchUserAsyncContext } from '../system/AuthenticationFrame';
import { PageRootContainer, ContentPane } from "../system/MainPanels";
import { SlidesDisplay } from "../universal/SlidesDisplay";
import { SignupWrapper } from "./SignupWrapper";

export const SignupPage = () => {

    // slides
    const slidesState = usePaging([1, 2, 3]);
    const user = useContext(CurrentUserContext)!;
    const refetchUserAsync = useContext(RefetchUserAsyncContext)!;
    const isInvitedUser = user.isTrusted;

    const { navigate } = useNavigation();

    const handleGoToSummary = () => {

        slidesState.next();
        refetchUserAsync();
    }

    const handleGoToHomePage = () => {

        navigate(applicationRoutes.homeRoute.route);

        console.log("Showing guide...");
        startUserGuide();
    }

    const GreetSlide = () => <SignupWrapper
        title="Regisztráció"
        upperTitle="Üdv a fedélzeten!"
        currentImage={getAssetUrl("/signupQuestionImages/regisztracio.svg")}
        description={"A következő kérdéssorozat segítségével felmérjük tanulási stílusodat, hogy a lehető leghatékonyabban tudd használni az EpistoGramot"}
        onNext={() => slidesState.next()}
        nextButtonTitle="Tovább">
    </SignupWrapper>

    const QuestionnaireSlide = () => <SignupQuestions
        onNextOverNavigation={handleGoToSummary}
        onPrevoiusOverNavigation={slidesState.previous}
        onJumpToResults={slidesState.jumpToLast} />

    const SummarySlide = (isCurrent: boolean) => <SignupWrapper
        title={"Hamarosan küldjük a te személyre szabott elemzésedet!"}
        currentImage={getAssetUrl("/images/analysis3D.png")}
        upperTitle="Összegzés"
        description={"Az előző kérdőív segítségével azt vizsgáltuk, milyen módszerekkel érzed komfortosnak a tanulást. A platformunk további adatokat gyűjt majd arról, milyen típusú tananyagokban haladsz a legjobban, mely idősávokban vagy a leghatékonyabb, a felméréssel kombinálva pedig hamarosan személyre szabott tippeket is kapsz majd, valamint a tanulás sebessége és a módszereink is a te igényeidhez fognak idomulni. Most pedig nem maradt más dolgod, mint a lenti gombra kattintani, és elkezdeni a tanulást!"}
        onNext={isInvitedUser ? handleGoToHomePage : undefined}
        nextButtonTitle={isInvitedUser ? translatableTexts.signup.goToHomePage : undefined}
        onNavPrevious={() => slidesState.previous()}
        headerRightButton={isInvitedUser ? { name: translatableTexts.signup.goToHomePage, action: handleGoToHomePage } : undefined}>
    </SignupWrapper>

    const slides = [
        GreetSlide,
        QuestionnaireSlide,
        SummarySlide
    ];

    return (
        <PageRootContainer>

            <ContentPane
                align="center"
                justify="center"
                style={{
                    background: "radial-gradient(farthest-corner at 300px 100px, rgba(177,208,242,0.7) 33%, rgba(255,255,255,1) 100%)"
                }}>

                <SlidesDisplay
                    alwaysRender={true}
                    maxW="calc(100% - 300px)"
                    h="calc(100vh - 100px)"
                    background="var(--transparentWhite70)"
                    zIndex="1"
                    boxShadow={"5px 5px 25px 5px rgba(0,0,0,0.10)"}
                    flex="1"
                    borderRadius={6}
                    slides={slides}
                    index={slidesState.currentIndex} />
            </ContentPane>
        </PageRootContainer >
    );
};
