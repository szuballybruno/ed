import { JobTitle } from '../../models/entity/misc/JobTitle';
import { getSeedList } from '../../services/sqlServices/SeedService';

export const getJobTitlesSeedData = () => getSeedList<JobTitle>()({
    user: {
        name: 'Általános felhasználó'
    },
    tester: {
        name: 'Tesztelő'
    }
});

export type JobTitlesSeedDataType = ReturnType<typeof getJobTitlesSeedData>;
