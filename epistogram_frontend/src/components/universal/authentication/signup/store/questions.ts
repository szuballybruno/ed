import {globalConfig} from "../../../../../configuration/config";

export const questions = [{
    title: "Egy csapatban elvégzendő projekt esetén a következőt preferálom:",
    questionAnswers: [{
        answerTitle: "Szoros együttműködés a többiekkel",
        answerValue: "A"
    }, {
        answerTitle: "Szívesebben oldok meg egyedül részfeladatokat",
        answerValue: "B"
    }],
    section: "",
    variant: "question",
    imageUrl: globalConfig.assetStorageUrl + "/application/kerdes1.png",
}, {
    title: "Ha egy számomra ismeretlen irodát kellene megtalálnom egy komplexumban, erre kérném a portást: ",
    questionAnswers: [{
        answerTitle: "Mutassa meg az épület alaprajzán/rajzolja le a helyes irányt",
        answerValue: "A"
    }, {
        answerTitle: "Mondja el/írja le, hogy mikor merre kell fordulnom",
        answerValue: "B"
    }],
    section: "",
    variant: "question",
    imageUrl: globalConfig.assetStorageUrl + "/application/kerdes2.png",
}, {
    title: "Jobban preferálom azt a munkában, mikor:",
    questionAnswers: [{
        answerTitle: "Előre definiált instrukciók alapján végzek el feladatokat",
        answerValue: "A"
    }, {
        answerTitle: "Kutatnom kell a megoldás után és analizálni különböző eseteket",
        answerValue: "B"
    }],
    section: "",
    variant: "question",
    imageUrl: globalConfig.assetStorageUrl + "/application/kerdes3.png",
}, {
    title: "Egy előadás esetén hasznosabb számomra, ha:",
    questionAnswers: [{
        answerTitle: "Az előadó magyaráz, és megválaszolja a felmerülő kérdéseket",
        answerValue: "A"
    }, {
        answerTitle: "kisfilmekkel, videókkal illusztrálja és egészíti ki a mondanivalóját",
        answerValue: "B"
    }],
    section: "",
    variant: "question",
    imageUrl: globalConfig.assetStorageUrl + "/application/kerdes4.png",
},
    {
        title: "Az érzéseimet, gondolataimat a következő módokon fejezem ki szívesebben::",
        questionAnswers: [{
            answerTitle: "Zenéken, írásokon, a művészet által",
            answerValue: "A"
        }, {
            answerTitle: "Direkt, lényegre törő kommunikációval",
            answerValue: "B"
        }],
        section: "",
        variant: "question",
        imageUrl: globalConfig.assetStorageUrl + "/application/kerdes5.png",
    }]
