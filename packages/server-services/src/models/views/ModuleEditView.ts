import { XViewColumn } from '@episto/x-orm';
import { Id } from '@episto/commontypes';

export class ModuleEditView {

    @XViewColumn()
    moduleVersionId: Id<'ModuleVersion'>;

    @XViewColumn()
    moduleId: Id<'Module'>;

    @XViewColumn()
    courseVersionId: Id<'CourseVersion'>;

    @XViewColumn()
    isPretestModule: boolean;

    @XViewColumn()
    name: string;

    @XViewColumn()
    description: string;

    @XViewColumn()
    orderIndex: number;

    @XViewColumn()
    coverFilePath: string;
}