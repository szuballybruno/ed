import { AnswerSession } from '../../models/entity/AnswerSession';
import { getSeedList } from '../../services/sqlServices/SeedService';

const list = getSeedList<AnswerSession>()({
    answer_session_1: {
        startDate: null,
        endDate: null,
        type: 'practise',
        examId: null,
        videoId: null,
        userId: 11
    },
    answer_session_2: {
        startDate: null,
        endDate: null,
        type: 'practise',
        examId: null,
        videoId: null,
        userId: 17
    },
    answer_session_3: {
        startDate: null,
        endDate: null,
        type: 'practise',
        examId: null,
        videoId: null,
        userId: 12
    },
    answer_session_4: {
        startDate: null,
        endDate: null,
        type: 'practise',
        examId: null,
        videoId: null,
        userId: 10
    },
    answer_session_5: {
        startDate: null,
        endDate: null,
        type: 'practise',
        examId: null,
        videoId: null,
        userId: 15
    },
    answer_session_6: {
        startDate: null,
        endDate: null,
        type: 'practise',
        examId: null,
        videoId: null,
        userId: 13
    },
    answer_session_7: {
        startDate: null,
        endDate: null,
        type: 'practise',
        examId: null,
        videoId: null,
        userId: 5
    },
    answer_session_8: {
        startDate: null,
        endDate: null,
        type: 'practise',
        examId: null,
        videoId: null,
        userId: 8
    },
    answer_session_9: {
        startDate: null,
        endDate: null,
        type: 'practise',
        examId: null,
        videoId: null,
        userId: 6
    },
    answer_session_10: {
        startDate: null,
        endDate: null,
        type: 'practise',
        examId: null,
        videoId: null,
        userId: 16
    },
    answer_session_11: {
        startDate: null,
        endDate: null,
        type: 'practise',
        examId: null,
        videoId: null,
        userId: 4
    },
    answer_session_12: {
        startDate: null,
        endDate: null,
        type: 'practise',
        examId: null,
        videoId: null,
        userId: 1
    },
    answer_session_13: {
        startDate: null,
        endDate: null,
        type: 'practise',
        examId: null,
        videoId: null,
        userId: 14
    },
    answer_session_14: {
        startDate: null,
        endDate: null,
        type: 'practise',
        examId: null,
        videoId: null,
        userId: 9
    },
    answer_session_15: {
        startDate: null,
        endDate: null,
        type: 'practise',
        examId: null,
        videoId: null,
        userId: 7
    }
});

export default list;