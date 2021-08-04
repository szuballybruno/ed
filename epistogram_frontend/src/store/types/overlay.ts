export type overlay = {
    _id: string,
    type: number,
    question: string,
    timecode: number,
    answers: [{
        _id: string,
        answer: string
    }],
    validAnswer: string
}
