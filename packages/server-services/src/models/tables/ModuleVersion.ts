import { XViewColumn } from '@episto/x-orm';
import { Id } from '@episto/commontypes';

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