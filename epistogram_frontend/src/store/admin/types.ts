import { overlay } from "../types/overlay";

export type UserType = {
    _id: string
    uploadedFileUrl: string
    email: string
    username: string
    firstName: string
    lastName: string
    phoneNumber: string
    userDescription: string
    linkedinUrl: string
    role: string
    innerRole: string
    organizationId: string
    groups: {
        _id: string
        groupRole: string
    }[]
};

export type currentlyEdited = {
    user: UserType
    video: {
        _id: string
        title: string
        subTitle: string
        thumbnailUrl: string
        url: string
        tags: {
            _id: string,
            name: string
        }[]
        description: string,
        permissionLevel: string,
        showAutomatedOverlay: boolean,
        overlays: overlay[]
        course: {
            _id: string
            name: string
        }
    }
    course: {
        _id: string
        name: string
        category: string
        courseGroup: string
        permissionLevel: string
        organizationId: string
        creatorId: string
        teacherId: string
        groups: [
            {
                _id: string
                name: string
            }
        ]
        colorOne: string
        colorTwo: string
        tags: {
            _id: string,
            name: string
        }[]
        teacherName: string
        uploadedFileUrl: string
        items: currentlyEdited["video"][] | currentlyEdited["exam"][]
    }
    article: {
        _id: string
        articleTitle: string
        articleUrl: string
        articleCoverImage: string
        articleDescription: string
    }
    vote: {
        _id: string
        voteQuestion: string
        voteFirstAnswerName: string
        voteFirstAnswerPath: string
        voteSecondAnswerName: string
        voteSecondAnswerPath: string
        active: boolean
    }
    group: {
        _id: string
        groupSupervisorId: string
        groupName: string
        users: UserType[]
    }
    organization: {
        _id: string
        organizationName: string
        users: UserType[]
    }
    exam: {
        _id: string
        name: string
        examQuestions: {
            questionValue: string
            questionAnswers: {
                answerValue: string
                isTheAnswerTrue: boolean
            }[]
        }[]
    }
}
