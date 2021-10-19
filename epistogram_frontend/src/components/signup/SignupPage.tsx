import React, { useContext } from 'react';
import { applicationRoutes } from '../../configuration/applicationRoutes';
import { getAssetUrl, usePaging } from "../../frontendHelpers";
import { useNavigation } from '../../services/navigatior';
import { translatableTexts } from '../../translatableTexts';
import { CurrentUserContext, RefetchUserAsyncContext } from '../HOC/AuthenticationFrame';
import { ContentWrapper, MainWrapper } from "../HOC/MainPanels";
import { SignupQuestions } from '../SignupQuestions';
import { PersonalityAssessment } from '../universal/PersonalityAssessment';
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
    }

    const GreetSlide = () => <SignupWrapper
        title="Regisztráció"
        upperTitle="Üdv a fedélzeten!"
        currentImage={getAssetUrl("/signupQuestionImages/regisztracio.svg")}
        description={"A következő kérdéssorozat segítségével felmérjük tanulási stílusodat, hogy a lehető leghatékonyabban tudd használni az Epistogramot"}
        onNext={() => slidesState.next()}
        nextButtonTitle="Tovább">
    </SignupWrapper>

    const QuestionnaireSlide = () => <SignupQuestions
        onNextOverNavigation={handleGoToSummary}
        onPrevoiusOverNavigation={slidesState.previous}
        onJumpToResults={slidesState.jumpToLast} />

    const SummarySlide = (isCurrent: boolean) => <SignupWrapper
        title={"Az alábbi grafikonon a saját tanulási stílusod vizualizációja látható"}
        upperTitle="Összegzés"
        onNext={isInvitedUser ? handleGoToHomePage : undefined}
        nextButtonTitle={isInvitedUser ? translatableTexts.signup.goToHomePage : undefined}
        onNavPrevious={() => slidesState.previous()}>

        {isCurrent && <PersonalityAssessment height="100%" mt="20px"></PersonalityAssessment>}
    </SignupWrapper>

    const slides = [
        GreetSlide,
        QuestionnaireSlide,
        SummarySlide
    ];

    return (

        <MainWrapper>

            {/* navbar */}

            <ContentWrapper>
                <SlidesDisplay
                    alwaysRender={true}
                    flex="1"
                    slides={slides}
                    index={slidesState.currentIndex} />
            </ContentWrapper>
        </MainWrapper >
    );
};
