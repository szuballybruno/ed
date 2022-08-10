import { AnswerSession } from '../../models/entity/AnswerSession';
import { getSeedList } from '../../services/sqlServices/SeedService';
import { UserSeedDataType } from './seed_users';

export const getAnswerSessionSeedData = (users: UserSeedDataType) => getSeedList<AnswerSession>()({
    ase_practise_marosiEndre: {
        startDate: new Date(),
        isPractise: true,
        examVersionId: null,
        videoVersionId: null,
        userId: users.marosiEndre.id,
    },
    ase_practise_billMurry: {
        startDate: new Date(),
        isPractise: true,
        examVersionId: null,
        videoVersionId: null,
        userId: users.billMurry.id,
    },
    ase_practise_tomStrand: {
        startDate: new Date(),
        isPractise: true,
        examVersionId: null,
        videoVersionId: null,
        userId: users.tomStrand.id,
    }
});

export type AnswerSessionSeedDataType = ReturnType<typeof getAnswerSessionSeedData>;