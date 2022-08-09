
import { ConstantValue } from '../../models/entity/ConstantValue';
import { getSeedList } from '../../services/sqlServices/SeedService';

export const getConstantValuesSeedData = () => getSeedList<ConstantValue>()({
    pointsPerQuestion: {
        key: 'POINTS_PER_QUESTION',
        value: 4.0
    }
});

export type ConstantValuesSeedDataType = ReturnType<typeof getConstantValuesSeedData>;