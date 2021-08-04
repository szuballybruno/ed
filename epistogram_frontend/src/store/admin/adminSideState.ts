import {createState, State} from "@hookstate/core";
import {AdminSideStateIF} from "./AdminSideStateIF";

const AdminSideState: State<AdminSideStateIF> = createState<AdminSideStateIF>({
    users: [{
        _id: "",
        active: false,
        email: "",
        firstName: "",
        lastName: "",
        phoneNumber: "",
        role: "",
        innerRole: "",
        organizationName: "",
        tasks: [{
            name: "",
            addedBy: "",
            status: "",
            due: ""
        }]
    }],
    courses: [{
        _id: "",
        name: "",
        category: "",
        group: "",
        teacherName: "",
        colorOne: "",
        colorTwo: "",
        items: [
            {
                _id: "",
                type: "",
                title: "",
                subTitle: "",
                url: "",
                length: 0,
                description: "",
                thumbnailUrl: "",
                teacherName: "",
                showAutomaticOverlay: false,
                overlays: [{
                    _id: "",
                    type: 0,
                    question: "",
                    timecode: 0,
                    answers: [{
                        _id: "",
                        answer: ""
                    }],
                    validAnswer: ""
                }],
            }
        ],
        thumbnailUrl: ""
    }],
    articles: [{
        _id: "",
        articleTitle: "",
        articleUrl: "",
        articleCoverImage: "",
        articleDescription: "",
        articleWatchCount: "",
    }],
    votes: [{
        _id: "",
        voteQuestion: "",
        voteFirstAnswerName: "",
        voteFirstAnswerCount: 0,
        voteSecondAnswerName: "",
        voteSecondAnswerCount: 0,
        responseText: "",
        voteFirstAnswerPath: "",
        voteSecondAnswerPath: "",
        voteAnswersCount: 0,
        active: false,
    }],
    groups: [{
        _id: "",
        groupSupervisorId: "",
        groupName: "",
    }],
    organizations: [{
        _id: "",
        organizationName: "",
    }],
    currentlyEdited: {
        user: {
            _id: "",
            uploadedFileUrl: "",
            email: "",
            username: "",
            firstName: "",
            lastName: "",
            phoneNumber: "",
            userDescription: "",
            linkedinUrl: "",
            role: "",
            innerRole: "",
            organizationId: "",
            groups: [{
                _id: "",
                groupRole: "",
            }]
        },
        video: {
            _id: "",
            title: "",
            subTitle: "",
            url: "",
            thumbnailUrl: "",
            description: "",
            tags: [{
                _id: "",
                name: ""
            }],
            permissionLevel: "",
            showAutomatedOverlay: false,
            overlays: [{
                _id: "",
                type: 0,
                question: "",
                timecode: 0,
                answers: [{
                    _id: "",
                    answer: ""
                }],
                validAnswer: ""
            }],
            course: {
                _id: "",
                name: "",
            }
        },
        course: {
            _id: "",
            name: "",
            category: "",
            courseGroup: "",
            permissionLevel: "",
            organizationId: "",
            creatorId: "",
            teacherId: "",
            groups: [{
                _id: "",
                name: ""
            }],
            uploadedFileUrl: "",
            colorOne: "",
            colorTwo: "",
            tags: [{
                _id: "",
                name: ""
            }],
            teacherName: "",
            items: [{
                _id: "",
                title: "",
                subTitle: "",
                url: "",
                thumbnailUrl: "",
                tags: [{
                    _id: "",
                    name: ""
                }],
                description: "",
                permissionLevel: "",
                showAutomatedOverlay: false,
                overlays: [{
                    _id: "",
                    type: 0,
                    question: "",
                    timecode: 0,
                    answers: [{
                        _id: "",
                        answer: ""
                    }],
                    validAnswer: ""
                }],
                course: {
                    _id: "",
                    name: "",
                }
            }]
        },
        article: {
            _id: "",
            articleTitle: "",
            articleUrl: "",
            articleCoverImage: "",
            articleDescription: "",
        },
        vote: {
            _id: "",
            voteQuestion: "",
            voteFirstAnswerName: "",
            voteFirstAnswerPath: "",
            voteSecondAnswerName: "",
            voteSecondAnswerPath: "",
            active: false,
        },
        group: {
            _id: "",
            groupSupervisorId: "",
            groupName: "",
            users: [{
                _id: "",
                email: "",
                username: "",
                firstName: "",
                lastName: "",
                phoneNumber: "",
                userDescription: "",
                linkedinUrl: "",
                role: "",
                innerRole: "",
                organizationId: "",
                groups: [{
                    _id: "",
                    groupRole: "",
                }],
                uploadedFileUrl: ""
            }]
        },
        organization: {
            _id: "",
            organizationName: "",
            users: [{
                _id: "",
                email: "",
                username: "",
                firstName: "",
                lastName: "",
                phoneNumber: "",
                userDescription: "",
                linkedinUrl: "",
                role: "",
                innerRole: "",
                organizationId: "",
                groups: [{
                    _id: "",
                    groupRole: "",
                }],
                uploadedFileUrl: ""
            }]
        },
        exam: {
            _id: "",
            name: "",
            examQuestions: [{
                questionValue: "",
                questionAnswers: [{
                    answerValue: "",
                    isTheAnswerTrue: false,
                }]
            }]
        }
    }
})

export default AdminSideState
