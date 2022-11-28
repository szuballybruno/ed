import { XViewColumn } from '@episto/xorm';
import { Id } from '@episto/commontypes';


export class ModuleEditView {

    @XViewColumn()
    moduleVersionId: Id<'ModuleVersion'>;

    @XViewColumn()
    moduleId: Id<'Module'>;

    @XViewColumn()
    isPretestModule: boolean;

    @XViewColumn()
    courseVersionId: Id<'CourseVersion'>;

    @XViewColumn()
    name: string;

    @XViewColumn()
    description: string;

    @XViewColumn()
    orderIndex: number;

    @XViewColumn()
    coverFilePath: string | null;
}
