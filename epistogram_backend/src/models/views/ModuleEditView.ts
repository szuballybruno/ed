import { ViewColumn, ViewEntity } from 'typeorm';
import { XViewColumn } from '../../services/XORM/XORMDecorators';
import { Id } from '../../shared/types/versionId';
import { CourseVersion } from '../entity/course/CourseVersion';
import { ModuleVersion } from '../entity/module/ModuleVersion';

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
}
