import { globalConfig } from "../../../../../configuration/config";
import { AnswerDTO } from "../../../../../models/shared_models/AnswerDTO";
import { QuestionDTO } from "../../../../../models/shared_models/QuestionDTO";

export const questions = [
    {
        questionId: 1,
        questionText: "Egy csapatban elvégzendő projekt esetén a következőt preferálom:",
        imageUrl: globalConfig.assetStorageUrl + "/application/kerdes1.png",
        answers: [
            {
                answerId: 1,
                answerText: "Szoros együttműködés a többiekkel"
            },
            {
                answerId: 2,
                answerText: "Szívesebben oldok meg egyedül részfeladatokat"
            },
        ] as AnswerDTO[]
    },
    {
        questionId: 2,
        questionText: "Ha egy számomra ismeretlen irodát kellene megtalálnom egy komplexumban, erre kérném a portást: ",
        imageUrl: globalConfig.assetStorageUrl + "/application/kerdes2.png",
        answers: [
            {
                answerId: 1,
                answerText: "Mutassa meg az épület alaprajzán/rajzolja le a helyes irányt",
            },
            {
                answerId: 2,
                answerText: "Mondja el/írja le, hogy mikor merre kell fordulnom",
            }
        ] as AnswerDTO[]
    },
    {
        questionId: 3,
        questionText: "Jobban preferálom azt a munkában, mikor:",
        imageUrl: globalConfig.assetStorageUrl + "/application/kerdes3.png",
        answers: [
            {
                answerId: 1,
                answerText: "Előre definiált instrukciók alapján végzek el feladatokat",
            },
            {
                answerId: 2,
                answerText: "Kutatnom kell a megoldás után és analizálni különböző eseteket",
            }
        ] as AnswerDTO[]
    },
    {
        questionId: 4,
        questionText: "Egy előadás esetén hasznosabb számomra, ha:",
        imageUrl: globalConfig.assetStorageUrl + "/application/kerdes4.png",
        answers: [
            {
                answerId: 1,
                answerText:  "Az előadó magyaráz, és megválaszolja a felmerülő kérdéseket",
            },
            {
                answerId: 2,
                answerText: "kisfilmekkel, videókkal illusztrálja és egészíti ki a mondanivalóját",
            }
        ] as AnswerDTO[]
    },
    {
        questionId: 5,
        questionText: "Az érzéseimet, gondolataimat a következő módokon fejezem ki szívesebben:",
        imageUrl: globalConfig.assetStorageUrl + "/application/kerdes5.png",
        answers: [
            {
                answerId: 1,
                answerText:  "Zenéken, írásokon, a művészet által",
            },
            {
                answerId: 2,
                answerText: "Direkt, lényegre törő kommunikációval",
            }
        ] as AnswerDTO[]
    }
] as QuestionDTO[]
