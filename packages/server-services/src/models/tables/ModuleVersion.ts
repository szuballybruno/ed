import { XViewColumn } from '@episto/x-orm';
import { Id } from '@episto/x-core';

export class ModuleVersion {

    @XViewColumn()
    id: Id<'ModuleVersion'>;

    @XViewColumn()
    courseVersionId: Id<'CourseVersion'> | null;

    @XViewColumn()
    moduleId: Id<'Module'>;

    @XViewColumn()
    moduleDataId: Id<'ModuleData'>;
}