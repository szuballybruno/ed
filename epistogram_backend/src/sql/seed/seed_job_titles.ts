import { Department } from '../../models/entity/misc/Department';
import { getSeedList } from '../../services/sqlServices/SeedService';

export const getJobTitlesSeedData = () => getSeedList<Department>()({
    user: {
        name: 'Általános felhasználó'
    },
    tester: {
        name: 'Tesztelő'
    }
});

export type JobTitlesSeedDataType = ReturnType<typeof getJobTitlesSeedData>;
