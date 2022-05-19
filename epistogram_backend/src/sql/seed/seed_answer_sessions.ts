import { AnswerSession } from '../../models/entity/AnswerSession';
import { getSeedList } from '../../services/sqlServices/SeedService';
import seed_users from './seed_users';

const list = getSeedList<AnswerSession>()({
    answer_session_1: {
        startDate: null,
        endDate: null,
        type: 'practise',
        examId: null,
        videoId: null,
        userId: seed_users.user_1.id
    },
    answer_session_2: {
        startDate: null,
        endDate: null,
        type: 'practise',
        examId: null,
        videoId: null,
        userId: seed_users.user_2.id
    },
    answer_session_3: {
        startDate: null,
        endDate: null,
        type: 'practise',
        examId: null,
        videoId: null,
        userId: seed_users.user_3.id
    },
    answer_session_4: {
        startDate: null,
        endDate: null,
        type: 'practise',
        examId: null,
        videoId: null,
        userId: seed_users.user_4.id
    },
    answer_session_5: {
        startDate: null,
        endDate: null,
        type: 'practise',
        examId: null,
        videoId: null,
        userId: seed_users.user_5.id
    },
    answer_session_6: {
        startDate: null,
        endDate: null,
        type: 'practise',
        examId: null,
        videoId: null,
        userId: seed_users.user_6.id
    },
    answer_session_7: {
        startDate: null,
        endDate: null,
        type: 'practise',
        examId: null,
        videoId: null,
        userId: seed_users.user_7.id
    },
    answer_session_8: {
        startDate: null,
        endDate: null,
        type: 'practise',
        examId: null,
        videoId: null,
        userId: seed_users.user_8.id
    },
    answer_session_9: {
        startDate: null,
        endDate: null,
        type: 'practise',
        examId: null,
        videoId: null,
        userId: seed_users.user_9.id
    },
    answer_session_10: {
        startDate: null,
        endDate: null,
        type: 'practise',
        examId: null,
        videoId: null,
        userId: seed_users.user_10.id
    },
    answer_session_11: {
        startDate: null,
        endDate: null,
        type: 'practise',
        examId: null,
        videoId: null,
        userId: seed_users.user_11.id
    },
    answer_session_12: {
        startDate: null,
        endDate: null,
        type: 'practise',
        examId: null,
        videoId: null,
        userId: seed_users.user_12.id
    },
    answer_session_13: {
        startDate: null,
        endDate: null,
        type: 'practise',
        examId: null,
        videoId: null,
        userId: seed_users.user_13.id
    },
    answer_session_14: {
        startDate: null,
        endDate: null,
        type: 'practise',
        examId: null,
        videoId: null,
        userId: seed_users.user_14.id
    },
    answer_session_15: {
        startDate: null,
        endDate: null,
        type: 'practise',
        examId: null,
        videoId: null,
        userId: seed_users.user_15.id
    },
    answer_session_16: {
        startDate: null,
        endDate: null,
        type: 'practise',
        examId: null,
        videoId: null,
        userId: seed_users.user_kovacskrisz.id
    }
});

export default list;