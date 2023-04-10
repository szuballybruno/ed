import { XViewColumn } from '@episto/x-orm';
import { Id } from '@episto/x-core';

export class FeatureConstraintBridge {

    @XViewColumn()
    id: Id<'FeatureConstraintBridge'>;

    @XViewColumn()
    featureId: Id<'Feature'>;

    @XViewColumn()
    requiredFeatureId: Id<'RequiredFeature'> | null;

    @XViewColumn()
    blockedFeatureId: Id<'BlockedFeature'> | null;

    @XViewColumn()
    description: string | null;
}