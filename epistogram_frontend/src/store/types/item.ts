import { overlay } from "./overlay";

export type item = {
    _id: string,
    type: string,
    title: string,
    subTitle: string,
    url: string,
    length: number,
    description?: string,
    thumbnailUrl: string,
    teacherName: string,
    showAutomaticOverlay: boolean,
    overlays: overlay[],
    watchCount?: number
    uploadTime?: string
    name?: string
    examQuestions?: {
        questionValue: string
        questionAnswers: {
            answerValue: string
            isTheAnswerTrue: boolean
        }[]
    }[]
}
