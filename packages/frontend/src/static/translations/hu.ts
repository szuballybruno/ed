import { TranslationType } from '../types/TranslationType';

export const huTranslation: TranslationType = {
    languageCode: 'hu',
    data: {

        misc: {
            selectOption: 'Nincs kivalasztas...',
            save: 'Mentés',
            savedSuccessfully: 'Sikeresen mentve!',
            close: 'Bezárás',
            next: 'Tovább',
            removeAll: 'Összes törlése',
            add: 'Hozzáadás',
            remove: 'Törlés',
            openAll: 'Összes kinyitása',
            closeAll: 'Összes becsukása',
            details: 'Részletek',
            loading: 'Betöltés...',
            unknown: 'Ismeretlen',
            ok: 'Ok',
            reset: 'Visszaallitas',

            firstName: 'Keresztnév',
            lastName: 'Vezetéknév',
            company: 'Cég',
            department: 'Beosztás',
            role: 'Jogosultsági kör',
            category: 'Kategória',

            epistoEntry: {
                shouldntBeEmpty: 'Ez a mező nem lehet üres!'
            },

            suffixes: {
                percentage: '%',
                hour: 'óra',
                minute: 'perc',
                second: 'mp',
                count: 'db',
                countPerDay: 'db/nap'
            },


            daysOfWeekFromMonday: {
                monday: 'Hétfő',
                tuesday: 'Kedd',
                wendnesday: 'Szerda',
                thursday: 'Csütörtök',
                friday: 'Péntek',
                saturday: 'Szombat',
                sunday: 'Vasárnap'
            }
        },

        tempomat: {
            autoModeDescription: 'Átvesszük az irányítást, és segítünk, hogy a céljaidnak megfelelő tempóban haladhass. Ha kezdenél lemaradni, több videót fogunk javasolni számodra, de nem hajszolunk túl. Lehetséges, hogy emiatt a befejezés dátuma enyhén ki fog tolódni, ezt lejjebb láthatod.',
            lightModeDescription: 'Csináld, ahogyan szeretnéd, mi nem szólunk bele! Mindig az eredetileg megadott időráfordításod alapján javasoljuk majd a napi videók mennyiségét, ha pedig ettől eltérnél, módosulni fog a befejezés előrejelzett dátuma. ',
            balancedModeDescription: 'Segítünk, ha kicsit lemaradnál, de nem fogunk túlságosan belepiszkálni a haladásodba. Esetleg javaslunk majd pár plusz videót, hogy minden nap tanulhass valami újat! Előfordulhat, hogy a befejezés előrejelzett dátuma változni fog (ezt lent láthatod).',
            strictModeDescription: 'Rajtunk nem múlik, tartani fogjuk az elején kalkulált befejezési dátumot! Ha lemaradnál, növelni fogjuk a javasolt napi videók mennyiségét, hogy ismét a megfelelő tempóba állj. Az erőfeszítéseidnek meglesz a gyümölcse!'
        },

        roleNames: {
            administrator: 'Adminisztátor',
            supervisor: 'Vezető',
            user: 'Felhasználó'
        },

        navbar: {
            signout: 'Kijelentkezés',
            currentCourse: 'Aktuális kurzus',
            shop: 'Áruház',
            version: 'Verzió: '
        },

        preventMobileFrame: {
            descriptions: [
                'Kedves Látogató!',
                'Az optimális felhasználási élmény érdekében az EpistoGram webalkalmazása jelenleg csak asztali számítógépeken, notebookokon, vagy olyan táblagépeken fut el, melyek felbontása minimum 1280 x 720 pixeles.',
                'Egyéb okoseszközökön hamarosan debütáló mobilalkalmazásunkon keresztül érheted majd el platformunkat.'
            ]
        },

        registrationPage: {

            successfulRegistration: 'Sikeres regisztráció!',
            unknownErrorTryAgain: 'Ismeretlen hiba történt, kérjük próbálkozzon újra!',

            learningStyleSurvey: 'Tanulási stílust felmérő kérdőív',
            setPasswordDescription: 'Itt tudod megadni (lehetőleg) erős jelszavadat. \n \n Fontos, hogy minimum 6 karakterből álljon, és tartalmaznia kell minimum egy számot! \n \n Ha esetleg megszakadna a regisztrációs folyamat (például elmegy az internet, vagy bármi egyéb probléma adódik), ne aggódj, az e-mailedre küldött (ezt, amit most megnyitottál) linkre kattintva folytathatod, ugyanakkor ebben az esetben ismét meg kell adnod a jelszavad.',

            firstNameLabel: 'Keresztnév',
            lastNameLabel: 'Vezetéknév',
            emailLabel: 'E-mail cím',
            passwordLabel: 'Jelszó',
            passwordAgainLabel: 'Jelszó mégegyszer',

            privacyPolicyDescriptionParts: [
                'Elfogadom az',
                'Adatkezelési Nyilatkozat',
                'ban foglaltakat'
            ],
            letsStart: 'Kezdhetjük'
        },

        eventListener: {
            threeDaysStreak: '3 egymást követő napon is beléptél, jutalmad pedig',
            fiveDaysStreak: '5 egymást követő napon is beléptél, jutalmad pedig',
            tenDaysStreak: '10 egymást követő napon is beléptél, jutalmad pedig'
        },

        registerViaActivationCodePage: {
            successfulSignup: 'Sikeres regisztráció!',
            wrongActivationCode: 'Helytelen aktivációs kód.',
            wrongEmailAddress: 'Nem megfelelő email cím, vagy már használatban van.',
            redeemYourCode: 'Váltsd be egyedi kódodat, hogy belekezdhess a tanulásba',
            activationCode: {
                label: 'Aktivációs kódod',
                placeholder: 'Kód'
            },
            register: 'Regisztráció',
            dontHaveAccount: 'Nincs még hozzáférésed?',
            buySubscription: 'Vásárold meg kedvezményesen erre a linkre kattintva!',
            signupSuccessfulDescriptions: [
                'A regisztráció sikeres volt, a belépési linked elküldtük a(z) \'',
                '\' címre.'
            ]
        },

        leftPane: {
            assistantDescription: 'Szia, én Tina vagyok, a te személyes segítőd, ha elakadnál, kérdezz bátran!',
            assistantButtonTitle: 'Segítség'
        },

        signupPage: {

            greetSlideTitle: 'Regisztráció',
            greetSlideDescription: 'A következő kérdéssorozat segítségével felmérjük tanulási stílusodat, hogy a lehető leghatékonyabban tudd használni az EpistoGramot',
            greetSlideNextButton: 'Tovább',

            summarySlideDescriptionParts: [
                'Az előző kérdőív segítségével azt vizsgáltuk, milyen módszerekkel érzed komfortosnak a tanulást.',
                '\n A platformunk további adatokat gyűjt majd arról, milyen típusú tananyagokban haladsz a legjobban, mely idősávokban vagy a leghatékonyabb, a felméréssel kombinálva pedig hamarosan személyre szabott tippeket is kapsz majd, valamint a tanulás sebessége és a módszereink is a te igényeidhez fognak idomulni. \n \n',
                'Most pedig nem maradt más dolgod, mint a lenti gombra kattintani, és elkezdeni a tanulást!'
            ],
            goToHomePage: 'Irány a platform!'
        },

        homePage: {
            courseProgress: 'Haladás a kurzusaiddal',
            excelCourseTitle: 'Excel kurzus',
            javaCourseTitle: 'Java mesterkurzus',
            activeCourseContinue: 'Folytatom',
            activeCourseEmpty: 'Új tanfolyam kiválasztása',
            availableCoursesLinkTitle: 'Tanfolyamkereső',
            availableCoursesText: 'Válaszd ki a legszimpatikusabb tanfolyamot',
            currentCourseTitle: 'Jelenlegi kurzus',
            practiseTitle: 'Gyakorolj, hogy a legjobb lehess!',
            noTipOfTheDayYet: 'Személyes tanulási tipped 48 óra múlva válik elérhetővé',
            tipOfTheDay: 'Személyre szabott tipped',
            mostRelevantStatistics: 'Havi statisztikáim',
            tasks: 'Feladatok',
            stats: 'Legfontosabb statisztikáid',
            noStatsYet: 'A haladási becslésed megtekintéséhez minimum 5 nap szükséges',

            statsSummary: {
                mostImportantStatistics: 'Legfontosabb statisztikáid',
                videosToBeRepeatedCount: {
                    title: 'Ismétlendő videó',
                    suffix: 'db'
                },
                completedVideosLastMonth: {
                    title: 'Megtekintett videó',
                    suffix: 'db'
                },
                lagBehindPercentage: {
                    title: 'Haladás',
                    suffix: ''
                },
                performanceLastMonth: {
                    title: 'Teljesítmény',
                    suffix: '%'
                }
            },
        },

        player: {
            doYouReallyStopExam: 'Biztosan megszakítod a vizsgát?',
            stopExamWarning: 'Figyelem! Ha most kilépsz, a jelenlegi vizsgád elveszik és nem kezdhető újra.',
            yes: 'Igen',
            videoRating: {
                experienceRating: 'Mennyire volt hasznos ez a videó?',
                difficultyRating: 'Ennyire volt nehéz megérteni'
            },
            moduleView: {
                letsStart: 'Kezdhetjük!'
            },
            courseItemSelector: {
                switchingCourseModeFailed: 'A nehézségi módok közötti váltás nem lehetséges!',
                beginner: 'Váltás kezdő módra',
                advanced: 'Váltás haladó módra',
                courseModeSwitchDescription: 'Kezdő módban a meghatározott sorrendben haladhatsz, és előre csak addig részig tekerhetsz, melyet már megtekintettél. Haladó módban korlátlanul váltogathatsz a videók között!'
            }
        },

        routeTitles: {
            login: 'Bejelentkezés',
            underMaintanence: 'Under maintanence',
            registration: 'Regisztráció',
            survey: 'Regisztrációs kérdőív',
            player: 'Lejátszó',
            courseOverview: 'Kurzus összegző',
            pretest: 'Pretest',
            pretestGreeting: 'Pretest greeting',
            pretestResults: 'Pretest results',
            prequiz: 'Prequiz',
            prequizGreeting: 'Prequiz greeting',
            setNewPassword: 'Új jelszó beállítása',
            registerViaActivationCode: 'Kód beváltása',
            homePage: 'Kezdőlap',
            shopPage: 'Bolt',
            availableCourses: 'Tanfolyamkereső',
            leaderboard: 'Ranglista',
            learning: 'Haladásom',
            learningStatistics: 'Statisztikám',
            learningOverview: 'Áttekintés',
            learningCourses: 'Kurzusaim',
            learningExams: 'Vizsgáim',
            administration: 'Adminisztráció',
            administrationStatistics: 'Statisztika',

            administrationHome: 'Áttekintés',
            administrationHomeOverview: 'Áttekintés',
            administrationHomeDetails: 'Részletes statisztika',

            administrationUserAdmin: 'Felhasználók',
            administrationUserIndex: 'Felhasználók',
            administrationAddUser: 'Felhasználó hozzáadása',
            administrationEditUser: 'Szerkesztés',
            administrationUserStatistics: 'Tanulási jelentés',
            administrationUserTasks: 'Feladatok',
            administrationEditTeacherInfo: 'Oktató adatai',
            administrationUserCourses: 'Felhasználó kurzusai',

            administrationCourseAdmin: 'Kurzus lista',
            administrationAddCourse: 'Kurzus hozzáadása',
            administrationCourseDetails: 'Adatok szerkesztése',
            administrationCourseContent: 'Tartalom szerkesztése',
            administrationCoursePretest: 'Pretest',
            administrationCourseStatistics: 'Statisztika',
            administrationCourseUserProgress: 'Egyének haladása',
            administrationInteractiveCourse: 'Interaktív kurzus',
            administrationAddVideo: 'Videó hozzáadása',
            administrationEditVideo: 'Videó szerkesztése',
            administrationVideoStatistics: 'Videó statisztikája',
            administrationEditExam: 'Vizsga szerkesztése',
            administrationEditQuestion: 'Kérdés szerkesztése',
            administrationEditModule: 'Modul szerkesztése',

            administrationShopMain: 'Shop adminisztráció',
            administrationShopAdd: 'Shop item hozzáadása',
            administrationShopEdit: 'Shop item szerkesztése',

            administrationAddGroup: 'Csoport hozzáadása',
            administrationEditGroup: 'Csoport szerkesztése',
            administrationGroupStatistics: 'Statisztika',

            administrationPersonalityAssessmentMain: 'Szemelyiseg analizis adminisztracio',
            administrationPersonalityAssessmentTips: 'Szemelyiseg szerinti tippek',
            administrationPersonalityAssessmentTip: 'Tipp szerkesztese',

            settings: 'Beállítások',
            settingsOverview: 'Beállítások',
            featurePreview: 'Várható funkciók',
            coinTransactions: 'EpistoCoin tranzakciók',
            developmentNotes: 'Fejlesztési napló'
        },

        practiseQuestions: {
            epistoCoinAquired_BeforeCoinIcon: 'Újabb 1',
            epistoCoinAquired_AfterCoinIcon: '-al gazdagodtál!',
            answerIsCorrect: 'Helyesen válaszoltál!',
            answerIsIncorrect: 'Helytelen válasz!',
            nextQuestion: 'Következő kérdés',
            noMoreQuestionsGoWatchVideosOne: 'Szia',
            noMoreQuestionsGoWatchVideosTwo: 'Jelenleg nincs több elérhető kérdés számodra.',
            noMoreQuestionsGoWatchVideosFour: 'Tekints meg videókat új kérdésekért, így pedig EpistoCoinjaidat is gyarapíthatod! ',
            noMoreQuestionsGoWatchVideosThree: 'Folytass egy már elkezdett, vagy indíts el egy új tanfolyomot az alábbi gombra kattintva:',
            noMoreQuestionsGoWatchVideosButton: 'Irány a Tanfolyamkereső!',
            initialGreetingsFirst: 'Kedves',
            initialGreetingsSecond: 'Nagy örömünkre szolgál, hogy platformunkon köszönthetünk! Reméljük, hogy tanfolyamaink segítségével mind a munkádban, mind pedig a hétköznapokban is fejlődést érhetsz el.',
            initialGreetingsThird: 'Készen állsz, hogy belekezdj első tanfolyamodba?',
            goToCourses: 'Irány a Tanfolyamkereső!'
        },

        editUserControl: {
            saveUser: 'Felhasználó hozzáadása'
        },

        videoQuestionnaire: {
            close: 'Bezárás'
        },

        tipOfTheDay: {
            video: 'Videó',
            description: 'Leírás',
            prevoiusVideos: 'Előző videók',
        },

        tasks: {
            states: {
                assigned: 'Kiadva',
                inProgress: 'Folyamatban',
                submitted: 'Beadva',
                rejected: 'Visszautasítva',
                completed: 'Teljesítve'
            },
            priority: {
                normal: 'Normál',
                important: 'Fontos',
                urgent: 'Sürgős'
            },
            taskName: 'Feladat',
            taskPriority: 'Prioritás',
            taskDueDate: 'Határidő',
            taskState: 'Státusz',
            taskAssigendBy: 'Feladatot kiadta',
            taskAssigendDate: 'Kiadás dátuma',
            allTasksButtonLabel: 'Összes feladat'
        },

        availableCourses: {
            couldNotStartCourse: 'A kurzus jelenleg nem indítható, ez annak lehet a jele, hogy folyamatban van a feltöltése, kérjük próbáld meg később!',
            categoriesTitle: 'Kategóriák',
            recommendedForYou: 'Neked ajánljuk',
            highlighted: 'Kiemelt',
            all: 'Mind',
            sortOptions: {
                aToZ: 'A-Z',
                zToA: 'Z-A',
                newToOld: 'Új-Régi',
                oldToNew: 'Régi-Új'
            },
            startCourse: 'Indítás',
            continueCourse: 'Folytatás',
            courseDataSheet: 'Adatlap',
            courseDone: 'Teljesítve!'
        },

        courseDetails: {
            cannotStartCourseNotification: 'A kurzus jelenleg nem indítható, ez annak lehet a jele, hogy folyamatban van a feltöltése, kérjük próbáld meg később!',
            startCourse: 'Elkezdem a kurzust',
            continueCourse: 'Folytatom a kurzust',
            recommendedCoursesTitle: 'Ezek a kurzusok is érdekelhetnek',

            briefingInfoItems: {
                category: 'Kategória',
                teacher: 'Tanár',
                difficulty: 'Nehézség',
                learningExperience: 'Tanulási élmény'
            },

            tabLabels: {
                overview: 'Áttekintés',
                requirements: 'Követelmények',
                content: 'Tartalom',
                teacher: 'Az oktatóról',
                ratings: 'Értékelések'
            },

            summarySection: {
                moreButton: 'Bővebben',
                courseShortDescription: 'A kurzus rövid leírása',
                whatCanYouLearnFromCourse: 'Mit tanulhatsz ezen a kurzuson?',
                whatSkillsTheCourseImproving: 'Milyen készségeket fejleszt a tanfolyam?',
                averageLearningStyle: 'Felhasználók átlagos tanulási stílusa',
                averageLearningStyleChartLabels: [
                    'Egyedüli',
                    'Hangos kimondás',
                    'Elméleti',
                    'Vizuális alapú',
                    'Analitikus',
                    'Szociális',
                    'Térbeli elhelyezés',
                    'Gyakorlati',
                    'Audió alapú',
                    'Kreatív'
                ]
            },

            requirementsSection: {
                whenTheCourseGoodForYou: 'Mikor való neked a kurzus?',
                howMuchDoesTheCourseFitsYou: 'Mennyire illik hozzád ez a kurzus',
                averageLearningStyle: 'Felhasználók átlagos tanulási stílusa',
                averageLearningStyleChartLabels: [
                    'Egyedüli',
                    'Hangos kimondás',
                    'Elméleti',
                    'Vizuális alapú',
                    'Analitikus',
                    'Szociális',
                    'Térbeli elhelyezés',
                    'Gyakorlati',
                    'Audió alapú',
                    'Kreatív'
                ],
                technicalRequirementsForCourse: 'Milyen technikai követelményei vannak a kurzusnak?'
            }
        },

        shop: {
            description: 'Leírás',
            buy: 'Megveszem',
            buyAgain: 'Megveszem mégegyszer',

            purchaseConfirmationDialog: {
                unlockCourse: 'Biztosan feloldod az alábbi tanfolyamot?',
                unlockItem: 'Biztosan feloldod az alábbi kedvezményt?',

                courseSuccessfullyUnlocked: 'Sikeresen feloldottad a tanfolyamot',
                itemSuccessfullyPurchased: 'Sikeresen megvásároltad a terméket',

                canBeFoundInTheCourseSearch: 'Mostantól megtalálhatod a Tanfolyamkeresőben is!',
                yourCode: 'Kódod amit beválthatsz a partnerünknél: ',

                codeHasBeenSent: 'A kódod e-mailben is elküldtük neked, hogy később könnyen megtalálhasd.',
                letsGoToCourse: 'Irány a tanfolyam',
                itemPage: 'Termék oldala',
                unlock: 'Feloldom'
            }
        },

        learningOverview: {
            personalLearningAnalysisTitle: 'Személyes tanulási analízis',
            whatIsThisGraphGoodFor: 'Mit jelent ez a grafikon?',
            whatIsThisGraphGoodForDescription: 'A fenti grafikonon 5-5 tulajdonság párt láthatsz, melyek 0-7 között vehetnek fel értéket, attól függően, hogy az adott tulajdonság mennyire jellemző rád. Ezek általában ellentétben állnak egymással, így minél több pontod van az egyik oldalon, annál kevesebb lesz a másikon.',
            usersAverage: 'A felhasználók átlaga',
            yourLearningAnalysis: 'A te tanulási analízised',

            learningCurveTitle: 'Tanulási és felejtési görbéid',
            learningCurve: 'Tanulási görbéd',
            forgettingCurve: 'Felejtési görbéd',
            learningCurveDescription: 'A tanulási görbe azon a megfigyelésen alapul, hogy minél gyakrabban végzünk egy tevékenységet, annál begyakorlottabban és gyorsabban tudjuk azt végrehajtani. Gondolhatnánk, hogy ez egy teljesen lineáris folyamat, a gyakorlatban ennél azonban komplikáltabb rendszerről beszélhetünk, mely mindenkinél mást jelent.A jobb oldalon láthatod, hogyan épül fel a te tanulási görbéd, ennek megfelelően pedig további tippeket adunk majd, hogyan tudod fejleszteni azt.',
            forgettingCurveDescription: 'A felejtési görbe az emlékezetek fakulásának folyamatát ábrázolja az idő függvényében. Egy kapcsolódó fogalom az emlék erőssége, amely azt fejezik ki, hogy egy emlék milyen tartósan marad meg az agyban. Minél erősebb egy emlék, annál hosszabb ideig képes valaki előhívni. A felejtés sebessége sok tényezőtől függ, mint például a megtanult anyag nehézsége, az ismeretanyag ábrázolása, valamint fiziológiai tényezők mint a pillanatnyi stressz vagy kipihentség. Az alap felejtési sebességben nincs lényeges egyéni különbség. A látható teljesítményben mutatkozó különbségeket (pl. iskolai jegyek) eltérő mnemotechnikai képességekkel lehet megmagyarázni, melyekkel kapcsolatban hamarosan új ismeretekre tehetsz majd szert!',

            myStatisticsTitle: 'Statisztikám',
            myBadgesTitle: 'Megszerzett jelvényeim'
        },

        exam: {
            greetText: 'Készülj fel, ha a kezdés gombra kattintasz a vizsga elindul!',
            greetTextRetry: 'Készülj fel, ha az újrakezdés gombra kattintasz a vizsga elindul! Ha újrakezded a vizsgát, mindig a jobb eredményt vesszük figyelembe!',
            statsLabelText: 'Eddig elért legjobb eredményed:',
            hello: 'üdv!',
            nextQuestion: 'Következő',
            resultsTitle: 'Egy újabb tesztet oldottál meg, íme az eredményed:',
            questionsLabel: 'Kérdésekre adott válaszaid',
            answerLabel: 'Válaszod',
            continueCourse: 'Kurzus folytatása',
            correctAnswer: 'Helyes!',
            incorrectAnswer: 'Hibás!',
            startExam: 'Kezdés!',
            exitExam: 'Kilépek a tesztből',

            examResultStats: {
                correctAnswersRatio: {
                    title: 'Helyes válaszok aránya',
                    suffix: '%'
                },
                correctAnswersCount: {
                    title: 'Pont szerezve a kérdésekre',
                    suffix: 'pont'
                },
                examDoneInMinutes: {
                    title: 'Alatt teljesítetted a tesztet',
                    suffix: 'perc'
                },
                fromAllUsers: {
                    title: 'eredmény a cégen belül',
                    suffix: ''
                }

            }
        },

        preferences: {
            changesHasBeenSaved: 'A változtatások sikeresen mentésre kerültek.',
            resetPasswordSuccessful: 'Sikeresen visszaállítottad a jelszavad, az új jelszó megadásához szükséges linket e-mail-ben elküldtük Neked.',
            firstName: 'Keresztnév',
            lastName: 'Vezetéknév',
            phoneNumber: 'Telefonszám',
            changePassword: 'Jelszó megváltoztatása',
            currentPassword: 'Jelenlegi jelszó',
            close: 'Bezárás',
            sendResetMail: 'Kérelem elküldése',
            saveChanges: 'Változtatások mentése',
            username: 'Felhasználó név'
        },

        administration: {
            userLearningOverviewSubpage: {
                sectionTitles: {
                    learningOverviewReport: 'Tanulási jelentés',
                    coursesInMonth: 'Kurzusok a hónapban',
                    averageProgressWithCourses: 'Átlagos haladás a tanfolyamokon',
                    activities: 'Aktivitások'
                },
                progressLabels: {
                    engagement: 'Elköteleződés',
                    performance: 'Teljesítmény',
                    productivity: 'Produktivitás',
                    socialActivity: 'Közösségi aktivitás',
                    reactionTime: 'Reakcióidő'
                },
                userPerformanceTitles: {
                    performedWell: 'Jól teljesített a hónapban'
                },
                userPerformanceDescriptions: {
                    performedWell: 'A tanfolyamokon jól teljesített, és a kitűzött határidőket is többnyire tartani tudta.'
                },
                activitiesPieChartTexts: {
                    watchingVideos: 'Videók megtekintése',
                    doingExamsOrTests: 'Vizsga / tesztkitöltés',
                    answeringQuestions: 'Kérdések megválaszolása',
                    noActivity: 'Nincs tevékenység'
                },
                statisticsCards: {
                    activeTimeSpentOnPlatform: 'Aktívan eltöltött idő a platformon',
                    watchedVideosInMonth: 'Megtekintett videó a hónapban',
                    userEngagementDescription: ' A hallgató elköteleződése 4 mérőszám összeségéből áll össze. Vizsgáljuk a belépésének gyakoriságát, az aktivitásának intenzitását, a platformelhagyást, valamint a lemorzsolódást is. Az elköteleződési szint magasan tartása kulcsfontosságú, hiszen a felhasználónak azt kell éreznie, hogy valóban értéket kap a tanulás során, és nem csak kötelező rosszként éli meg a képzési folyamatot. Csökkenő elköteleződés esetén kérdéseket teszünk fel neki, ezt pedig összehasonlítjuk a kurzuselhagyási és értékelési adatokkal, ezáltal pedig felderíthető, melyek azok a kritikus pontok a tananyagban, melyek javításra szorulnak.',
                    answeredVideoAndPractiseQuizQuestions: 'Megválaszolt tudást vizsgáló kérdés',
                    correctAnswerRatePercentage: 'Helyes válaszok aránya',
                    reactionTime: 'Reakcióidő',
                    belowAverage: 'Átlagon aluli',
                    aboveAverage: 'Átlagon felüli',
                    average: 'Átlagos',
                    averageWatchedVideosPerDay: 'Átlag videómegtekintés naponta',
                    mostFrequentTimeRange: 'A leggyakoribb aktív idősáv',
                    totalDoneExams: 'Teljesített vizsgák száma',
                    averageSessionLength: 'Egy belépés átlagos hossza',
                    videosToBeRepeated: 'Ismétlésre ajánlott videó'
                },
                userCourseStatsOverviewDialog: {
                    statisticsCards: {
                        totalWatchedVideosCount: 'Megtekintett videó',
                        totalPlaybackTime: 'Videónézéssel eltöltött idő',
                        totalGivenAnswerCount: 'Megválaszolt kérdés',
                        correctAnswerRate: 'Helyes válaszok aránya'
                    }
                },
                dateRange: 'Vizsgált időszak'
            },
            editUserControl: {
                selectAsTeacher: 'Megjelölés tanárként',
                selectUserAsTeacher: 'Megjelölöm a felhasználót tanárként',
                surveyIsRequiredLabel: 'Tanulási stílust felmérő kérdőív',
                surveyIsRequiredCheckboxLabel: 'A felhasználó számára kötelezően kitöltendő regisztrációnál',
            },
            teacherInfoSubpage: {
                teacherInfoSaved: 'Tanár információk sikeresen mentve!',
                teacherSkills: 'Szakterület',
                teacherDescription: 'Leírás',
                teacherCoursesCount: 'Kurzusok száma',
                teacherVideosCount: 'Videók száma',
                teacherStudentsCount: 'Hallgatók száma',
                teacherRating: 'Értékelés',
                teacherBadges: 'A tanár jelvényei'
            },
            shopAdminEditSubpage: {
                codeAlreadyExists: 'Ez a kód már létezik!',
                courseOrItem: 'Kurzus / Termék',
                isThisACourse: 'Ez a ShopItem egy kurzus?',
                coverImage: 'Borítókép',
                itemName: 'Termék neve',
                detailsUrl: 'Részletek URL címe',
                purchaseLimit: 'Vásárlási limit',
                purchaseLimitPostfix: 'Darab',
                epistoCoinPrice: 'EpistoCoin ár',
                epistoCoinPricePostfix: 'EpistoCoin',
                fiatMoneyPrice: 'Ár fiat pénzben',
                fiatMoneyPricePostfix: 'HUF',
                couponCodes: 'Kuponkódok',
                addedCodes: 'Bejegyzések száma: ',
                addCodesField: 'Kód(ok) hozzáadása'
            },
            courseEditItemView: {
                videoLength: 'Videó hossza: ',
                noVideoUploaded: 'Nincs feltöltött videó',
                questions: 'Kérdések: '
            },
            courseContentSubpage: {
                courseSavedSuccessfully: 'Kurzus sikeresen mentve',

                newExamAddedSuccessfully: 'Új vizsga sikeresen hozzáadva!',
                doYouReallyRemoveTheExam: 'Biztosan törlöd a vizsgát?',
                allQuestionsWillBeLost: 'Az összes benne lévő kérdés el fog veszni.',
                removeExam: 'Vizsga törlése',
                examRemovedSuccessfully: 'Vizsga sikeresen törölve!',


                newVideoAddedSuccessfully: 'Új videó sikeresen hozzáadva!',
                doYouReallyRemoveTheVideo: 'Biztosan törlöd a videót?',
                uploadedVideoWillBeLost: 'A feltöltött fájl, és az összes kérdés el fog veszni.',
                removeVideo: 'Videó törlése',
                videoRemovedSuccessfully: 'Videó sikeresen törölve!',

                addModule: 'Új modul',
                editModules: 'Modulok szerkesztése',
                addModuleExtended: 'Új modul hozzáadása',
                newModuleAddedSuccessfully: 'Modul sikeresen hozzáadva!',
                doYouReallyRemoveTheModule: 'Biztosan törlöd a modult?',
                uploadedContentWillBeLost: 'A benne lévő összes videó, és vizsga el fog veszni.',
                removeModule: 'Modul törlése',
                moduleRemovedSuccessfully: 'Modul sikeresen törölve!'
            }
        }
    }
};
