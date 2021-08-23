import { CurrentTasksDTO } from "../models/shared_models/CurrentTasksDTO";
import { OverviewPageDTO } from "../models/shared_models/OverviewPageDTO";
import { TaskDTO } from "../models/shared_models/TaskDTO";
import { TestAnswerDTO } from "../models/shared_models/TestAnswerDTO";
import { TestQuestionDTO } from "../models/shared_models/TestQuestionDTO";

const testQuestionDTO = {
    questionId: "asd",
    questionText: "My fantastic question",
    answers: [
        {
            answerId: "asd",
            answerText: "Answer 1"
        } as TestAnswerDTO,
        {
            answerId: "asd",
            answerText: "Answer 2"
        } as TestAnswerDTO,
        {
            answerId: "asd",
            answerText: "Answer 3"
        } as TestAnswerDTO,
        {
            answerId: "asd",
            answerText: "Answer 4"
        } as TestAnswerDTO
    ]
} as TestQuestionDTO;

const data = {
    labels: ['30 nap', '45 nap', '60 nap', '75 nap', '90 nap'],
    datasets: [
        {
            label: 'Epistogram',
            data: [12, 19, 12, 17, 8],
            fill: false,
            backgroundColor: 'rgb(63,178,181)',
            borderColor: 'rgba(13,104,140,0.2)',
            tension: 0.5
        }, {
            label: 'Hagyományos tréningek',
            data: [3, 5, 4, 5, 2],
            fill: false,
            backgroundColor: 'rgb(215,33,163)',
            borderColor: 'rgba(139,0,155,0.2)',
            tension: 0.5
        }
    ],
};

const top3CurrentTasks = {
    tasks: [
        {
            text: "Office kurzus gyakorlása",
            dueDate: "",
            objective: "practise"
        } as TaskDTO,
        {
            text: "PHP videók megtekintése",
            dueDate: "",
            objective: "continueVideo"
        } as TaskDTO,
        {
            text: "Word kurzus végi vizsga",
            dueDate: "",
            objective: "exam"
        } as TaskDTO
    ]
} as CurrentTasksDTO;

export const overviewPageDTO = {
    testQuestionDTO: testQuestionDTO,
    developmentChartData: data,
    currentTasks: top3CurrentTasks
} as OverviewPageDTO;
