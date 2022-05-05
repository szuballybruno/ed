
import { JobTitle } from '../../models/entity/JobTitle';
import { getSeedList } from '../../services/sqlServices/SeedService';

const list = getSeedList<JobTitle>()({
    user: {
        name: 'Általános felhasználó'
    },
    tester: {
        name: 'Tesztelő'
    }
});

export default list;
