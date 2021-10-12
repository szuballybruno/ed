import React from 'react';
import { globalConfig } from "../../configuration/config";
import { usePaging } from "../../frontendHelpers";
import { LoadingFrame } from "../HOC/LoadingFrame";
import { ContentWrapper, MainWrapper } from "../HOC/MainPanels";
import Navbar from "../navbar/Navbar";
import { SignupQuestions } from '../SignupQuestions';
import { EpistoButton } from '../universal/EpistoButton';
import { PersonalityAssessment } from '../universal/PersonalityAssessment';
import { SlidesDisplay } from "../universal/SlidesDisplay";
import { SignupWrapper } from "./SignupWrapper";

const images = [
    globalConfig.assetStorageUrl + "/application/indulo.svg",
    globalConfig.assetStorageUrl + "/application/kerdes1.png",
    globalConfig.assetStorageUrl + "/application/kerdes2.png",
    globalConfig.assetStorageUrl + "/application/kerdes3.png",
    globalConfig.assetStorageUrl + "/application/kerdes4.png",
    globalConfig.assetStorageUrl + "/application/kerdes5.png",
    globalConfig.assetStorageUrl + "/application/tanulasi_stilus.png",
    globalConfig.assetStorageUrl + "/application/szemelyes_adatok.png",
]

export const SignupPage = () => {

    // slides
    const summaryImageUrl = images[6];
    const gereetImageUrl = images[0];
    const slidesState = usePaging([1, 2, 3, 4]);

    const GreetSlide = () => <SignupWrapper
        title="Regisztráció"
        upperTitle="Üdv a fedélzeten!"
        currentImage={gereetImageUrl}
        description={"A következő kérdéssorozat segítségével felmérjük tanulási stílusodat, hogy a lehető leghatékonyabban tudd használni az Epistogramot"}
        onNext={() => slidesState.next()}
        nextButtonTitle="Tovabb">
    </SignupWrapper>

    const QuestionnaireSlide = () => <SignupQuestions
        onNextOverNavigation={slidesState.next}
        onPrevoiusOverNavigation={slidesState.previous} />

    const SummarySlide = () => <SignupWrapper
        title={"A bal oldalon a saját egyedi tanulási stílusod vizualizációja látható"}
        description={"Már csak egy-két adatra van szükségünk, hogy elkezdhesd a rendszer használatát"}
        upperTitle="Összegzés"
        onNavPrevious={() => slidesState.previous()}>

        <PersonalityAssessment height="50vh" mt="20px"></PersonalityAssessment>
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