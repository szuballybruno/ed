export type TranslationType = {
    languageCode: string,
    data: {

        misc: {
            selectOption: string;
            save: string;
            savedSuccessfully: string;
            close: string;
            next: string;
            removeAll: string;
            add: string;
            remove: string;
            openAll: string;
            closeAll: string;
            details: string;
            loading: string;
            unknown: string;
            ok: string;
            reset: string;

            firstName: string;
            lastName: string;
            company: string;
            department: string;
            role: string;
            category: string;

            epistoEntry: {
                shouldntBeEmpty: string
            };

            suffixes: {
                percentage: string;
                hour: string;
                minute: string;
                second: string;
                count: string;
                countPerDay: string
            };


            daysOfWeekFromMonday: {
                monday: string;
                tuesday: string;
                wendnesday: string;
                thursday: string;
                friday: string;
                saturday: string;
                sunday: string;
            }
        };

        tempomat: {
            autoModeDescription: string;
            lightModeDescription: string;
            balancedModeDescription: string;
            strictModeDescription: string
        };

        roleNames: {
            administrator: string;
            supervisor: string;
            user: string
        };

        navbar: {
            signout: string;
            currentCourse: string;
            shop: string;
            version: string
        };

        preventMobileFrame: {
            descriptions: string[];
        };

        registrationPage: {

            successfulRegistration: string;
            unknownErrorTryAgain: string;

            learningStyleSurvey: string;
            setPasswordDescription: string;

            firstNameLabel: string;
            lastNameLabel: string;
            emailLabel: string;
            passwordLabel: string;
            passwordAgainLabel: string;

            privacyPolicyDescriptionParts: string[];
            letsStart: string
        };

        eventListener: {
            threeDaysStreak: string;
            fiveDaysStreak: string;
            tenDaysStreak: string
        };

        registerViaActivationCodePage: {
            successfulSignup: string;
            wrongActivationCode: string;
            wrongEmailAddress: string;
            redeemYourCode: string;
            activationCode: {
                label: string;
                placeholder: string
            };
            register: string;
            dontHaveAccount: string;
            buySubscription: string;
            signupSuccessfulDescriptions: string[];
        };

        leftPane: {
            assistantDescription: string;
            assistantButtonTitle: string
        };

        signupPage: {

            greetSlideTitle: string;
            greetSlideDescription: string;
            greetSlideNextButton: string;

            summarySlideDescriptionParts: string[];
            goToHomePage: string
        };

        homePage: {
            courseProgress: string;
            excelCourseTitle: string;
            javaCourseTitle: string;
            activeCourseContinue: string;
            activeCourseEmpty: string;
            availableCoursesLinkTitle: string;
            availableCoursesText: string;
            currentCourseTitle: string;
            practiseTitle: string;
            noTipOfTheDayYet: string;
            tipOfTheDay: string;
            mostRelevantStatistics: string;
            tasks: string;
            stats: string;
            noStatsYet: string;

            statsSummary: {
                mostImportantStatistics: string;
                videosToBeRepeatedCount: {
                    title: string;
                    suffix: string;
                },
                completedVideosLastMonth: {
                    title: string;
                    suffix: string;
                },
                lagBehindPercentage: {
                    title: string;
                    suffix: string;
                },
                performanceLastMonth: {
                    title: string;
                    suffix: string;
                }
            };
        };

        player: {
            doYouReallyStopExam: string;
            stopExamWarning: string;
            yes: string;
            videoRating: {
                experienceRating: string;
                difficultyRating: string
            };
            moduleView: {
                letsStart: string
            };
            courseItemSelector: {
                switchingCourseModeFailed: string;
                beginner: string;
                advanced: string;
                courseModeSwitchDescription: string
            }
        };

        routeTitles: {
            login: string;
            underMaintanence: string;
            registration: string;
            survey: string;
            player: string;
            courseOverview: string;
            pretest: string;
            pretestGreeting: string;
            pretestResults: string;
            prequiz: string;
            prequizGreeting: string;
            setNewPassword: string;
            registerViaActivationCode: string;
            homePage: string;
            shopPage: string;
            availableCourses: string;
            leaderboard: string;
            learning: string;
            learningStatistics: string;
            learningOverview: string;
            learningCourses: string;
            learningExams: string;
            administration: string;
            administrationStatistics: string;

            administrationHome: string;
            administrationHomeOverview: string;
            administrationHomeDetails: string;

            administrationUserAdmin: string;
            administrationUserIndex: string;
            administrationAddUser: string;
            administrationEditUser: string;
            administrationUserStatistics: string;
            administrationUserTasks: string;
            administrationEditTeacherInfo: string;
            administrationUserCourses: string;

            administrationCourseAdmin: string;
            administrationAddCourse: string;
            administrationCourseDetails: string;
            administrationCourseContent: string;
            administrationCoursePretest: string;
            administrationCourseStatistics: string;
            administrationCourseUserProgress: string;
            administrationInteractiveCourse: string;
            administrationAddVideo: string;
            administrationEditVideo: string;
            administrationVideoStatistics: string;
            administrationEditExam: string;
            administrationEditQuestion: string;
            administrationEditModule: string;

            administrationShopMain: string;
            administrationShopAdd: string;
            administrationShopEdit: string;

            administrationAddGroup: string;
            administrationEditGroup: string;
            administrationGroupStatistics: string;

            administrationPersonalityAssessmentMain: string;
            administrationPersonalityAssessmentTips: string;
            administrationPersonalityAssessmentTip: string;

            settings: string;
            settingsOverview: string;
            featurePreview: string;
            coinTransactions: string;
            developmentNotes: string
        };

        practiseQuestions: {
            epistoCoinAquired_BeforeCoinIcon: string;
            epistoCoinAquired_AfterCoinIcon: string;
            answerIsCorrect: string;
            answerIsIncorrect: string;
            nextQuestion: string;
            noMoreQuestionsGoWatchVideosOne: string;
            noMoreQuestionsGoWatchVideosTwo: string;
            noMoreQuestionsGoWatchVideosFour: string;
            noMoreQuestionsGoWatchVideosThree: string;
            noMoreQuestionsGoWatchVideosButton: string;
            initialGreetingsFirst: string;
            initialGreetingsSecond: string;
            initialGreetingsThird: string;
            goToCourses: string
        };

        editUserControl: {
            saveUser: string
        };

        videoQuestionnaire: {
            close: string
        };

        tipOfTheDay: {
            video: string;
            description: string;
            prevoiusVideos: string;
        };

        tasks: {
            states: {
                assigned: string;
                inProgress: string;
                submitted: string;
                rejected: string;
                completed: string
            };
            priority: {
                normal: string;
                important: string;
                urgent: string
            };
            taskName: string;
            taskPriority: string;
            taskDueDate: string;
            taskState: string;
            taskAssigendBy: string;
            taskAssigendDate: string;
            allTasksButtonLabel: string
        };

        availableCourses: {
            couldNotStartCourse: string;
            categoriesTitle: string;
            recommendedForYou: string;
            highlighted: string;
            all: string;
            sortOptions: {
                aToZ: string;
                zToA: string;
                newToOld: string;
                oldToNew: string
            };
            startCourse: string;
            continueCourse: string;
            courseDataSheet: string;
            courseDone: string
        };

        courseDetails: {
            cannotStartCourseNotification: string;
            startCourse: string;
            continueCourse: string;
            recommendedCoursesTitle: string;

            briefingInfoItems: {
                category: string;
                teacher: string;
                difficulty: string;
                learningExperience: string
            };

            tabLabels: {
                overview: string;
                requirements: string;
                content: string;
                teacher: string;
                ratings: string
            };

            summarySection: {
                moreButton: string;
                courseShortDescription: string;
                whatCanYouLearnFromCourse: string;
                whatSkillsTheCourseImproving: string;
                averageLearningStyle: string;
                averageLearningStyleChartLabels: string[];
            };

            requirementsSection: {
                whenTheCourseGoodForYou: string;
                howMuchDoesTheCourseFitsYou: string;
                averageLearningStyle: string;
                averageLearningStyleChartLabels: string[];
                technicalRequirementsForCourse: string
            }
        };

        shop: {
            description: string;
            buy: string;
            buyAgain: string;

            purchaseConfirmationDialog: {
                unlockCourse: string;
                unlockItem: string;

                courseSuccessfullyUnlocked: string;
                itemSuccessfullyPurchased: string;

                canBeFoundInTheCourseSearch: string;
                yourCode: string;

                codeHasBeenSent: string;
                letsGoToCourse: string;
                itemPage: string;
                unlock: string
            }
        };

        learningOverview: {
            personalLearningAnalysisTitle: string;
            whatIsThisGraphGoodFor: string;
            whatIsThisGraphGoodForDescription: string;
            usersAverage: string;
            yourLearningAnalysis: string;

            learningCurveTitle: string;
            learningCurve: string;
            forgettingCurve: string;
            learningCurveDescription: string;
            forgettingCurveDescription: string;

            myStatisticsTitle: string;
            myBadgesTitle: string
        };

        exam: {
            greetText: string;
            greetTextRetry: string;
            statsLabelText: string;
            hello: string;
            nextQuestion: string;
            resultsTitle: string;
            questionsLabel: string;
            answerLabel: string;
            continueCourse: string;
            correctAnswer: string;
            incorrectAnswer: string;
            startExam: string;
            exitExam: string;

            examResultStats: {
                correctAnswersRatio: {
                    title: string;
                    suffix: string
                };
                correctAnswersCount: {
                    title: string;
                    suffix: string
                };
                examDoneInMinutes: {
                    title: string;
                    suffix: string
                };
                fromAllUsers: {
                    title: string;
                    suffix: string
                }

            }
        };

        preferences: {
            changesHasBeenSaved: string;
            resetPasswordSuccessful: string;
            firstName: string;
            lastName: string;
            phoneNumber: string;
            changePassword: string;
            currentPassword: string;
            close: string;
            sendResetMail: string;
            saveChanges: string

        };

        administration: {
            userLearningOverviewSubpage: {
                sectionTitles: {
                    learningOverviewReport: string;
                    coursesInMonth: string;
                    averageProgressWithCourses: string;
                    activities: string
                };
                progressLabels: {
                    engagement: string;
                    performance: string;
                    productivity: string;
                    socialActivity: string;
                    reactionTime: string
                };
                userPerformanceTitles: {
                    performedWell: string
                };
                userPerformanceDescriptions: {
                    performedWell: string
                };
                activitiesPieChartTexts: {
                    watchingVideos: string;
                    doingExamsOrTests: string;
                    answeringQuestions: string;
                    noActivity: string
                };
                statisticsCards: {
                    activeTimeSpentOnPlatform: string;
                    watchedVideosInMonth: string;
                    userEngagementDescription: string;
                    answeredVideoAndPractiseQuizQuestions: string;
                    correctAnswerRatePercentage: string;
                    reactionTime: string;
                    belowAverage: string;
                    aboveAverage: string;
                    average: string;
                    averageWatchedVideosPerDay: string;
                    mostFrequentTimeRange: string;
                    totalDoneExams: string;
                    averageSessionLength: string;
                    videosToBeRepeated: string
                };
                userCourseStatsOverviewDialog: {
                    statisticsCards: {
                        totalWatchedVideosCount: string;
                        totalPlaybackTime: string;
                        totalGivenAnswerCount: string;
                        correctAnswerRate: string;
                    }
                }
                dateRange: string
            };
            editUserControl: {
                selectUserAsTeacher: string;
                selectAsTeacher: string
                surveyIsRequiredLabel: string
                surveyIsRequiredCheckboxLabel: string
            };
            teacherInfoSubpage: {
                teacherInfoSaved: string;
                teacherSkills: string;
                teacherDescription: string;
                teacherCoursesCount: string;
                teacherVideosCount: string;
                teacherStudentsCount: string;
                teacherRating: string;
                teacherBadges: string
            };
            shopAdminEditSubpage: {
                codeAlreadyExists: string;
                courseOrItem: string;
                isThisACourse: string;
                coverImage: string;
                itemName: string;
                detailsUrl: string;
                purchaseLimit: string;
                purchaseLimitPostfix: string;
                epistoCoinPrice: string;
                epistoCoinPricePostfix: string;
                fiatMoneyPrice: string;
                fiatMoneyPricePostfix: string;
                couponCodes: string;
                addedCodes: string;
                addCodesField: string
            };
            courseEditItemView: {
                videoLength: string;
                noVideoUploaded: string;
                questions: string
            };
            courseContentSubpage: {
                courseSavedSuccessfully: string;

                newExamAddedSuccessfully: string;
                doYouReallyRemoveTheExam: string;
                allQuestionsWillBeLost: string;
                removeExam: string;
                examRemovedSuccessfully: string;


                newVideoAddedSuccessfully: string;
                doYouReallyRemoveTheVideo: string;
                uploadedVideoWillBeLost: string;
                removeVideo: string;
                videoRemovedSuccessfully: string;

                addModule: string;
                editModules: string;
                addModuleExtended: string;
                newModuleAddedSuccessfully: string;
                doYouReallyRemoveTheModule: string;
                uploadedContentWillBeLost: string;
                removeModule: string;
                moduleRemovedSuccessfully: string
            }
        }
    }
};