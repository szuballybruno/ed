import { TeacherInfo } from '../../models/entity/TeacherInfo';
import { getSeedList } from '../../services/sqlServices/SeedService';
import { UserSeedDataType } from './seed_users';

export const getTeacherInfoSeedData = (users: UserSeedDataType) => getSeedList<TeacherInfo>()({

    teacher_info_1: {
        skills: 'Teaching, mostly',
        courseCount: 5,
        videoCount: 23,
        studentCount: 14,
        rating: 4,
        badges: 'badge1',
        userId: users.god.id,
        description: 'desc'
    },
});

export type TeacherInfoSeedDataType = ReturnType<typeof getTeacherInfoSeedData>;