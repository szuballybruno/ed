import { Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { PermissionAssignmentBridge } from './authorization/PermissionAssignmentBridge';

@Entity()
export class Group {

    @PrimaryGeneratedColumn()
    id: number;

    // contextPermissionAssignmentBridges
    @JoinColumn()
    @OneToMany(_ => PermissionAssignmentBridge, x => x.contextGroup)
    contextPermissionAssignmentBridges: PermissionAssignmentBridge[];
}