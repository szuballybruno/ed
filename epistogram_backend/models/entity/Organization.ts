import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { CourseOrganization } from "./CourseOrganization";
import { Group } from "./Group";
import { User } from "./User";

@Entity()
export class Organization {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(type => User, user => user.organization)
    @JoinColumn()
    users: User[];

    @OneToMany(type => Group, group => group.organization)
    @JoinColumn()
    groups: Group[];

    // Organization's courses
    @OneToMany(() => CourseOrganization, co => co.organization)
    @JoinColumn()
    courseOrganizations: CourseOrganization[]
}