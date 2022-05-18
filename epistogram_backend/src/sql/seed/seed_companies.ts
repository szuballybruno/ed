import { Company } from '../../models/entity/Company';
import { getSeedList } from '../../services/sqlServices/SeedService';

const list = getSeedList<Company>()({
    PCWorld: {
        deletionDate: null,
        name: 'PCWorld'
    },
    EpistoGram: {
        deletionDate: null,
        name: 'EpistoGram'
    },
    Manni_BT: {
        deletionDate: null,
        name: 'Manni BT'
    },
    Henkel: {
        deletionDate: null,
        name: 'Henkel'
    }
});

export default list;