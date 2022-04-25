import { Company } from '../../models/entity/Company';
import { getSeedList } from './seed_test';

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