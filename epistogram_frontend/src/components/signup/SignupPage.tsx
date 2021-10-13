import React, { useContext } from 'react';
import { applicationRoutes } from '../../configuration/applicationRoutes';
import { globalConfig } from "../../configuration/config";
import { usePaging } from "../../frontendHelpers";
import { useNavigation } from '../../services/navigatior';
import { CurrentUserContext, RefetchUserAsyncContext } from '../HOC/AuthenticationFrame';
import { ContentWrapper, MainWrapper } from "../HOC/MainPanels";
import Navbar from "../navbar/Navbar";
import { SignupQuestions } from '../SignupQuestions';
import { PersonalityAssessment } from '../universal/PersonalityAssessment';
import { SlidesDisplay } from "../universal/SlidesDisplay";
import { SignupWrapper } from "./SignupWrapper";

export const SignupPage = () => {

    // slides
    const gereetImageUrl = "";
    const slidesState = usePaging([1, 2, 3]);
    const user = useContext(CurrentUserContext)!;
    const refetchUserAsync = useContext(RefetchUserAsyncContext)!;

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
        currentImage={gereetImageUrl}
        description={"A következő kérdéssorozat segítségével felmérjük tanulási stílusodat, hogy a lehető leghatékonyabban tudd használni az Epistogramot"}
        onNext={() => slidesState.next()}
        nextButtonTitle="Tovabb">
    </SignupWrapper>

    const QuestionnaireSlide = () => <SignupQuestions
        onNextOverNavigation={handleGoToSummary}
        onPrevoiusOverNavigation={slidesState.previous}
        onJumpToResults={slidesState.jumpToLast} />

    const SummarySlide = (isCurrent: boolean) => <SignupWrapper
        title={"A bal oldalon a saját egyedi tanulási stílusod vizualizációja látható"}
        description={"Már csak egy-két adatra van szükségünk, hogy elkezdhesd a rendszer használatát"}
        upperTitle="Összegzés"
        nextButtonTitle={"Tovabb a fooldalra!"}
        onNext={handleGoToHomePage}
        onNavPrevious={() => slidesState.previous()}>

        {isCurrent && <PersonalityAssessment height="50vh" mt="20px"></PersonalityAssessment>}
    </SignupWrapper>

    const slides = [
        GreetSlide,
        QuestionnaireSlide,
        SummarySlide
    ];

    return (

        <MainWrapper>

            {/* navbar */}
            <Navbar hideLinks={true} />

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