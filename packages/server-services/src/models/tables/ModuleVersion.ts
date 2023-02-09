import { XViewColumn } from '@thinkhub/x-orm';
import { Id } from '@thinkhub/x-core';

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