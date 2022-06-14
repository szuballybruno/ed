import { Entity, PrimaryGeneratedColumn } from 'typeorm';
import { XOneToMany } from '../../../services/XORM/XORMDecorators';
import { ModuleVersion } from './ModuleVersion';

@Entity()
export class Module {

    @PrimaryGeneratedColumn()
    id: number;

    @XOneToMany<Module>()(() => ModuleVersion, x => x.module)
    moduleVersions: ModuleVersion[];
}