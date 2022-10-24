import { ViewColumn, ViewEntity } from '../MyORM';
import { XViewColumn } from '../../services/XORM/XORMDecorators';
import { Id } from '../../shared/types/versionId';

@ViewEntity({
    synchronize: false,
    expression: ''
})
export class ModuleEditView {

    @ViewColumn()
    @XViewColumn()
    moduleVersionId: Id<'ModuleVersion'>;

    @ViewColumn()
    @XViewColumn()
    moduleId: Id<'Module'>;

    @ViewColumn()
    @XViewColumn()
    isPretestModule: boolean;

    @ViewColumn()
    @XViewColumn()
    courseVersionId: Id<'CourseVersion'>;

    @ViewColumn()
    @XViewColumn()
    name: string;

    @ViewColumn()
    @XViewColumn()
    description: string;

    @ViewColumn()
    @XViewColumn()
    orderIndex: number;

    @ViewColumn()
    @XViewColumn()
    coverFilePath: string | null;
}
