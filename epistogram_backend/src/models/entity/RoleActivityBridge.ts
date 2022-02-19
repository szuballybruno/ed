import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Activity } from "./Activity";
import { Role as Role } from "./Role";

@Entity()
export class RoleActivityBridge {

    @PrimaryGeneratedColumn()
    id: number;

    // role 
    @Column()
    roleId: number;

    @ManyToOne(_ => Role, x => x.roleActivityBridges)
    @JoinColumn({ name: "role_id" })
    role: Role;

    // activity
    @Column()
    activityId: number;

    @ManyToOne(_ => Activity, x => x.roleActivityBridges)
    @JoinColumn({ name: "activity_id" })
    activity: Activity;
}