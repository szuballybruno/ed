import { Entity, PrimaryGeneratedColumn } from 'typeorm';
import { XOneToMany, XViewColumn } from '../../../services/XORM/XORMDecorators';
import { ModuleVersion } from './ModuleVersion';

@Entity()
export class Module {

    @PrimaryGeneratedColumn()
    @XViewColumn()
    id: number;

    // TO MANY

    @XOneToMany<Module>()(() => ModuleVersion, x => x.module)
    moduleVersions: ModuleVersion[];
}