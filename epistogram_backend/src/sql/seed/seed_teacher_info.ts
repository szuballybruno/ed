import { TeacherInfo } from '../../models/entity/TeacherInfo';
import { getSeedList } from '../../services/sqlServices/SeedService';
import seed_users from './seed_users';

const list = getSeedList<TeacherInfo>()({

    teacher_info_1: {
        skills: 'Teaching, mostly',
        courseCount: 5,
        videoCount: 23,
        studentCount: 14,
        rating: 4,
        badges: 'badge1',
        userId: seed_users.user_1.id,
        description: 'desc'
    },
});

export default list;