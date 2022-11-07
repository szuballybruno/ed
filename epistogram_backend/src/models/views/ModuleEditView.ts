import { XViewColumn } from '../../services/XORM/XORMDecorators';
import { Id } from '../../shared/types/versionId';


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
