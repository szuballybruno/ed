import {
    Entity,
    Column,
    PrimaryColumn,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn,
    OneToMany,
    ManyToMany, JoinTable
} from "typeorm";
import { User } from "./User";
import {Course} from "./Course";
import {QuestionAnswer} from "./QuestionAnswer";
import {CourseOrganization} from "./CourseOrganization";
import {Group} from "./Group";

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