import {Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {CourseOrganization} from "./CourseOrganization";
import {Organization} from "./Organization";

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
    @OneToMany(() => CourseOrganization, co => co.group)
    @JoinColumn()
    courseOrganizations: CourseOrganization[]

}