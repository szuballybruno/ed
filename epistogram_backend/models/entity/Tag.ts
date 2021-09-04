import {Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {CourseOrganization} from "./CourseOrganization";

@Entity()
export class Tag {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    // Tag's courses
    @OneToMany(() => CourseOrganization, co => co.tag)
    @JoinColumn()
    courseOrganizations: CourseOrganization[]

}