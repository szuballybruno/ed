import { Company } from '../../models/entity/Company';
import { getSeedList } from '../../services/sqlServices/SeedService';

const list = getSeedList<Company>()({
    PCWorld: {
        name: 'PCWorld'
    },
    EpistoGram: {
        name: 'EpistoGram'
    },
    Manni_BT: {
        name: 'Manni BT'
    },
    Henkel: {
        name: 'Henkel'
    }
});

export default list;