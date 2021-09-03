import asd from './exam.module.scss'
import React from 'react';
import {useTheme} from '@material-ui/core/styles';
import SwipeableViews from 'react-swipeable-views';
import {LinearProgress, LinearProgressProps, Typography} from "@material-ui/core";
import Box from '@material-ui/core/Box';


const tutorialSteps = [
    {
        examQuestion: 'Cybersecurity vizsga',
        examAnswers: ["Olyan rendszerek kidolgozása, amelyek könnyen használhatóak a társadalom számára.",
            "Ez a társadalmi megtévesztés egy formája, amely az információgyűjtésre, csalásra, vagy egy rendszerhez való hozzáférésre összpontosít.",
            "Valaki a közösségi hálózatok segítségével személyes adatokat tulajdonít el."],
        type: "start"
    },
    {
        examQuestion: '1. A biztonság összefüggésében mit jelent a társadalmi manipuláció?',
        examAnswers: ["Olyan rendszerek kidolgozása, amelyek könnyen használhatóak a társadalom számára.",
            "Ez a társadalmi megtévesztés egy formája, amely az információgyűjtésre, csalásra, vagy egy rendszerhez való hozzáférésre összpontosít.",
            "Valaki a közösségi hálózatok segítségével személyes adatokat tulajdonít el."],
        type: "normal"
    },
    {
        examQuestion: '2. Annak érdekében, hogy megóvja az ilyen nyilvános hálózatokon folytatott kommunikációját, mindig... ',
        examAnswers:[
            "A böngészője privát böngészés funkcióját használja.",
            "Virtuális magánhálózatot (VPN) használ.",
            "Kikapcsolja az eszköz fájlmegosztási funkcióját."],
        type: "normal"
    },
    {
        examQuestion: '3. A készüléke és adatai biztonságának megőrzése érdekében az új alkalmazások telepítése kapcsán helyes gyakorlat, ha...',
        examAnswers:[
            "Nem használunk túl sok alkalmazást, mivel azok miatt az okostelefon kevésbé lesz biztonságos.",
            "Az engedélykérelmek alapos vizsgálata okostelefon alkalmazásoknak a használata vagy telepítése során.",
            "Az összes alkalmazás letöltésének blokkolása és csak a sztenderd, a telefonon alapból megtalálható appok használata."],
        type: "normal"
    },
    {
        examQuestion: 'Gratulálunk!',
        examAnswers:[
            "Nem használunk túl sok alkalmazást, mivel azok miatt az okostelefon kevésbé lesz biztonságos.",
            "Az engedélykérelmek alapos vizsgálata okostelefon alkalmazásoknak a használata vagy telepítése során.",
            "Az összes alkalmazás letöltésének blokkolása és csak a sztenderd, a telefonon alapból megtalálható appok használata."],
        type: "end"
    }
];

function Exam() {
    const theme = useTheme();
    const [activeStep, setActiveStep] = React.useState(0);
    const maxSteps = tutorialSteps.length;

    const handleNext = () => {
        if ((maxSteps)  > activeStep) {
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }

    };

    /*const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };*/

    function LinearProgressWithLabel(props: LinearProgressProps & { value: number }) {
        return (
            <Box className={asd.progressWrapper}>
                <Box width="90%" mr={1}>
                    <LinearProgress variant="determinate" className={asd.progressBar} {...props} />
                </Box>
                <Box minWidth={35}>
                    <Typography variant="body2" className={asd.progressPercentage}>{`${Math.round(
                        props.value,
                    )}%`}</Typography>
                </Box>
            </Box>
        );
    }

    const handleStepChange = (step: number) => {
        setActiveStep(step);
    };

    /*const ExamSlide = (props: {examQuestion: string}) => {
        return <span key={props.examQuestion}>
            {activeStep < tutorialSteps.length ? (

            ) : null}
        </span>

    */

    return (
        <div className={asd.examOuterWrapper}>
            <div className={asd.examInnerWrapper}>
                <div className={asd.questionWrapper}>
                    <h1 className={asd.questionTitle}>{tutorialSteps[activeStep].examQuestion}</h1>
                </div>
                {tutorialSteps[activeStep].type !== "end" ? <SwipeableViews
                    axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                    index={activeStep}
                    onChangeIndex={handleStepChange}
                    style={{height: "calc(100% - 158px)"}}
                    className={asd.quizWrapper}
                >
                    {tutorialSteps[activeStep].type === "start" ? <div className={asd.startExamWrapper} >
                        <div className={asd.startExamButton} >
                            <div>A vizsga időtartama 10 perc. Ne hagyd el a böngészőt, mert az első elindítás után újrakezdésre nincs lehetőség. Sok sikert!</div>
                            <button className={asd.startExamButtonIn} onClick={handleNext}>Kezdés</button>
                        </div>
                    </div> : tutorialSteps[activeStep].type === "normal" ? tutorialSteps.map((step, index) => {
                        return <div className={asd.startExamWrapper}>
                            {step.examAnswers.map((item: string) => <div className={asd.quizFormAnswer} onClick={handleNext}>
                                {item}
                            </div>)}
                        </div>
                    }) : null}

                </SwipeableViews> : <div className={asd.endExamWrapper} >
                    <div className={asd.startExamButton} >
                        <div>A vizsga sikeresen teljesítve! Az elért pontszámod 10/11pont.</div>
                        <a href={"https://cdn.discordapp.com/attachments/746265082639417447/749556066294956032/Gratulalunk-Edina.pdf"} target="_new">
                            <button className={asd.startExamButtonIn} >Tanusítvány letöltése</button>
                        </a>

                    </div>
                </div>}
                <LinearProgressWithLabel value={((activeStep) / (tutorialSteps.length - 1 )) * 100} />
            </div>
        </div>
    );
}

export default Exam;
