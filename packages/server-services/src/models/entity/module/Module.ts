import { Column, Entity, PrimaryGeneratedColumn } from '../../MyORM';
import { XOneToMany, XViewColumn } from '@episto/xorm';
import { Id } from '@episto/commontypes';
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