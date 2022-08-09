import { Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { XViewColumn } from '../../services/XORM/XORMDecorators';
import { PermissionAssignmentBridge } from './authorization/PermissionAssignmentBridge';

@Entity()
export class Group {

    @PrimaryGeneratedColumn()
    @XViewColumn()
    id: number;

    // TO MANY

    // contextPermissionAssignmentBridges
    @JoinColumn()
    @OneToMany(_ => PermissionAssignmentBridge, x => x.assigneeGroup)
    contextPermissionAssignmentBridges: PermissionAssignmentBridge[];
}