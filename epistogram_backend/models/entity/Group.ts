import {Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {CourseOrganization} from "./CourseOrganization";
import {Organization} from "./Organization";
import {CourseGroup} from "./CourseGroup";

@Entity()
export class Group {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    organizationId: number

    @ManyToOne(() => Organization, organization => organization.groups)
    @JoinColumn({ name: "organizationId"} )
    organization: Organization

    // Groups's courses
    @OneToMany(() => CourseGroup, cg => cg.course)
    @JoinColumn()
    courseGroups: CourseGroup[]

}