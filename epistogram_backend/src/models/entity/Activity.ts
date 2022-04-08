import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { RoleActivityBridge } from './RoleActivityBridge';

@Entity()
export class Activity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    // roleActivityBridges
    @JoinColumn()
    @OneToMany(_ => RoleActivityBridge, x => x.activity)
    roleActivityBridges: RoleActivityBridge[];
}