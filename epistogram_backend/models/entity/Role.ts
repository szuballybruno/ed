import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { RoleActivityBridge } from "./RoleActivityBridge";
import { User } from "./User";

@Entity()
export class Role {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    // users 
    @JoinColumn()
    @OneToMany(_ => User, x => x.role)
    users: User[];

    // roleActivityBridges
    @JoinColumn()
    @OneToMany(_ => RoleActivityBridge, x => x.role, { cascade: true })
    roleActivityBridges: RoleActivityBridge[];
}