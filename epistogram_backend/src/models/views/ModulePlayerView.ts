import { ViewColumn, ViewEntity } from 'typeorm';
import { XViewColumn } from '../../services/XORM/XORMDecorators';
import { Id } from '../../shared/types/versionId';
import { Module } from '../entity/module/Module';
import { ModuleVersion } from '../entity/module/ModuleVersion';

@ViewEntity({
    synchronize: false,
    expression: ''
})
export class ModulePlayerView {

    @ViewColumn()
    @XViewColumn()
    moduleId: Id<'Module'>;

    @ViewColumn()
    @XViewColumn()
    moduleVersionId: Id<'ModuleVersion'>;

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
    imageFilePath: string | null;
}
