import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { XOneToMany, XViewColumn } from '../../../services/XORM/XORMDecorators';
import { Id } from '../../../shared/types/versionId';
import { ModuleVersion } from './ModuleVersion';

@Entity()
export class Module {

    @PrimaryGeneratedColumn()
    @XViewColumn()
    id: Id<'Module'>;

    @Column()
    @XViewColumn()
    isPretestModule: boolean;

    // TO MANY

    @XOneToMany<Module>()(() => ModuleVersion, x => x.module)
    moduleVersions: ModuleVersion[];
}